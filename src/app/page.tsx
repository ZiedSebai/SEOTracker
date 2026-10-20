import { KPIDashboardCards } from "@/components/dashboard/kpi-cards"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { ChecklistTable } from "@/components/checklist/checklist-table"
import { KanbanBoard } from "@/components/kanban/kanban-board"
import { RoadmapTimeline, RoadmapStats } from "@/components/roadmap/roadmap-timeline"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">SEO Growth Command Center</h1>
          <p className="text-muted-foreground">
            Ethical SEO tracking, prioritized checklist, and 90-day action plan
            for toolcraftr.com
          </p>
        </div>
      </div>

      {/* Quick Actions / Daily Shortcuts */}

      <QuickActions />

      {/* KPI Cards */}
      <KPIDashboardCards />

      {/* Roadmap Stats */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">90-Day Plan Overview</h2>
        <RoadmapStats />
        <RoadmapTimeline />
      </section>

      {/* Kanban Board */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Kanban Board</h2>
        <KanbanBoard />
      </section>

      {/* Checklist Table */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Master Checklist</h2>
        <p className="text-sm text-muted-foreground">
          65 tasks across 16 categories with 10 Red Zone black-hat avoidance items
        </p>
        <ChecklistTable />
      </section>
    </div>
  )
}