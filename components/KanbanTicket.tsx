'use client'

import { DragEvent } from 'react'
import { Ticket } from './types'

interface KanbanTicketProps {
    ticket: Ticket
    currentStatus: string
    onDragStart: (e: DragEvent<HTMLDivElement>, id: string) => void
    onDragEnd: () => void
    onMoveTicket: (id: string, newStatus: string) => void
    onDeleteTicket: (id: string) => void
}

export default function KanbanTicket({
    ticket,
    currentStatus,
    onDragStart,
    onDragEnd,
    onMoveTicket,
    onDeleteTicket
}: KanbanTicketProps) {
    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, ticket.id)}
            onDragEnd={onDragEnd}
            className="bg-zinc-900 border border-zinc-700 p-4 rounded-lg shadow-sm hover:border-zinc-500 transition-all group cursor-grab active:cursor-grabbing hover:shadow-md active:scale-[0.98]"
        >
            <p className="font-medium text-zinc-100 mb-3 select-none">{ticket.title}</p>

            <div className="flex gap-2 text-xs">
                {currentStatus !== 'TODO' && (
                    <button
                        onClick={() => onMoveTicket(ticket.id, 'TODO')}
                        className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-400"
                    >
                        ← Todo
                    </button>
                )}
                {currentStatus !== 'DOING' && (
                    <button
                        onClick={() => onMoveTicket(ticket.id, 'DOING')}
                        className="px-2 py-1 bg-blue-900/30 text-blue-400 hover:bg-blue-900/50 rounded"
                    >
                        Doing
                    </button>
                )}
                {currentStatus !== 'DONE' && (
                    <button
                        onClick={() => onMoveTicket(ticket.id, 'DONE')}
                        className="px-2 py-1 bg-green-900/30 text-green-400 hover:bg-green-900/50 rounded"
                    >
                        Done →
                    </button>
                )}
                <button
                    onClick={() => onDeleteTicket(ticket.id)}
                    className="ml-auto text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-900/20 px-2 rounded"
                >
                    ✕
                </button>
            </div>
        </div>
    )
}
