"use client"

import * as React from "react"
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Activity,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const KPI_CARDS = [
  {
    title: "Total Tasks",
    value: "65",
    subtitle: "across 16 categories",
    icon: Activity,
    iconColor: "text-seo-blue",
  },
  {
    title: "Completed",
    value: "0",
    subtitle: "0% completion rate",
    icon: CheckCircle2,
    iconColor: "text-seo-green",
  },
  {
    title: "In Progress",
    value: "0",
    subtitle: "active tasks",
    icon: Clock,
    iconColor: "text-seo-amber",
  },
  {
    title: "Red Zone",
    value: "10",
    subtitle: "black-hat items to avoid",
    icon: ShieldAlert,
    iconColor: "text-seo-red",
  },
] as const

export function KPIDashboardCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {KPI_CARDS.map((card) => {
        const Icon = card.icon
        return (
          <Card key={card.title} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <Icon className={cn("h-4 w-4", card.iconColor)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <CardDescription className="mt-1">{card.subtitle}</CardDescription>
            </CardContent>
            <CardFooter className="pt-2">
              <div className="text-xs text-muted-foreground">
                Track progress &rarr;
              </div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}