import * as React from "react"

import { cn } from "@/lib/utils"

function HomeCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col py-2",
        className
      )}
      {...props}
    />
  )
}

function HomeCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
}

function HomeCardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-2xl font-semibold pt-2 pb-2 mb-3 border-b-2 border-[#494544]", className)}
      {...props}
    />
  )
}

function HomeCardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("p-2 mb-2", className)}
      {...props}
    />
  )
}

function HomeCardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-2 grid grid-cols-2 md:grid-cols-4 gap-2", className)}
      {...props}
    />
  )
}

function HomeCardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6", className)}
      {...props}
    />
  )
}

export { HomeCard, HomeCardHeader, HomeCardFooter, HomeCardTitle, HomeCardDescription, HomeCardContent }
