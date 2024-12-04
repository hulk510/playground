import { Input } from '@repo/ui/ui/input';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};
