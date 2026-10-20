"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MASTER_CHECKLIST } from "@/data/checklist"
import { ShieldAlert } from "lucide-react"

export default function RedZonePage() {
  const redZoneItems = MASTER_CHECKLIST.filter((item) => item.redZone)

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-destructive flex items-center justify-center text-destructive-foreground">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Red Zone</h1>
            <p className="text-muted-foreground">
              Black-hat avoidance tracker — {redZoneItems.length} items you must never do
            </p>
          </div>
        </div>
        <Badge variant="destructive">{redZoneItems.length} items</Badge>
      </div>

      <div className="bg-card border rounded-lg p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Task</TableHeaderCell>
              <TableHeaderCell>Priority</TableHeaderCell>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Risk</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {redZoneItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium text-foreground">{item.task}</TableCell>
                <TableCell>
                  <Badge variant="destructive" className="text-xs">
                    {item.priority}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{item.category}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {item.riskOrCaveats}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="border bg-amber-50/50 rounded-lg p-6">
        <h3 className="text-sm font-semibold text-amber-900 uppercase tracking-wider mb-2">
          Why this matters
        </h3>
        <p className="text-sm text-amber-800">
          Red Zone items are black-hat SEO tactics that violate Google&apos;s spam policies.
          Engaging in any of these can result in manual actions, ranking suppression, or
          complete deindexation of your site. Treat these as hard prohibitions.
        </p>
      </div>
    </div>
  )
}

function TableHeaderCell({ children }: { children: React.ReactNode }) {
  return (
    <th
      scope="col"
      className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
    >
      <div className="flex items-center">{children}</div>
    </th>
  )
}