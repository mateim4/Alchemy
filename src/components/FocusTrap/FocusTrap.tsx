import * as React from 'react';

export interface FocusTrapProps {
  children: React.ReactNode;
  /** Whether the focus trap is currently active */
  isActive: boolean;
  /** Called when the user presses Escape */
  onDeactivate: () => void;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Traps keyboard focus within its children while active.
 *
 * - Tab / Shift+Tab wraps around focusable elements
 * - Escape key calls `onDeactivate`
 * - Restores focus to the previously focused element on unmount
 * - Recomputes focusable elements on every Tab press (handles dynamic content)
 *
 * @example
 * ```tsx
 * <FocusTrap isActive={isOpen} onDeactivate={handleClose}>
 *   <dialog>...</dialog>
 * </FocusTrap>
 * ```
 */
export const FocusTrap: React.FC<FocusTrapProps> = ({ children, isActive, onDeactivate }) => {
  const trapRef = React.useRef<HTMLDivElement>(null);
  const previousFocusRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!isActive || !trapRef.current) return;

    // Save currently focused element to restore on deactivation
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Recompute focusable elements on every Tab press (handles dynamic content)
    const getFocusableElements = () => {
      if (!trapRef.current) return [];
      return Array.from(
        trapRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => el.offsetParent !== null);
    };

    // Set initial focus on first focusable element
    const initialElements = getFocusableElements();
    if (initialElements.length > 0) {
      initialElements[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const focusable = getFocusableElements();
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }

      if (e.key === 'Escape') {
        onDeactivate();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus to the element that was focused before the trap
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [isActive, onDeactivate]);

  return <div ref={trapRef}>{children}</div>;
};

FocusTrap.displayName = 'FocusTrap';
