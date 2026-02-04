'use server'

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function createTicket(formData: FormData) {
  const title = formData.get('title') as string
  if (!title) return

  await prisma.ticket.create({
    data: {
      title,
      status: 'TODO'
    }
  })

  revalidatePath('/')
}

export async function updateTicketStatus(id: string, newStatus: string) {
  await prisma.ticket.update({
    where: { id },
    data: { status: newStatus }
  })

  revalidatePath('/')
}

export async function deleteTicket(id: string) {
  await prisma.ticket.delete({ where: { id } })
  revalidatePath('/')
}