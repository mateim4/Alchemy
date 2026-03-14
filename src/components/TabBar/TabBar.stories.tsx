import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TabBar, TabPanel } from './TabBar';
import { HomeRegular, SettingsRegular, InfoRegular } from '@fluentui/react-icons';

const meta: Meta<typeof TabBar> = {
  title: 'Components/TabBar',
  component: TabBar,
  argTypes: {
    variant: {
      control: 'select',
      options: ['pill', 'underline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: { control: 'boolean' },
  },
  args: {
    variant: 'pill',
    size: 'md',
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof TabBar>;

const basicTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'settings', label: 'Settings' },
] as const;

type BasicTabId = (typeof basicTabs)[number]['id'];

export const Default: Story = {
  render: (args) => {
    const [active, setActive] = React.useState<BasicTabId>('overview');
    return <TabBar {...args} tabs={[...basicTabs]} activeTab={active} onTabChange={setActive} />;
  },
};

export const PillVariant: Story = {
  render: () => {
    const [active, setActive] = React.useState<BasicTabId>('overview');
    return <TabBar tabs={[...basicTabs]} activeTab={active} onTabChange={setActive} variant="pill" />;
  },
};

export const UnderlineVariant: Story = {
  render: () => {
    const [active, setActive] = React.useState<BasicTabId>('overview');
    return <TabBar tabs={[...basicTabs]} activeTab={active} onTabChange={setActive} variant="underline" />;
  },
};

export const SmallSize: Story = {
  render: () => {
    const [active, setActive] = React.useState<BasicTabId>('overview');
    return <TabBar tabs={[...basicTabs]} activeTab={active} onTabChange={setActive} size="sm" />;
  },
};

export const MediumSize: Story = {
  render: () => {
    const [active, setActive] = React.useState<BasicTabId>('overview');
    return <TabBar tabs={[...basicTabs]} activeTab={active} onTabChange={setActive} size="md" />;
  },
};

export const LargeSize: Story = {
  render: () => {
    const [active, setActive] = React.useState<BasicTabId>('overview');
    return <TabBar tabs={[...basicTabs]} activeTab={active} onTabChange={setActive} size="lg" />;
  },
};

export const WithIcons: Story = {
  render: () => {
    const tabs = [
      { id: 'home' as const, label: 'Home', icon: HomeRegular },
      { id: 'settings' as const, label: 'Settings', icon: SettingsRegular },
      { id: 'about' as const, label: 'About', icon: InfoRegular },
    ];
    const [active, setActive] = React.useState<'home' | 'settings' | 'about'>('home');
    return <TabBar tabs={tabs} activeTab={active} onTabChange={setActive} />;
  },
};

export const WithBadges: Story = {
  render: () => {
    const tabs = [
      { id: 'inbox' as const, label: 'Inbox', badge: 12 },
      { id: 'sent' as const, label: 'Sent', badge: 0 },
      { id: 'drafts' as const, label: 'Drafts', badge: 3 },
    ];
    const [active, setActive] = React.useState<'inbox' | 'sent' | 'drafts'>('inbox');
    return <TabBar tabs={tabs} activeTab={active} onTabChange={setActive} />;
  },
};

export const WithDisabledTabs: Story = {
  render: () => {
    const tabs = [
      { id: 'tab1' as const, label: 'Enabled' },
      { id: 'tab2' as const, label: 'Disabled', disabled: true },
      { id: 'tab3' as const, label: 'Also Enabled' },
    ];
    const [active, setActive] = React.useState<'tab1' | 'tab2' | 'tab3'>('tab1');
    return <TabBar tabs={tabs} activeTab={active} onTabChange={setActive} />;
  },
};

export const FullWidth: Story = {
  render: () => {
    const [active, setActive] = React.useState<BasicTabId>('overview');
    return (
      <div style={{ width: 500 }}>
        <TabBar tabs={[...basicTabs]} activeTab={active} onTabChange={setActive} fullWidth />
      </div>
    );
  },
};

export const WithTabPanels: Story = {
  render: () => {
    const tabs = [
      { id: 'tab1' as const, label: 'Tab 1' },
      { id: 'tab2' as const, label: 'Tab 2' },
      { id: 'tab3' as const, label: 'Tab 3' },
    ];
    const [active, setActive] = React.useState<'tab1' | 'tab2' | 'tab3'>('tab1');
    return (
      <div className="flex flex-col gap-4">
        <TabBar tabs={tabs} activeTab={active} onTabChange={setActive} />
        <TabPanel tabId="tab1" activeTab={active}>
          <div className="rounded-lg border border-[var(--theme-border-primary)] p-4">
            <p className="text-sm text-[var(--theme-text-primary)]">Content for Tab 1</p>
          </div>
        </TabPanel>
        <TabPanel tabId="tab2" activeTab={active}>
          <div className="rounded-lg border border-[var(--theme-border-primary)] p-4">
            <p className="text-sm text-[var(--theme-text-primary)]">Content for Tab 2</p>
          </div>
        </TabPanel>
        <TabPanel tabId="tab3" activeTab={active}>
          <div className="rounded-lg border border-[var(--theme-border-primary)] p-4">
            <p className="text-sm text-[var(--theme-text-primary)]">Content for Tab 3</p>
          </div>
        </TabPanel>
      </div>
    );
  },
};

export const UnderlineWithBadgesAndIcons: Story = {
  render: () => {
    const tabs = [
      { id: 'home' as const, label: 'Home', icon: HomeRegular, badge: 5 },
      { id: 'settings' as const, label: 'Settings', icon: SettingsRegular },
      { id: 'info' as const, label: 'Info', icon: InfoRegular, badge: 100 },
    ];
    const [active, setActive] = React.useState<'home' | 'settings' | 'info'>('home');
    return <TabBar tabs={tabs} activeTab={active} onTabChange={setActive} variant="underline" />;
  },
};
