"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavMain } from "../ui/nav-main"
import { NavSecondary } from "../ui/nav-secondary"
import { NavUser } from "../ui/nav-user"
import { NavDocuments } from "../ui/nav-documents"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Trang chủ",
      to: "/home",
      icon: IconDashboard,
    },
    {
      title: "Phân tích",
      to: "/analys",
      icon: IconChartBar,
    },
    {
      title: "Dự án",
      to: "/projects",
      icon: IconFolder,
    },
    {
      title: "Nhóm",
      to: "/group",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      to: "#",
      items: [
        {
          title: "Active Proposals",
          to: "#",
        },
        {
          title: "Archived",
          to: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      to: "#",
      items: [
        {
          title: "Active Proposals",
          to: "#",
        },
        {
          title: "Archived",
          to: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      to: "#",
      items: [
        {
          title: "Active Proposals",
          to: "#",
        },
        {
          title: "Archived",
          to: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Cài đặt",
      to: "/setting",
      icon: IconSettings,
    },
    {
      title: "Hỗ trợ",
      to: "/support",
      icon: IconHelp,
    },
    {
      title: "Tìm kiếm",
      to: "/search",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Báo cáo",
      to: "/reports",
      icon: IconReport,
    },
    {
      name: "Công cụ hỗ trợ",
      to: "/support-ai",
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="bg-(--white)">
        <SidebarMenu>
        <NavUser/>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  )
}
