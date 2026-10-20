import type { ChecklistItem } from "@/data/checklist"

export const STORAGE_KEY = "seo-command-center-checklist"

/**
 * Load the persisted checklist from localStorage.
 * Falls back to MASTER_CHECKLIST if nothing is stored yet.
 */
export function loadChecklist(defaultItems: ChecklistItem[]): ChecklistItem[] {
  if (typeof window === "undefined") {
    return defaultItems
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return defaultItems
    }

    const parsed: ChecklistItem[] = JSON.parse(raw)

    // Validate that we got back an array of objects with ids
    if (!Array.isArray(parsed) || parsed.length === 0 || !parsed[0]?.id) {
      return defaultItems
    }

    return parsed
  } catch {
    return defaultItems
  }
}

/**
 * Persist the full checklist to localStorage.
 */
export function saveChecklist(items: ChecklistItem[]): void {
  if (typeof window === "undefined") {
    return
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // Silently ignore quota errors etc.
  }
}

/**
 * Clear the persisted checklist so the next load falls back to defaults.
 */
export function resetChecklist(): void {
  if (typeof window === "undefined") {
    return
  }

  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Silently ignore
  }
}