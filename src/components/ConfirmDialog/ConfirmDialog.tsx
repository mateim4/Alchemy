import * as React from 'react';
import { Warning24Regular, Delete24Regular, Info24Regular } from '@fluentui/react-icons';
import { Modal } from '../Modal';
import { Button } from '../Button';

// ── Types ─────────────────────────────────────────────────────────────────

export type ConfirmVariant = 'danger' | 'warning' | 'info';

export interface ConfirmDialogProps {
  /** Whether the dialog is visible */
  isOpen: boolean;
  /** Called when the dialog should close (cancel or backdrop) */
  onClose: () => void;
  /** Called when the user confirms */
  onConfirm: () => void;
  /** Dialog title */
  title: string;
  /** Dialog message/body */
  message: React.ReactNode;
  /** Visual variant (default: 'danger') */
  variant?: ConfirmVariant;
  /** Confirm button label (default: 'Confirm') */
  confirmLabel?: string;
  /** Cancel button label (default: 'Cancel') */
  cancelLabel?: string;
}

export interface UseConfirmDialogOptions {
  title: string;
  message: React.ReactNode;
  variant?: ConfirmVariant;
  confirmLabel?: string;
  cancelLabel?: string;
}

// ── Variant config ────────────────────────────────────────────────────────

const variantConfig: Record<ConfirmVariant, {
  icon: React.ReactNode;
  iconBg: string;
  buttonVariant: 'danger' | 'primary';
}> = {
  danger: {
    icon: <Delete24Regular />,
    iconBg: 'var(--color-status-error-DEFAULT, #ef4444)',
    buttonVariant: 'danger',
  },
  warning: {
    icon: <Warning24Regular />,
    iconBg: 'var(--color-status-warning-DEFAULT, #f59e0b)',
    buttonVariant: 'danger',
  },
  info: {
    icon: <Info24Regular />,
    iconBg: 'var(--color-accent-primary, #FF6B35)',
    buttonVariant: 'primary',
  },
};

/**
 * Modal-based confirmation dialog.
 *
 * @example
 * ```tsx
 * <ConfirmDialog
 *   isOpen={showDelete}
 *   onClose={() => setShowDelete(false)}
 *   onConfirm={handleDelete}
 *   title="Delete item?"
 *   message="This action cannot be undone."
 *   variant="danger"
 * />
 * ```
 */
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  variant = 'danger',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
}) => {
  const config = variantConfig[variant];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" closeOnBackdrop={false}>
      <Modal.Header
        icon={config.icon}
        iconBg={config.iconBg}
        title={title}
        onClose={onClose}
      />
      <Modal.Body>
        <div className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">{message}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button variant={config.buttonVariant} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ConfirmDialog.displayName = 'ConfirmDialog';

// ── Imperative hook ───────────────────────────────────────────────────────

/**
 * Imperative confirmation dialog hook. Returns a `confirm()` function
 * that opens the dialog and resolves a Promise with the user's choice.
 *
 * @example
 * ```tsx
 * const { confirm, dialogProps } = useConfirmDialog();
 *
 * const handleDelete = async () => {
 *   const ok = await confirm({ title: 'Delete?', message: 'Sure?' });
 *   if (ok) deleteItem();
 * };
 *
 * return <><button onClick={handleDelete}>Delete</button><ConfirmDialog {...dialogProps} /></>;
 * ```
 */
export function useConfirmDialog() {
  const [state, setState] = React.useState<{
    isOpen: boolean;
    options: UseConfirmDialogOptions | null;
    resolve: ((value: boolean) => void) | null;
  }>({ isOpen: false, options: null, resolve: null });

  const confirm = React.useCallback((options: UseConfirmDialogOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({ isOpen: true, options, resolve });
    });
  }, []);

  const handleClose = React.useCallback(() => {
    state.resolve?.(false);
    setState({ isOpen: false, options: null, resolve: null });
  }, [state.resolve]);

  const handleConfirm = React.useCallback(() => {
    state.resolve?.(true);
    setState({ isOpen: false, options: null, resolve: null });
  }, [state.resolve]);

  const dialogProps: ConfirmDialogProps = {
    isOpen: state.isOpen,
    onClose: handleClose,
    onConfirm: handleConfirm,
    title: state.options?.title ?? '',
    message: state.options?.message ?? '',
    variant: state.options?.variant,
    confirmLabel: state.options?.confirmLabel,
    cancelLabel: state.options?.cancelLabel,
  };

  return { confirm, dialogProps };
}
