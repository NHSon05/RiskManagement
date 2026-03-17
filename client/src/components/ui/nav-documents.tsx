"use client"

import {
  IconDots,
  IconFolder,
  IconShare3,
  IconTrash,
  type Icon,
} from "@tabler/icons-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { NavLink } from "react-router-dom"

export function NavDocuments({
  items,
}: {
  items: {
    name: string
    to: string
    icon: Icon
  }[]
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Tài liệu</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) => 
              `flex items-center gap-2 px-2 py-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? "text-(--black) font-semibold bg-(--blue-border) shadow-sm" 
                  : "text-(--description) hover:(--secondary-btn-hover) hover:text-(--description)"
              }`
            }
          >
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <div>
                  <span><item.icon size={24}/></span>
                  <span className="text-[16px]">{item.name}</span>
                </div>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction
                    showOnHover
                    className="rounded-sm data-[state=open]:bg-accent"
                  >
                    <span>
                      <IconDots size={24}/>
                    </span>
                    <span className="sr-only text-[16px]">Xem thêm</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-24 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem>
                    <IconFolder />
                    <span className="text-[16px]">Mở</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconShare3 />
                    <span className="text-[16px]">Chia sẻ</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <IconTrash />
                    <span className="text-[16px]">Xoá</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </NavLink>
        ))}
        <SidebarMenuItem className="px-2">
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <IconDots className="text-sidebar-foreground/70" />
            <span className="text-[16px]">Xem thêm</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
