"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  BarChart3,
  Globe,
  CheckCircle2,
  Clock,
  Rocket,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface QuickAction {
  title: string
  description: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  external: boolean
  color: "seo-green" | "seo-blue" | "seo-amber" | "seo-red"
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    title: "Google Analytics",
    description: "Check traffic, sessions, and real-time users",
    href: "https://analytics.google.com/analytics/web/",
    icon: BarChart3,
    external: true,
    color: "seo-blue",
  },
  {
    title: "Visit Website",
    description: "Open toolcraftr.com in a new tab",
    href: "https://www.toolcraftr.com/",
    icon: Globe,
    external: true,
    color: "seo-green",
  },
  {
    title: "Daily SEO Tasks",
    description: "Recurring tasks to do every day",
    href: "/checklist",
    icon: CheckCircle2,
    external: false,
    color: "seo-amber",
  },
  {
    title: "One-Time Setup",
    description: "Tasks you only need to do once",
    href: "/checklist",
    icon: Rocket,
    external: false,
    color: "seo-red",
  },
]

const COLOR_CLASSES: Record<QuickAction["color"], string> = {
  "seo-green": "bg-seo-green/10 text-seo-green border-seo-green/20",
  "seo-blue": "bg-seo-blue/10 text-seo-blue border-seo-blue/20",
  "seo-amber": "bg-seo-amber/10 text-seo-amber border-seo-amber/20",
  "seo-red": "bg-seo-red/10 text-seo-red border-seo-red/20",
}

export function QuickActions() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Daily Shortcuts</h2>
          <p className="text-sm text-muted-foreground">
            Quick links for your daily SEO workflow
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {QUICK_ACTIONS.map((action) => {
          const colorClass = COLOR_CLASSES[action.color]
          return (
            <Card key={action.title} className="hover:border-accent transition-colors group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{action.title}</CardTitle>
                <div
                  className={`h-8 w-8 rounded-lg flex items-center justify-center ${colorClass}`}
                >
                  <action.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardDescription className="text-xs text-muted-foreground">
                {action.description}
              </CardDescription>
              <CardFooter>
                <Button
                  asChild
                  variant="outline"
                  className="w-full text-xs justify-between gap-2"
                >
                  <Link
                    href={action.href}
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noopener noreferrer" : undefined}
                    className="w-full flex items-center gap-2"
                  >
                    {action.external ? "Open externally" : "Go"}
                    <span className="ml-auto">
                      {action.external ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )}
                    </span>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
