"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

import { cn } from "@/shared/lib/cn";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <div className="relative">
      <div className="absolute right-0 bottom-[.5px] left-0 h-0.5 bg-grey-50" />
      <TabsPrimitive.List
        data-slot="tabs-list"
        className={cn(
          "relative inline-flex h-9 w-full items-center",
          "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          className,
        )}
        {...props}
      >
        {children}
      </TabsPrimitive.List>
    </div>
  );
}

function TabsTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <>
      <TabsPrimitive.Trigger
        data-slot="tabs-trigger"
        className={cn(
          "dark:data-[state=active]:text-foreground",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input",
          "inline-flex h-[calc(100%-1px)] text-foreground dark:text-muted-foreground dark:data-[state=active]:bg-input/30",
          "items-center justify-center gap-1.5 px-2 py-1 text-base font-medium whitespace-nowrap",
          "transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50",
          "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          "text-base text-grey-80 data-[state=active]:text-primary",
          "cursor-pointer",
          "group relative",
          className,
        )}
        {...props}
      >
        {children}
        <div className="absolute bottom-0 left-0 h-0.5 w-full rounded-[2px] group-data-[state=active]:bg-primary"></div>
      </TabsPrimitive.Trigger>
    </>
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
