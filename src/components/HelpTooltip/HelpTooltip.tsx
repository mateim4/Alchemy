import * as React from 'react';
import { QuestionCircle20Regular } from '@fluentui/react-icons';
import { Tooltip } from '../Tooltip';
import { cn } from '../../utils/cn';

export interface HelpTooltipProps {
  /** Help text to display */
  content: string;
  /** Child element to wrap */
  children?: React.ReactNode;
  /** Tooltip position preference */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Show the question mark icon (default: true) */
  showIcon?: boolean;
  /** Icon size in pixels (default: 16) */
  iconSize?: number;
  /** Additional CSS class(es) */
  className?: string;
}

/**
 * Contextual help with a question mark icon and tooltip.
 *
 * Wraps children with a Tooltip and optionally renders a `?` icon.
 *
 * @example
 * ```tsx
 * <HelpTooltip content="Maximum file size is 50MB">
 *   <label>Upload file</label>
 * </HelpTooltip>
 *
 * // Standalone icon:
 * <HelpIcon content="Click to learn more" />
 * ```
 */
export const HelpTooltip: React.FC<HelpTooltipProps> = ({
  content,
  children,
  position = 'top',
  showIcon = true,
  iconSize = 16,
  className,
}) => {
  return (
    <Tooltip text={content} position={position}>
      <span className={cn('inline-flex items-center gap-1', className)}>
        {children}
        {showIcon && (
          <QuestionCircle20Regular
            style={{ width: iconSize, height: iconSize }}
            className="shrink-0 cursor-help text-[var(--theme-text-accent)] opacity-70"
            aria-hidden="true"
          />
        )}
      </span>
    </Tooltip>
  );
};

HelpTooltip.displayName = 'HelpTooltip';

/**
 * Standalone help icon with tooltip (no wrapping children).
 */
export const HelpIcon: React.FC<Omit<HelpTooltipProps, 'children'>> = (props) => {
  return <HelpTooltip {...props} showIcon={true} />;
};

HelpIcon.displayName = 'HelpIcon';
