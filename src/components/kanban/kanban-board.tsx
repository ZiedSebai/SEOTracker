"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { MASTER_CHECKLIST } from "@/data/checklist"
import { KANBAN_COLUMNS } from "@/lib/utils"
import { CheckCircle2, Clock, List, ShieldAlert } from "lucide-react"

const COLUMN_ICONS: Record<string, React.ElementType> = {
  "Not Started": List,
  "In Progress": Clock,
  Review: List,
  Done: CheckCircle2,
  Blocked: ShieldAlert,
}

const COLUMN_COLORS: Record<string, string> = {
  "Not Started": "bg-muted/50",
  "In Progress": "bg-blue-50/50 dark:bg-blue-900/10",
  Review: "bg-purple-50/50 dark:bg-purple-900/10",
  Done: "bg-seo-green/10 dark:bg-seo-green/20",
  Blocked: "bg-destructive/10 dark:bg-destructive/20",
}

export function KanbanBoard() {
  const columns = KANBAN_COLUMNS
  const itemsByStatus = React.useMemo(() => {
    return columns.map((col) => ({
      ...col,
      items: MASTER_CHECKLIST.filter((item) => item.status === col.id),
    }))
  }, [])

  const totalItems = MASTER_CHECKLIST.length

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-foreground">Kanban Board</h2>
        <div className="flex gap-2">
          {itemsByStatus.map((col) => (
            <span key={col.id} className="text-xs font-medium px-2 py-1 rounded-full border">
              {col.id}
              <span className="ml-1">{col.items.length}</span>
            </span>
          ))}
          <span className="text-xs font-medium px-2 py-1 rounded-full border border-transparent text-muted-foreground">
            Total: {totalItems}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row overflow-x-auto h-[600px]">
        {itemsByStatus.map((column) => (
          <KanbanColumn key={column.id} column={column} />
        ))}
      </div>
    </div>
  )
}

type KanbanColumnItem = {
  id: string
  title: string
  color: string
  items: typeof MASTER_CHECKLIST
}

function KanbanColumn({ column }: { column: KanbanColumnItem }) {
  const Icon = COLUMN_ICONS[column.id] || List
  const bgColor = COLUMN_COLORS[column.id] || "bg-muted/50"

  return (
    <div
      className={`flex flex-col gap-3 w-[320px] shrink-0 rounded-lg border p-3 ${bgColor}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
        </div>
        <Badge variant="outline" className="text-xs">
          {column.items.length}
        </Badge>
      </div>

      <div className="flex flex-col gap-2 min-h-[200px]">
        {column.items.map((item) => (
          <KanbanCard key={item.id} item={item} />
        ))}
      </div>

      {column.items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-4 text-xs text-muted-foreground text-center">
          No tasks
        </div>
      )}
    </div>
  )
}

function KanbanCard({ item }: { item: typeof MASTER_CHECKLIST[number] }) {
  return (
    <div className="flex flex-col gap-1 rounded-md border border-input bg-card p-3 text-sm shadow-sm">
      <div className="flex items-center justify-between">
        <span className="font-medium text-foreground line-clamp-1">{item.task}</span>
        {item.redZone && (
          <Badge variant="destructive" className="text-[10px]">
            Red Zone
          </Badge>
        )}
      </div>
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="text-[10px]">
          {item.priority}
        </Badge>
        <Badge variant="secondary" className="text-[10px]">
          {item.category}
        </Badge>
      </div>
    </div>
  )
}