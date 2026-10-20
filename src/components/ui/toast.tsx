"use client"

import * as React from "react"
import { toast as sonnerToast } from "sonner"

import { cn } from "@/lib/utils"

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const ToastViewport = ({ className }: { className?: string }) => {
  return null
}

const Toast = ({ className, ...props }: { className?: string; [key: string]: any }) => {
  return <div className={cn(className)} {...props} />
}

const ToastTitle = ({
  className,
  ...props
}: { className?: string; [key: string]: any }) => {
  return <div className={cn("text-sm font-semibold", className)} {...props} />
}

const ToastDescription = ({
  className,
  ...props
}: { className?: string; [key: string]: any }) => {
  return <div className={cn("text-sm text-muted-foreground", className)} {...props} />
}

const ToastAction = ({
  className,
  ...props
}: { className?: string; [key: string]: any }) => {
  return <button className={cn("text-sm bg-transparent", className)} {...props} />
}

const ToastClose = ({
  className,
  ...props
}: { className?: string; [key: string]: any }) => {
  return <button className={cn("text-sm", className)} {...props} />
}

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
}

export { sonnerToast as toast }