import { createTicket } from "@/actions/index"
import { getTickets } from "@/lib/data"
import KanbanBoard from "@/components/KanbanBoard"

export default async function Page() {
  const tickets = await getTickets()

  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Anti-Lag Issue Tracker
            </h1>
            <p className="text-zinc-500 mt-1">Next.js 16 • Server Actions • Optimistic UI</p>
          </div>

          <form action={createTicket} className="flex gap-2 w-full md:w-auto">
            <input 
              name="title" 
              required
              className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64 placeholder:text-zinc-600" 
              placeholder="Add a new bug..." 
            />
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Add Ticket
            </button>
          </form>
        </header>

        <KanbanBoard initialTickets={tickets} />
      </div>
    </main>
  )
}