import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date))
}

export function formatRelative(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(date))
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + "..."
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export const STORAGE_KEY = "seo-command-center-data"
export const DEFAULT_USER = {
  id: "user-1",
  name: "SEO Strategist",
  siteUrl: "https://www.toolcraftr.com/",
  niche: "Free online tools for developers",
  monetizationGoal: "Google AdSense",
  currentTraffic: "almost 0",
  region: "Worldwide",
  language: "en",
  createdAt: new Date().toISOString(),
}

export const CHECKLIST_CATEGORIES = [
  "Technical SEO",
  "On-Page SEO",
  "Content Strategy",
  "Keyword Research",
  "Internal Linking",
  "Off-Page SEO & Backlinks",
  "Digital PR",
  "Local SEO",
  "International SEO",
  "E-commerce SEO",
  "Programmatic SEO",
  "AI Search Optimization",
  "Analytics & Measurement",
  "CRO & Monetization",
  "Google AdSense/Google Ads Compliance",
  "Do Not Do / Black-Hat Avoidance",
] as const

export type ChecklistCategory = (typeof CHECKLIST_CATEGORIES)[number]

export const PRIORITY_LEVELS = ["Critical", "High", "Medium", "Low"] as const
export type Priority = (typeof PRIORITY_LEVELS)[number]

export const STATUS_LEVELS = ["Not Started", "In Progress", "Review", "Done", "Blocked"] as const
export type Status = (typeof STATUS_LEVELS)[number]

export const KANBAN_COLUMNS = [
  { id: "Not Started", title: "Not Started", color: "bg-muted" },
  { id: "In Progress", title: "In Progress", color: "bg-blue-50 dark:bg-blue-900/30" },
  { id: "Review", title: "Review", color: "bg-purple-50 dark:bg-purple-900/30" },
  { id: "Done", title: "Done", color: "bg-seo-green/10 dark:bg-seo-green/20" },
  { id: "Blocked", title: "Blocked", color: "bg-destructive/10 dark:bg-destructive/20" },
] as const