import * as React from 'react';

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  /** Custom fallback UI. Receives the error for rendering. */
  fallback?: React.ReactNode | ((error: Error) => React.ReactNode);
  /** Called when an error is caught */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Catches React rendering errors and displays a fallback UI.
 *
 * @example
 * ```tsx
 * <ErrorBoundary
 *   fallback={<p>Something went wrong.</p>}
 *   onError={(err) => logToService(err)}
 * >
 *   <App />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  private handleCopyDetails = async () => {
    const message = this.state.error?.message || 'Unknown error';
    const stack = this.state.error?.stack || '';
    const details = stack ? `${message}\n\n${stack}` : message;

    try {
      await navigator.clipboard.writeText(details);
    } catch {
      // Clipboard may be unavailable
    }
  };

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props;

      // Custom fallback
      if (fallback) {
        return typeof fallback === 'function' ? fallback(this.state.error!) : fallback;
      }

      // Default fallback
      return (
        <div className="flex h-full w-full items-center justify-center p-6">
          <div className="w-full max-w-xl rounded-xl border border-[var(--theme-border-primary)] bg-[var(--theme-bg-secondary)] p-6 shadow-[var(--theme-shadow-lg)]">
            <h2 className="mb-2 text-xl font-bold text-[var(--theme-text-primary)]">
              Something went wrong
            </h2>
            <p className="mb-6 text-sm text-[var(--theme-text-secondary)]">
              {this.state.error?.message}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center justify-center rounded-lg bg-[var(--color-accent-primary)] px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-border-focus)]"
              >
                Try Again
              </button>
              <button
                onClick={this.handleCopyDetails}
                className="inline-flex items-center justify-center rounded-lg border border-[var(--theme-border-primary)] bg-[var(--theme-bg-secondary)] px-4 py-2 text-sm font-medium text-[var(--theme-text-primary)] transition-colors hover:bg-[var(--theme-bg-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-border-focus)]"
              >
                Copy Details
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
