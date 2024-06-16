import { ShowCase } from '@repo/ui/showcase';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: ShowCase,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof ShowCase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Sample Component',
    description:
      'This is a description. Sample component is a sample component.',
    tags: [
      { id: 1, name: 'tag1' },
      { id: 2, name: 'tag2' },
    ],
    children: <h1>open google</h1>,
  },
};
