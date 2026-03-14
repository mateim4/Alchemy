import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';

export interface TooltipProps {
  /** Tooltip label text */
  text: string;
  children: React.ReactNode;
  /** Placement relative to trigger element */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Hover delay in ms before showing (default 300) */
  delay?: number;
  /** Additional CSS class(es) for the tooltip element */
  className?: string;
}

/**
 * Portal-rendered tooltip with configurable position and delay.
 *
 * Includes viewport boundary detection to prevent off-screen rendering.
 * Supports keyboard focus for accessibility.
 *
 * @example
 * ```tsx
 * <Tooltip text="Close panel" position="bottom">
 *   <button><DismissRegular /></button>
 * </Tooltip>
 * ```
 */
export const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  position = 'top',
  delay = 300,
  className,
}) => {
  const [visible, setVisible] = React.useState(false);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [adjustedPosition, setAdjustedPosition] = React.useState(position);
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();
  const wrapRef = React.useRef<HTMLSpanElement>(null);
  const tooltipId = React.useId();

  const show = React.useCallback(() => {
    timerRef.current = setTimeout(() => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const gap = 8;
      let finalPosition = position;

      // Viewport boundary detection
      if (position === 'top' && rect.top < 50) finalPosition = 'bottom';
      if (position === 'bottom' && rect.bottom > window.innerHeight - 50) finalPosition = 'top';
      if (position === 'left' && rect.left < 100) finalPosition = 'right';
      if (position === 'right' && rect.right > window.innerWidth - 100) finalPosition = 'left';

      let x: number, y: number;
      switch (finalPosition) {
        case 'top':
          x = rect.left + rect.width / 2;
          y = rect.top - gap;
          break;
        case 'bottom':
          x = rect.left + rect.width / 2;
          y = rect.bottom + gap;
          break;
        case 'left':
          x = rect.left - gap;
          y = rect.top + rect.height / 2;
          break;
        case 'right':
          x = rect.right + gap;
          y = rect.top + rect.height / 2;
          break;
      }

      setCoords({ x, y });
      setAdjustedPosition(finalPosition);
      setVisible(true);
    }, delay);
  }, [position, delay]);

  const hide = React.useCallback(() => {
    clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  React.useEffect(() => () => clearTimeout(timerRef.current), []);

  if (!text) return <>{children}</>;

  const positionStyles: React.CSSProperties = {
    position: 'fixed',
    zIndex: 9999,
    pointerEvents: 'none',
    ...(adjustedPosition === 'top' && { left: coords.x, top: coords.y, transform: 'translate(-50%, -100%)' }),
    ...(adjustedPosition === 'bottom' && { left: coords.x, top: coords.y, transform: 'translate(-50%, 0)' }),
    ...(adjustedPosition === 'left' && { left: coords.x, top: coords.y, transform: 'translate(-100%, -50%)' }),
    ...(adjustedPosition === 'right' && { left: coords.x, top: coords.y, transform: 'translate(0, -50%)' }),
  };

  return (
    <span
      ref={wrapRef}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      className="inline-flex"
      aria-describedby={visible ? tooltipId : undefined}
    >
      {children}
      {visible &&
        createPortal(
          <div
            id={tooltipId}
            role="tooltip"
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-medium',
              'bg-[var(--theme-bg-glass-secondary)] text-[var(--theme-text-primary)]',
              'border border-[var(--theme-border-glass)]',
              'backdrop-blur-[20px]',
              'shadow-[var(--theme-shadow-card)]',
              'animate-in fade-in duration-150',
              className,
            )}
            style={positionStyles}
          >
            {text}
          </div>,
          document.body,
        )}
    </span>
  );
};

Tooltip.displayName = 'Tooltip';
