import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-sm border border-input bg-transparent text-checkbox-foreground shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-checkbox-foreground data-[state=checked]:text-checkbox-background",
      className
    )}
    {...props}
  />
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

const CheckboxIndicator = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Indicator
    ref={ref}
    className={cn(
      "flex items-center justify-center text-current",
      className
    )}
    {...props}
  />
))
CheckboxIndicator.displayName = CheckboxPrimitive.Indicator.displayName

export { Checkbox, CheckboxIndicator }