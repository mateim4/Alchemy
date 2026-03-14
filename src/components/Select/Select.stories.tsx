import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const basicOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
];

const dotOptions = [
  { value: 'active', label: 'Active', dotColor: '#10b981' },
  { value: 'pending', label: 'Pending', dotColor: '#f59e0b' },
  { value: 'inactive', label: 'Inactive', dotColor: '#ef4444' },
];

const disabledOptions = [
  { value: 'opt1', label: 'Available Option' },
  { value: 'opt2', label: 'Disabled Option', disabled: true },
  { value: 'opt3', label: 'Another Available' },
  { value: 'opt4', label: 'Also Disabled', disabled: true },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    size: 'md',
    placeholder: 'Select...',
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: 300, maxWidth: 300 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('');
    return <Select {...args} options={basicOptions} value={value} onChange={setValue} />;
  },
};

export const Small: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    return <Select options={basicOptions} value={value} onChange={setValue} size="sm" />;
  },
};

export const Medium: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    return <Select options={basicOptions} value={value} onChange={setValue} size="md" />;
  },
};

export const Large: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    return <Select options={basicOptions} value={value} onChange={setValue} size="lg" />;
  },
};

export const WithDotColors: Story = {
  render: () => {
    const [value, setValue] = React.useState('active');
    return <Select options={dotOptions} value={value} onChange={setValue} />;
  },
};

export const WithDisabledOptions: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    return <Select options={disabledOptions} value={value} onChange={setValue} />;
  },
};

export const DisabledSelect: Story = {
  render: () => {
    const [value, setValue] = React.useState('apple');
    return <Select options={basicOptions} value={value} onChange={setValue} disabled />;
  },
};

export const CustomPlaceholder: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <Select
        options={basicOptions}
        value={value}
        onChange={setValue}
        placeholder="Choose a fruit..."
      />
    );
  },
};

export const Preselected: Story = {
  render: () => {
    const [value, setValue] = React.useState('cherry');
    return <Select options={basicOptions} value={value} onChange={setValue} />;
  },
};

export const AllSizes: Story = {
  render: () => {
    const [sm, setSm] = React.useState('');
    const [md, setMd] = React.useState('');
    const [lg, setLg] = React.useState('');
    return (
      <div className="flex flex-col gap-3">
        <Select options={basicOptions} value={sm} onChange={setSm} size="sm" placeholder="Small" />
        <Select options={basicOptions} value={md} onChange={setMd} size="md" placeholder="Medium" />
        <Select options={basicOptions} value={lg} onChange={setLg} size="lg" placeholder="Large" />
      </div>
    );
  },
};
