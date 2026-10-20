"use client"

import * as React from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  Clock,
  LayoutDashboard,
  ShieldAlert,
  Target,
} from "lucide-react"

interface SidebarItem {
  title: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  description: string
  badge?: { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    description: "Overview & KPI metrics",
  },
  {
    title: "Checklist",
    href: "/checklist",
    icon: CheckCircle2,
    description: "Master SEO task list",
  },
  {
    title: "Kanban Board",
    href: "/kanban",
    icon: Clock,
    description: "Task workflow management",
  },
  {
    title: "90-Day Roadmap",
    href: "/roadmap",
    icon: Target,
    description: "Quarterly action plan",
  },
  {
    title: "Red Zone",
    href: "/red-zone",
    icon: ShieldAlert,
    description: "Black-hat avoidance tracker",
    badge: { label: "10 items", variant: "destructive" },
  },
]

export function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-72 border-r bg-sidebar">
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-seo-green flex items-center justify-center text-seo-green-foreground">
            <span className="text-xs font-bold">SEO</span>
          </div>
          <span className="text-sm font-bold tracking-tight">SEO Command Center</span>
        </div>

        <nav className="flex flex-col gap-1">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
                {item.badge && (
                  <Badge variant={item.badge.variant}>
                    {item.badge.label}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-6 border-t">
        <p className="text-xs text-muted-foreground">
          toolcraftr.com
        </p>
        <p className="text-xs text-muted-foreground">
          Ethical SEO tracking
        </p>
      </div>
    </aside>
  )
}