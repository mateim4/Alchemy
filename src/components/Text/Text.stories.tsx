import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'hero1', 'hero2', 'hero3',
        'h1', 'h2', 'h3', 'h4',
        'bodyLg', 'body', 'bodySm',
        'labelLg', 'label', 'labelSm',
        'code',
      ],
    },
    color: {
      control: 'select',
      options: [
        'primary', 'secondary', 'tertiary', 'muted', 'disabled',
        'accent', 'success', 'warning', 'error', 'info', 'inherit',
      ],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    gradient: { control: 'boolean' },
    truncate: { control: 'boolean' },
  },
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    variant: 'body',
    color: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {};

// -- Hero variants --

export const Hero1: Story = {
  args: { variant: 'hero1', children: 'Hero 1' },
};

export const Hero2: Story = {
  args: { variant: 'hero2', children: 'Hero 2' },
};

export const Hero3: Story = {
  args: { variant: 'hero3', children: 'Hero 3' },
};

// -- Heading variants --

export const Heading1: Story = {
  args: { variant: 'h1', children: 'Heading 1' },
};

export const Heading2: Story = {
  args: { variant: 'h2', children: 'Heading 2' },
};

export const Heading3: Story = {
  args: { variant: 'h3', children: 'Heading 3' },
};

export const Heading4: Story = {
  args: { variant: 'h4', children: 'Heading 4' },
};

// -- Body variants --

export const BodyLarge: Story = {
  args: { variant: 'bodyLg', children: 'Body Large text for longer paragraphs.' },
};

export const Body: Story = {
  args: { variant: 'body', children: 'Body text is the default variant.' },
};

export const BodySmall: Story = {
  args: { variant: 'bodySm', children: 'Small body text for captions.' },
};

// -- Label variants --

export const LabelLarge: Story = {
  args: { variant: 'labelLg', children: 'Label Large' },
};

export const Label: Story = {
  args: { variant: 'label', children: 'Label' },
};

export const LabelSmall: Story = {
  args: { variant: 'labelSm', children: 'Label Small' },
};

// -- Code --

export const Code: Story = {
  args: { variant: 'code', children: 'const x = 42;' },
};

// -- Gradient --

export const Gradient: Story = {
  args: { variant: 'hero1', gradient: true, children: 'Gradient Text' },
};

export const GradientHeading: Story = {
  args: { variant: 'h1', gradient: true, children: 'Gradient Heading' },
};

// -- Colors --

export const AccentColor: Story = {
  args: { color: 'accent', children: 'Accent colored text' },
};

export const SuccessColor: Story = {
  args: { color: 'success', children: 'Success colored text' },
};

export const ErrorColor: Story = {
  args: { color: 'error', children: 'Error colored text' },
};

export const MutedColor: Story = {
  args: { color: 'muted', children: 'Muted colored text' },
};

// -- Typography Scale --

export const TypographyScale: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Text variant="hero1">Hero 1</Text>
      <Text variant="hero2">Hero 2</Text>
      <Text variant="hero3">Hero 3</Text>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
      <Text variant="bodyLg">Body Large</Text>
      <Text variant="body">Body</Text>
      <Text variant="bodySm">Body Small</Text>
      <Text variant="labelLg">Label Large</Text>
      <Text variant="label">Label</Text>
      <Text variant="labelSm">Label Small</Text>
      <Text variant="code">Code</Text>
    </div>
  ),
};
