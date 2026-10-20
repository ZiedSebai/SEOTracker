"use client"

import { KanbanBoard } from "@/components/kanban/kanban-board"

export default function KanbanPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Kanban Board</h1>
          <p className="text-muted-foreground">
            Task workflow management — drag items across status columns
          </p>
        </div>
      </div>

      <KanbanBoard />
    </div>
  )
}