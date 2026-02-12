'use client'

import { useOptimistic, startTransition, useState, DragEvent } from 'react'
import { Ticket } from './types'
import KanbanColumn from './KanbanColumn'

interface KanbanProps {
  initialTickets: Ticket[]
  updateTicketStatus: (id: string, newStatus: string) => void
  deleteTicket: (id: string) => void
}

export default function KanbanBoard({ initialTickets, updateTicketStatus, deleteTicket }: KanbanProps) {
  const [optimisticTickets, setOptimisticTickets] = useOptimistic(
    initialTickets,
    (state, updatedTicket: { id: string; status: string }) => {
      return state.map((t) =>
        t.id === updatedTicket.id ? { ...t, status: updatedTicket.status } : t
      )
    }
  )

  const [isDragging, setIsDragging] = useState(false)

  const columns = ['TODO', 'DOING', 'DONE']

  const moveTicket = (id: string, newStatus: string) => {
    startTransition(async () => {
      setOptimisticTickets({ id, status: newStatus })
      await updateTicketStatus(id, newStatus)
    })
  }

  // drag & drop handlers
  const handleDragStart = (e: DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData('ticketId', id)
    setIsDragging(true)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault() // allow dropping
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>, newStatus: string) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('ticketId')
    if (id) {
      moveTicket(id, newStatus)
    }
    setIsDragging(false)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((col) => (
        <KanbanColumn
          key={col}
          status={col}
          tickets={optimisticTickets.filter(t => t.status === col)}
          isDragging={isDragging}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, col)}
          onDragStart={handleDragStart}
          onDragEnd={() => setIsDragging(false)}
          onMoveTicket={moveTicket}
          onDeleteTicket={(id) => startTransition(async () => await deleteTicket(id))}
        />
      ))}
    </div>
  )
}