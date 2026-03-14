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
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <NavLink
                  to={item.to}
                  className={({ isActive }) => 
                            isActive ? "text-black font-semibold" : ""
                          }
                >
                  <span className="text-[16px]">{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
