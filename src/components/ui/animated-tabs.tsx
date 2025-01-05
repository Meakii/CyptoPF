"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

const AnimatedTabs = TabsPrimitive.Root

const AnimatedTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    variant?: "underlined" | "contained"
    value?: string
  }
>(({ className, variant = "underlined", value, ...props }, ref) => {
  const [underlineStyle, setUnderlineStyle] = React.useState({})
  const tabsListRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const updateUnderline = () => {
      const activeTab = tabsListRef.current?.querySelector('[data-state="active"]') as HTMLElement
      if (activeTab) {
        setUnderlineStyle({
          width: `${activeTab.offsetWidth}px`,
          transform: `translateX(${activeTab.offsetLeft}px)`,
        })
      }
    }

    updateUnderline()
    window.addEventListener('resize', updateUnderline)
    return () => window.removeEventListener('resize', updateUnderline)
  }, [value])

  return (
    <div className={cn("relative", variant === "underlined" && "pb-0.5")} ref={tabsListRef}>
      <TabsPrimitive.List
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center",
          variant === "contained" && "rounded-md bg-muted p-1",
          className
        )}
        {...props}
      />
      {variant === "underlined" &&  (
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-(--primary-border) transition-all duration-300 ease-in-out"
          style={underlineStyle}
        />
      )}
    </div>
  )
})
AnimatedTabsList.displayName = TabsPrimitive.List.displayName

const AnimatedTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    variant?: "underlined" | "contained"
  }
>(({ className, variant = "underlined", ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 h-11 btcm-label-sm text-(--tab-foreground) ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-(--ring) focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ",
      variant === "contained" && "rounded-sm",
      variant === "contained"
        ? "data-[state=active]:bg-background data-[state=active]:text-foreground"
        : "data-[state=active]:text-(--tab-foreground-active)",
      className
    )}
    {...props}
  />
))
AnimatedTabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const AnimatedTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
AnimatedTabsContent.displayName = TabsPrimitive.Content.displayName

export { AnimatedTabs, AnimatedTabsList, AnimatedTabsTrigger, AnimatedTabsContent }



// "use client"

// import * as React from "react"
// import * as TabsPrimitive from "@radix-ui/react-tabs"
// import { cn } from "@/lib/utils"

// const AnimatedTabs = TabsPrimitive.Root

// const AnimatedTabsList = React.forwardRef<
//   React.ElementRef<typeof TabsPrimitive.List>,
//   React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
//     variant?: "underlined" | "contained"
//   }
// >(({ className, variant = "underlined", ...props }, ref) => (
//   <TabsPrimitive.List
//     ref={ref}
//     className={cn(
//       "inline-flex items-center justify-center",
//       variant === "contained" && "rounded-md bg-muted p-1",
//       variant === "underlined" && "relative",
//       className
//     )}
//     {...props}
//   />
// ))
// AnimatedTabsList.displayName = TabsPrimitive.List.displayName

// const AnimatedTabsTrigger = React.forwardRef<
//   React.ElementRef<typeof TabsPrimitive.Trigger>,
//   React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
//     variant?: "underlined" | "contained"
//   }
// >(({ className, variant = "underlined", ...props }, ref) => (
//   <TabsPrimitive.Trigger
//     ref={ref}
//     className={cn(
//       "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
//       variant === "underlined" && "relative",
//       variant === "contained" && "rounded-sm",
//       variant === "contained"
//         ? "data-[state=active]:bg-background data-[state=active]:text-foreground"
//         : "data-[state=active]:text-foreground",
//       className
//     )}
//     {...props}
//   />
// ))
// AnimatedTabsTrigger.displayName = TabsPrimitive.Trigger.displayName

// const AnimatedTabsContent = React.forwardRef<
//   React.ElementRef<typeof TabsPrimitive.Content>,
//   React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
// >(({ className, ...props }, ref) => (
//   <TabsPrimitive.Content
//     ref={ref}
//     className={cn(
//       "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
//       className
//     )}
//     {...props}
//   />
// ))
// AnimatedTabsContent.displayName = TabsPrimitive.Content.displayName

// export { AnimatedTabs, AnimatedTabsList, AnimatedTabsTrigger, AnimatedTabsContent }

