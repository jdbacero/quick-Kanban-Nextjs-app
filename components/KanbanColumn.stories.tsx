import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import KanbanColumn from './KanbanColumn';

const meta = {
    title: 'Kanban/Column',
    // 👇 The component you're working on
    component: KanbanColumn,
} satisfies Meta<typeof KanbanColumn>;

export default meta;
// 👇 Type helper to reduce boilerplate 
type Story = StoryObj<typeof meta>;

// 👇 A story named Primary that renders `<Button primary label="Button" />`
export const Todo: Story = {
    args: {
        tickets: [
            {
                id: '1',
                title: 'Ticket 1',
                status: 'TODO',
                createdAt: new Date(),
            },
            {
                id: '2',
                title: 'Ticket 2',
                status: 'DOING',
                createdAt: new Date(),
            },
            {
                id: '3',
                title: 'Ticket 3',
                status: 'DONE',
                createdAt: new Date(),
            },
        ],
        status: 'TODO',
        onDragStart: () => { },
        onDragEnd: () => { },
        onMoveTicket: () => { },
        onDeleteTicket: () => { },
        isDragging: false,
        onDragOver: () => { },
        onDrop: () => { },
    },
};
export const Doing: Story = {
    args: {
        tickets: [
            {
                id: '1',
                title: 'Ticket 1',
                status: 'TODO',
                createdAt: new Date(),
            },
            {
                id: '2',
                title: 'Ticket 2',
                status: 'DOING',
                createdAt: new Date(),
            },
            {
                id: '3',
                title: 'Ticket 3',
                status: 'DONE',
                createdAt: new Date(),
            },
        ],
        status: 'DOING',
        onDragStart: () => { },
        onDragEnd: () => { },
        onMoveTicket: () => { },
        onDeleteTicket: () => { },
        isDragging: false,
        onDragOver: () => { },
        onDrop: () => { },
    },
};

export const Done: Story = {
    args: {
        tickets: [
            {
                id: '1',
                title: 'Ticket 1',
                status: 'TODO',
                createdAt: new Date(),
            },
            {
                id: '2',
                title: 'Ticket 2',
                status: 'DOING',
                createdAt: new Date(),
            },
            {
                id: '3',
                title: 'Ticket 3',
                status: 'DONE',
                createdAt: new Date(),
            },
        ],
        status: 'DONE',
        onDragStart: () => { },
        onDragEnd: () => { },
        onMoveTicket: () => { },
        onDeleteTicket: () => { },
        isDragging: false,
        onDragOver: () => { },
        onDrop: () => { },
    },
};