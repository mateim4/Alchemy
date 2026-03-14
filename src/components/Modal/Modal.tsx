import * as React from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { Dismiss24Regular } from '@fluentui/react-icons';
import { cn } from '../../utils/cn';
import { FocusTrap } from '../FocusTrap';

// ── CVA Variants ──────────────────────────────────────────────────────────

const modalVariants = cva(
  [
    'relative rounded-xl border',
    'border-[var(--theme-border-glass)]',
    'bg-[var(--theme-bg-glass-modal)]',
    'backdrop-blur-[20px]',
    'shadow-[var(--theme-shadow-modal)]',
    'w-full mx-4',
  ],
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// ── Types ─────────────────────────────────────────────────────────────────

export interface ModalProps extends VariantProps<typeof modalVariants> {
  /** Whether the modal is visible */
  isOpen: boolean;
  /** Called when the modal should close */
  onClose: () => void;
  /** Whether clicking the backdrop closes the modal (default: true) */
  closeOnBackdrop?: boolean;
  /** Additional CSS class(es) for the modal container */
  className?: string;
  children: React.ReactNode;
}

export interface ModalHeaderProps {
  /** Optional icon displayed before the title */
  icon?: React.ReactNode;
  /** Optional background color for the icon container */
  iconBg?: string;
  /** Modal title text */
  title: string;
  /** Optional subtitle text */
  subtitle?: string;
  /** Called when the close button is clicked */
  onClose: () => void;
}

export interface ModalSectionProps {
  children: React.ReactNode;
  className?: string;
}

// ── Context ───────────────────────────────────────────────────────────────

const ModalTitleIdContext = React.createContext<string | undefined>(undefined);

// ── Modal Component ───────────────────────────────────────────────────────

/**
 * Portal-rendered modal with focus trap, backdrop, and Escape key support.
 *
 * Uses compound components for consistent layout:
 * - `Modal.Header` — title bar with close button
 * - `Modal.Body` — scrollable content area
 * - `Modal.Footer` — action buttons
 *
 * @example
 * ```tsx
 * <Modal isOpen={open} onClose={() => setOpen(false)} size="lg">
 *   <Modal.Header title="Confirm" onClose={() => setOpen(false)} />
 *   <Modal.Body>Are you sure?</Modal.Body>
 *   <Modal.Footer>
 *     <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
 *     <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
 *   </Modal.Footer>
 * </Modal>
 * ```
 */
const ModalRoot: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  size = 'md',
  closeOnBackdrop = true,
  className,
  children,
}) => {
  const titleId = React.useId();

  const handleBackdropClick = React.useCallback(
    (e: React.MouseEvent) => {
      if (closeOnBackdrop && e.target === e.currentTarget) {
        onClose();
      }
    },
    [closeOnBackdrop, onClose],
  );

  // Prevent body scroll while modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const modal = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <FocusTrap isActive={isOpen} onDeactivate={onClose}>
        <div
          className={cn(modalVariants({ size }), className)}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={(e) => e.stopPropagation()}
        >
          <ModalTitleIdContext.Provider value={titleId}>
            {children}
          </ModalTitleIdContext.Provider>
        </div>
      </FocusTrap>
    </div>
  );

  return createPortal(modal, document.body);
};

// ── Sub-components ────────────────────────────────────────────────────────

const ModalHeader: React.FC<ModalHeaderProps> = ({ icon, iconBg, title, subtitle, onClose }) => {
  const titleId = React.useContext(ModalTitleIdContext);
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[var(--theme-border-primary)] px-6 py-4">
      <div className="flex items-center gap-3 min-w-0">
        {icon && (
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
            style={iconBg ? { background: iconBg } : undefined}
          >
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <h2
            id={titleId}
            className="text-base font-semibold text-[var(--theme-text-primary)] truncate"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-[var(--theme-text-secondary)] truncate">{subtitle}</p>
          )}
        </div>
      </div>
      <button
        onClick={onClose}
        className="shrink-0 rounded-lg p-1.5 text-[var(--theme-text-tertiary)] transition-colors hover:bg-[var(--theme-bg-accent-subtle)] hover:text-[var(--theme-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-border-focus)]"
        aria-label="Close modal"
      >
        <Dismiss24Regular />
      </button>
    </div>
  );
};

const ModalBody: React.FC<ModalSectionProps> = ({ children, className }) => (
  <div className={cn('px-6 py-4 overflow-y-auto', className)}>{children}</div>
);

const ModalFooter: React.FC<ModalSectionProps> = ({ children, className }) => (
  <div
    className={cn(
      'flex items-center justify-end gap-3 border-t border-[var(--theme-border-primary)] px-6 py-4',
      className,
    )}
  >
    {children}
  </div>
);

// ── Compound Component Export ─────────────────────────────────────────────

ModalRoot.displayName = 'Modal';
ModalHeader.displayName = 'Modal.Header';
ModalBody.displayName = 'Modal.Body';
ModalFooter.displayName = 'Modal.Footer';

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});

export { modalVariants };
