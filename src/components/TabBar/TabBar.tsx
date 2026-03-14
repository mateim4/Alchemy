import * as React from 'react';
import { cn } from '../../utils/cn';

// ── Types ─────────────────────────────────────────────────────────────────

export interface Tab<T extends string = string> {
  id: T;
  label: string;
  icon?: React.ElementType;
  badge?: number;
  disabled?: boolean;
}

export interface TabBarProps<T extends string = string> {
  tabs: Tab<T>[];
  activeTab: T;
  onTabChange: (tabId: T) => void;
  variant?: 'pill' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  responsiveLabels?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export interface TabPanelProps {
  tabId: string;
  activeTab: string;
  children: React.ReactNode;
  className?: string;
}

// ── Size config ───────────────────────────────────────────────────────────

const sizeConfig = {
  sm: { tab: 'px-3 py-1.5 text-xs gap-1.5', icon: { width: 14, height: 14 } },
  md: { tab: 'px-4 py-2 text-sm gap-2', icon: { width: 16, height: 16 } },
  lg: { tab: 'px-5 py-2.5 text-base gap-2.5', icon: { width: 18, height: 18 } },
} as const;

/**
 * Accessible tab bar with pill and underline variants.
 *
 * Implements WAI-ARIA Tabs pattern with roving tabIndex and arrow key navigation.
 *
 * @example
 * ```tsx
 * <TabBar
 *   tabs={[
 *     { id: 'overview', label: 'Overview', icon: HomeRegular },
 *     { id: 'details', label: 'Details', badge: 3 },
 *   ]}
 *   activeTab="overview"
 *   onTabChange={setActiveTab}
 * />
 * <TabPanel tabId="overview" activeTab={activeTab}>Overview content</TabPanel>
 * <TabPanel tabId="details" activeTab={activeTab}>Details content</TabPanel>
 * ```
 */
export function TabBar<T extends string = string>({
  tabs,
  activeTab,
  onTabChange,
  variant = 'pill',
  size = 'md',
  responsiveLabels = true,
  fullWidth = false,
  className,
}: TabBarProps<T>) {
  const tablistRef = React.useRef<HTMLDivElement>(null);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      const enabledTabs = tabs.filter((t) => !t.disabled);
      const currentIdx = enabledTabs.findIndex((t) => t.id === activeTab);
      let nextIdx = -1;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIdx = (currentIdx + 1) % enabledTabs.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIdx = (currentIdx - 1 + enabledTabs.length) % enabledTabs.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextIdx = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        nextIdx = enabledTabs.length - 1;
      }

      if (nextIdx >= 0) {
        const nextTab = enabledTabs[nextIdx];
        onTabChange(nextTab.id);
        const btn = tablistRef.current?.querySelector<HTMLElement>(
          `[data-tab-id="${CSS.escape(nextTab.id)}"]`,
        );
        btn?.focus();
      }
    },
    [tabs, activeTab, onTabChange],
  );

  const { tab: sizeClass, icon: iconSize } = sizeConfig[size];

  return (
    <div
      ref={tablistRef}
      role="tablist"
      onKeyDown={handleKeyDown}
      className={cn(
        'inline-flex items-center',
        variant === 'pill' && 'gap-0.5 rounded-lg p-0.5 bg-[var(--theme-bg-tertiary)] border border-[var(--theme-border-secondary)]',
        variant === 'underline' && 'gap-1 border-b border-[var(--theme-border-primary)]',
        fullWidth && 'w-full',
        className,
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            data-tab-id={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            aria-disabled={tab.disabled}
            tabIndex={isActive ? 0 : -1}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onTabChange(tab.id)}
            className={cn(
              'inline-flex items-center justify-center whitespace-nowrap font-medium transition-all',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-border-focus)]',
              sizeClass,
              fullWidth && 'flex-1',
              variant === 'pill' && 'rounded-md',
              variant === 'pill' && isActive && 'bg-[var(--theme-bg-accent-emphasis)] text-[var(--theme-text-onAccent)] shadow-sm',
              variant === 'pill' && !isActive && 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-bg-accent-subtle)]',
              variant === 'underline' && 'border-b-2 -mb-px',
              variant === 'underline' && isActive && 'border-[var(--color-accent-primary)] text-[var(--theme-text-accent)]',
              variant === 'underline' && !isActive && 'border-transparent text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:border-[var(--theme-border-primary)]',
              tab.disabled && 'opacity-40 cursor-not-allowed',
            )}
          >
            {Icon && <Icon style={iconSize} />}
            <span className={cn(responsiveLabels && 'hidden sm:inline')}>
              {tab.label}
            </span>
            {tab.badge !== undefined && tab.badge > 0 && (
              <span
                className={cn(
                  'ml-1 inline-flex items-center justify-center rounded-full px-1.5 text-[10px] font-semibold leading-4',
                  isActive
                    ? 'bg-white/20 text-[var(--theme-text-onAccent)]'
                    : 'bg-[var(--theme-bg-accent-subtle)] text-[var(--theme-text-accent)]',
                )}
              >
                {tab.badge > 99 ? '99+' : tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

TabBar.displayName = 'TabBar';

/**
 * Tab panel container with proper ARIA attributes.
 * Only renders when its `tabId` matches `activeTab`.
 */
export const TabPanel: React.FC<TabPanelProps> = ({ tabId, activeTab, children, className }) => {
  if (tabId !== activeTab) return null;

  return (
    <div
      id={`tabpanel-${tabId}`}
      role="tabpanel"
      aria-labelledby={`tab-${tabId}`}
      className={className}
    >
      {children}
    </div>
  );
};

TabPanel.displayName = 'TabPanel';
