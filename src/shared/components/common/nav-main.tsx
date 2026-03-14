"use client"

import { type LucideIcon } from "lucide-react"
import { Collapsible } from "../ui/collapsible"
import { SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "../ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={item.title}
              >
                {/* <Link href={item.url} prefetch={false}> */}
                {item.icon && <item.icon />}
                <span>{item.title}</span>
                {/* </Link> */}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
