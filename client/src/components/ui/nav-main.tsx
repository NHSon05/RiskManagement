"use client"

import { type Icon } from "@tabler/icons-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavLink, useNavigate } from "react-router-dom"
import Button from "./button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

export function NavMain({
  items,
}: {
  items: {
    title: string
    to: string
    icon?: Icon
  }[]
}) {
  const navigate = useNavigate()
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2 py-2">
              <Button
                variant="primary"
                onClick={() => navigate('projects/info')}
                icon={<FontAwesomeIcon icon={faPlus}/>}
              >
                Thêm dự án
              </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item, index) => (
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
                <SidebarMenuButton tooltip={item.title}>
                  <span>
                    {item.icon && <item.icon size={24} />}
                  </span>
                  <div className="text-[16px]">{item.title}</div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </NavLink>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
