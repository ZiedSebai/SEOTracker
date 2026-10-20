"use client"

import { RoadmapStats, RoadmapTimeline } from "@/components/roadmap/roadmap-timeline"

export default function RoadmapPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">90-Day Roadmap</h1>
          <p className="text-muted-foreground">
            Quarterly action plan for toolcraftr.com — ethical, white-hat SEO growth
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Plan Overview</h2>
        <RoadmapStats />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Timeline</h2>
        <RoadmapTimeline />
      </section>
    </div>
  )
}