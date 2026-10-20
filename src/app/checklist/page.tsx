"use client"

import { ChecklistTable } from "@/components/checklist/checklist-table"

export default function ChecklistPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Master Checklist</h1>
          <p className="text-muted-foreground">
            65 tasks across 16 categories with 10 Red Zone black-hat avoidance items
          </p>
        </div>
      </div>

      <ChecklistTable />
    </div>
  )
}