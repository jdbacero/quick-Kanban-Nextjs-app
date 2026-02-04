'use client'

import { useOptimistic, startTransition, useState, DragEvent } from 'react'
import { updateTicketStatus, deleteTicket } from '@/actions/index'

type Ticket = {
  id: string
  title: string
  status: string
  createdAt: Date
}

export default function KanbanBoard({ initialTickets }: { initialTickets: Ticket[] }) {
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
        <div 
          key={col} 
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, col)}
          className={`bg-zinc-900/50 p-4 rounded-xl border transition-colors duration-200 ${
            isDragging 
              ? 'border-blue-500/30 bg-blue-500/5 border-dashed' 
              : 'border-zinc-800'
          }`}
        >
          <h2 className="font-bold text-zinc-400 mb-4 tracking-wider text-sm flex justify-between items-center">
            {col}
            <span className="bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full text-xs">
              {optimisticTickets.filter(t => t.status === col).length}
            </span>
          </h2>
          
          <div className="space-y-3 min-h-[150px]">
            {optimisticTickets
              .filter((t) => t.status === col)
              .map((ticket) => (
                <div 
                  key={ticket.id} 
                  draggable
                  onDragStart={(e) => handleDragStart(e, ticket.id)}
                  onDragEnd={() => setIsDragging(false)}
                  className="bg-zinc-900 border border-zinc-700 p-4 rounded-lg shadow-sm hover:border-zinc-500 transition-all group cursor-grab active:cursor-grabbing hover:shadow-md active:scale-[0.98]"
                >
                  <p className="font-medium text-zinc-100 mb-3 select-none">{ticket.title}</p>
                  
                  <div className="flex gap-2 text-xs">
                    {col !== 'TODO' && (
                      <button 
                        onClick={() => moveTicket(ticket.id, 'TODO')}
                        className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-400"
                      >
                        ← Todo
                      </button>
                    )}
                    {col !== 'DOING' && (
                      <button 
                        onClick={() => moveTicket(ticket.id, 'DOING')}
                        className="px-2 py-1 bg-blue-900/30 text-blue-400 hover:bg-blue-900/50 rounded"
                      >
                        Doing
                      </button>
                    )}
                    {col !== 'DONE' && (
                      <button 
                        onClick={() => moveTicket(ticket.id, 'DONE')}
                        className="px-2 py-1 bg-green-900/30 text-green-400 hover:bg-green-900/50 rounded"
                      >
                        Done →
                      </button>
                    )}
                     <button 
                        onClick={() => startTransition(async () => await deleteTicket(ticket.id))}
                        className="ml-auto text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-900/20 px-2 rounded"
                      >
                        ✕
                      </button>
                  </div>
                </div>
              ))}
              
              {optimisticTickets.filter(t => t.status === col).length === 0 && (
                <div className="text-zinc-600 text-xs text-center py-10 border-2 border-dashed border-zinc-800 rounded-lg select-none">
                  Drop items here
                </div>
              )}
          </div>
        </div>
      ))}
    </div>
  )
}