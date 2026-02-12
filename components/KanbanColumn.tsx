'use client'

import { DragEvent } from 'react'
import { Ticket } from './types'
import KanbanTicket from './KanbanTicket'

interface KanbanColumnProps {
    status: string
    tickets: Ticket[]
    isDragging: boolean
    onDragOver: (e: DragEvent<HTMLDivElement>) => void
    onDrop: (e: DragEvent<HTMLDivElement>) => void
    onDragStart: (e: DragEvent<HTMLDivElement>, id: string) => void
    onDragEnd: () => void
    onMoveTicket: (id: string, newStatus: string) => void
    onDeleteTicket: (id: string) => void
}

export default function KanbanColumn({
    status,
    tickets,
    isDragging,
    onDragOver,
    onDrop,
    onDragStart,
    onDragEnd,
    onMoveTicket,
    onDeleteTicket
}: KanbanColumnProps) {
    return (
        <div
            onDragOver={onDragOver}
            onDrop={onDrop}
            className={`bg-zinc-900/50 p-4 rounded-xl border transition-colors duration-200 ${isDragging
                    ? 'border-blue-500/30 bg-blue-500/5 border-dashed'
                    : 'border-zinc-800'
                }`}
        >
            <h2 className="font-bold text-zinc-400 mb-4 tracking-wider text-sm flex justify-between items-center">
                {status}
                <span className="bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full text-xs">
                    {tickets.length}
                </span>
            </h2>

            <div className="space-y-3 min-h-[150px]">
                {tickets.map((ticket) => (
                    <KanbanTicket
                        key={ticket.id}
                        ticket={ticket}
                        currentStatus={status}
                        onDragStart={onDragStart}
                        onDragEnd={onDragEnd}
                        onMoveTicket={onMoveTicket}
                        onDeleteTicket={onDeleteTicket}
                    />
                ))}

                {tickets.length === 0 && (
                    <div className="text-zinc-600 text-xs text-center py-10 border-2 border-dashed border-zinc-800 rounded-lg select-none">
                        Drop items here
                    </div>
                )}
            </div>
        </div>
    )
}
