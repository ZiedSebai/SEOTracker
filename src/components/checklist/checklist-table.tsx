"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/toast"
import {
  getChecklistItemsByCategory,
  getChecklistStats,
  getItemsByPriority,
  getItemsByStatus,
  getRedZoneItems,
  MASTER_CHECKLIST,
} from "@/data/checklist"
import {
  CHECKLIST_CATEGORIES,
  PRIORITY_LEVELS,
  STATUS_LEVELS,
} from "@/lib/utils"
import { cn } from "@/lib/utils"
import { loadChecklist, saveChecklist, resetChecklist } from "@/lib/storage"
import {
  Activity,
  CheckCircle2,
  Filter,
  List,
  RefreshCw,
  Search,
  ShieldAlert,
  X,
} from "lucide-react"

const PRIORITY_COLORS: Record<string, string> = {
  Critical: "bg-destructive text-destructive-foreground",
  High: "bg-seo-red text-seo-red-foreground",
  Medium: "bg-seo-amber text-seo-amber-foreground",
  Low: "bg-seo-blue text-seo-blue-foreground",
}

const STATUS_COLORS: Record<string, string> = {
  "Not Started": "bg-muted text-muted-foreground",
  "In Progress": "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-100",
  Review: "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-100",
  Done: "bg-seo-green text-seo-green-foreground",
  Blocked: "bg-destructive text-destructive-foreground",
}

export function ChecklistTable() {
  const [allItems, setAllItems] = React.useState(() =>
    loadChecklist(MASTER_CHECKLIST)
  )
  const [categoryFilter, setCategoryFilter] = React.useState<string>("All")
  const [priorityFilter, setPriorityFilter] = React.useState<string>("All")
  const [statusFilter, setStatusFilter] = React.useState<string>("All")
  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [showRedZoneOnly, setShowRedZoneOnly] = React.useState<boolean>(false)

  const stats = getChecklistStats(allItems)

  const filteredItems = React.useMemo(() => {
    let filtered = allItems

    if (categoryFilter !== "All") {
      filtered = getChecklistItemsByCategory(categoryFilter as any, filtered)
    }
    if (priorityFilter !== "All") {
      filtered = getItemsByPriority(priorityFilter as any, filtered)
    }
    if (statusFilter !== "All") {
      filtered = getItemsByStatus(statusFilter as any, filtered)
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    if (showRedZoneOnly) {
      filtered = getRedZoneItems(filtered)
    }

    return filtered
  }, [allItems, categoryFilter, priorityFilter, statusFilter, searchQuery, showRedZoneOnly])

  const handleStatusChange = (id: string, newStatus: string) => {
    setAllItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, status: newStatus as any } : item
      )
      saveChecklist(updated)
      toast(`Task status updated to ${newStatus}`)
      return updated
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Tasks"
          value={stats.total}
          icon={<List className="h-5 w-5" />}
          color="text-seo-blue"
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={<CheckCircle2 className="h-5 w-5" />}
          color="text-seo-green"
        />
        <StatCard
          title="Red Zone"
          value={stats.redZone}
          icon={<ShieldAlert className="h-5 w-5" />}
          color="text-seo-red"
        />
        <StatCard
          title="Completion Rate"
          value={
            stats.total > 0
              ? Math.round((stats.completed / stats.total) * 100) + "%"
              : "0%"
          }
          icon={<Activity className="h-5 w-5" />}
          color="text-seo-amber"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <span className="text-xs text-muted-foreground">
            Changes are saved automatically
          </span>
          <button
            onClick={() => {
              if (window.confirm("Reset all checklist progress to defaults?")) {
                resetChecklist()
                setAllItems(MASTER_CHECKLIST)
              }
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium text-destructive border-destructive hover:bg-destructive/10 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Reset to defaults
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <FilterPill
            label="Category"
            value={categoryFilter}
            options={["All", ...CHECKLIST_CATEGORIES]}
            onChange={setCategoryFilter}
          />
          <FilterPill
            label="Priority"
            value={priorityFilter}
            options={["All", ...PRIORITY_LEVELS]}
            onChange={setPriorityFilter}
          />
          <FilterPill
            label="Status"
            value={statusFilter}
            options={["All", ...STATUS_LEVELS]}
            onChange={setStatusFilter}
          />
          <ButtonRedZone
            active={showRedZoneOnly}
            onToggle={setShowRedZoneOnly}
          />
        </div>

        <button
          onClick={() => {
            setCategoryFilter("All")
            setPriorityFilter("All")
            setStatusFilter("All")
            setSearchQuery("")
            setShowRedZoneOnly(false)
          }}
          className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
        >
          <RefreshCw className="mr-1 h-3 w-3" /> Reset filters
        </button>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8">Done</TableHead>
              <TableHead>Task</TableHead>
              <TableHead className="w-20">Category</TableHead>
              <TableHead className="w-16">Priority</TableHead>
              <TableHead className="w-20">Status</TableHead>
              <TableHead className="w-24">Impact/Effort</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id} className="group">
                <TableCell className="w-8">
                  <Checkbox
                    checked={item.status === "Done"}
                    onCheckedChange={() => handleStatusChange(item.id, "Done")}
                  />
                </TableCell>
                <TableCell className="font-medium text-foreground">
                  {item.task}
                  {item.redZone && (
                    <Badge variant="destructive" className="ml-2 text-[10px]">
                      Red Zone
                    </Badge>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.description}
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <span className="font-medium">Tools:</span>
                    {item.suggestedTools.slice(0, 3).map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                    {item.suggestedTools.length > 3 && (
                      <span>+{item.suggestedTools.length - 3}</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.priority === "Critical"
                        ? "destructive"
                        : item.priority === "High"
                          ? "secondary"
                          : item.priority === "Medium"
                            ? "outline"
                            : "default"
                    }
                    className="text-xs"
                  >
                    {item.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs border-transparent",
                      STATUS_COLORS[item.status]
                    )}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-xs text-muted-foreground">
                    Impact: {item.impact}/5
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Effort: {item.effort}/5
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <X className="mb-2 h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No tasks match your filters</p>
        </div>
      )}
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string
  value: number | string
  icon: React.ReactNode
  color: string
}) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between space-y-0 py-2">
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="flex items-center justify-center p-1 rounded-md bg-muted/50">
          {icon}
        </div>
      </div>
    </div>
  )
}

function FilterPill({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (val: string) => void
}) {
  return (
    <div className="relative inline-block">
      <button
        onClick={() => {
          const currentIdx = options.indexOf(value)
          const nextIdx = (currentIdx + 1) % options.length
          onChange(options[nextIdx])
        }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-input bg-background text-sm font-medium hover:bg-accent transition-colors"
      >
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
        <span className="font-medium">{value}</span>
        <X className="h-3 w-3" />
      </button>
    </div>
  )
}

function ButtonRedZone({
  active,
  onToggle,
}: {
  active: boolean
  onToggle: (val: boolean) => void
}) {
  return (
    <button
      onClick={() => onToggle(!active)}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
        active
          ? "bg-destructive text-white border-destructive"
          : "bg-background text-muted-foreground border-input hover:bg-accent"
      }`}
    >
      <ShieldAlert className={`h-3 w-3 ${active ? "text-white" : "text-muted-foreground"}`} />
      <span>{active ? "Hide Red Zone" : "Red Zone Only"}</span>
    </button>
  )
}