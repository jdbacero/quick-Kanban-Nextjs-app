import { prisma } from "@/lib/db"

export async function getTickets() {
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return tickets
  } catch (error) {
    console.error("Database Error:", error)
    return [] 
  }
}