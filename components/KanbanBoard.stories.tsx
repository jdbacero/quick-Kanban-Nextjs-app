import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import KanbanBoard from './KanbanBoard';

const meta = {
  title: 'Kanban/Board',
  component: KanbanBoard,
} satisfies Meta<typeof KanbanBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    initialTickets: [
      { id: '1', title: 'Ticket 1', status: 'TODO', createdAt: new Date() },
      { id: '2', title: 'Ticket 2', status: 'DOING', createdAt: new Date() },
      { id: '3', title: 'Ticket 3', status: 'DONE', createdAt: new Date() },
    ],
    updateTicketStatus() { },
    deleteTicket() { },
  },
};