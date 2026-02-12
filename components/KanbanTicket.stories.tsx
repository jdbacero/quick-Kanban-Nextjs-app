import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import KanbanTicket from './KanbanTicket';

const meta = {
    title: 'Kanban/Ticket',
    // 👇 The component you're working on
    component: KanbanTicket,
} satisfies Meta<typeof KanbanTicket>;

export default meta;
// 👇 Type helper to reduce boilerplate 
type Story = StoryObj<typeof meta>;

// 👇 A story named Primary that renders `<Button primary label="Button" />`
export const Todo: Story = {
    args: {
        ticket: {
            "id": 2,
            "title": "Ticket 1",
            "status": "TODO",
            "createdAt": "2026-02-10T01:05:03.872Z"
        },
        currentStatus: "DONE",
        onDragStart: () => { },
        onDragEnd: () => { },
        onMoveTicket: () => { },
        onDeleteTicket: () => { },
    },
};

export const Doing: Story = {
    args: {
        ticket: {
            id: '1',
            title: 'Ticket 1',
            status: 'DOING',
            createdAt: new Date(),
        },
        currentStatus: 'DOING',
        onDragStart: () => { },
        onDragEnd: () => { },
        onMoveTicket: () => { },
        onDeleteTicket: () => { },
    },
};

export const Done: Story = {
    args: {
        ticket: {
            id: '1',
            title: 'Ticket 1',
            status: 'DONE',
            createdAt: new Date(),
        },
        currentStatus: 'DONE',
        onDragStart: () => { },
        onDragEnd: () => { },
        onMoveTicket: () => { },
        onDeleteTicket: () => { },
    },
};