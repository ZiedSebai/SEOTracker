"use client"

import * as React from "react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Button,
  buttonVariants,
} from "@/components/ui/button"
import {
  Input,
} from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  CheckCircle2,
  Clock,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  Target,
  User,
} from "lucide-react"

const NAV_ITEMS = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Checklist", href: "/checklist", icon: CheckCircle2 },
  { title: "Kanban", href: "/kanban", icon: Clock },
  { title: "Roadmap", href: "/roadmap", icon: Target },
] as const

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 px-md-6 shadow-sm">
      <Link
        href="/"
        className="flex items-center gap-2 text-xl font-bold tracking-tight"
      >
        <div className="h-8 w-8 rounded-md bg-seo-green flex items-center justify-center text-seo-green-foreground">
          <span className="text-xs font-bold">SEO</span>
        </div>
        <span className="font-semibold">SEO Command Center</span>
      </Link>

      <div className="flex-1 flex items-center justify-end gap-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            )
          })}
        </div>

        {/* Mobile Menu Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              aria-label="Open mobile menu"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0">
            <div className="flex flex-col gap-1 p-4">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                )
              })}
            </div>
          </SheetContent>
        </Sheet>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <div className="relative">
            <Input
              placeholder="Search tasks..."
              className="w-[220px] pr-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Sun className="h-4 w-4" />
            <Moon className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center gap-2">
                <Settings className="h-4 w-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive flex items-center gap-2">
                <LogOut className="h-4 w-4" /> Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

function Search({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}