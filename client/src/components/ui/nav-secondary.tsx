"use client"

import * as React from "react"
import { type Icon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavLink } from "react-router-dom"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    to: string
    icon: Icon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item,index) => (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) => 
                `flex items-center gap-2 px-2 py-2 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? "text-black font-semibold bg-(--blue-border) shadow-sm" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <div>
                    <span><item.icon size={24}/></span>
                    <span className="text-[16px]">{item.title}</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </NavLink>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
