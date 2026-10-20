"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { MASTER_CHECKLIST } from "@/data/checklist"
import { Clock, ShieldAlert, Target, TrendingUp } from "lucide-react"

const PHASES = [
  {
    name: "Foundation",
    days: "1-30",
    description: "Technical SEO, site health, indexing, Core Web Vitals",
    icon: Target,
    color: "bg-seo-blue/10 text-seo-blue",
  },
  {
    name: "Content & Authority",
    days: "31-60",
    description: "Content strategy, topical map, pillar pages, link building",
    icon: TrendingUp,
    color: "bg-seo-green/10 text-seo-green",
  },
  {
    name: "Optimization & Growth",
    days: "61-90",
    description: "Content refresh, local SEO, monitoring, reporting",
    icon: Clock,
    color: "bg-seo-amber/10 text-seo-amber",
  },
] as const

export function RoadmapTimeline() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-foreground">90-Day Action Plan</h2>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>toolcraftr.com</span>
          <span>•</span>
          <span>90 days to ethical SEO growth</span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-1/2 w-px bg-seo-amber/20" />

        {PHASES.map((phase, idx) => (
          <PhaseCard key={phase.name} phase={phase} isLast={idx === PHASES.length - 1} />
        ))}
      </div>
    </div>
  )
}

function PhaseCard({
  phase,
  isLast,
}: {
  phase: (typeof PHASES)[number]
  isLast: boolean
}) {
  const Icon = phase.icon

  return (
    <div className="relative flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background ring-2 ring-seo-amber">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {phase.days}
          </span>
          <h3 className="text-sm font-semibold text-foreground">{phase.name}</h3>
        </div>
      </div>

      <div className="bg-card p-4 rounded-lg border">
        <p className="text-sm text-muted-foreground">{phase.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            Ethical practices only
          </Badge>
          <Badge variant="outline" className="text-xs">
            White-hat SEO
          </Badge>
        </div>
      </div>
    </div>
  )
}

export function RoadmapStats() {
  const totalTasks = MASTER_CHECKLIST.length
  const redZoneTasks = MASTER_CHECKLIST.filter((i) => i.redZone).length
  const criticalTasks = MASTER_CHECKLIST.filter((i) => i.priority === "Critical").length

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <StatCard title="Total Tasks" value={totalTasks} icon={Clock} color="text-seo-blue" />
      <StatCard title="Critical Priority" value={criticalTasks} icon={Target} color="text-seo-red" />
      <StatCard title="Red Zone Items" value={redZoneTasks} icon={ShieldAlert} color="text-seo-red" />
      <StatCard title="Timeline" value="90 Days" icon={Clock} color="text-seo-amber" />
    </div>
  )
}

function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string
  value: string | number
  icon: React.ElementType
  color: string
}) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between py-2">
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </div>
  )
}

function ListIcon() {
  return <Clock className="h-4 w-4" />
}
function TargetIcon() {
  return <Target className="h-4 w-4" />
}
function ShieldIcon() {
  return <ShieldAlert className="h-4 w-4" />
}
function ClockIcon() {
  return <Clock className="h-4 w-4" />
}