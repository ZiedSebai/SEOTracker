"use client"

import * as React from "react"
import { Toaster as SonnerToast } from "sonner"

export function Toaster(props: React.ComponentPropsWithoutRef<typeof SonnerToast>) {
  return <SonnerToast {...props} />
}