"use client"

import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import {
  ScanLine,
  FileText,
  ClipboardList,
  Calendar,
  BarChart3,
  Settings,
  LayoutDashboard,
  ImageIcon,
} from "lucide-react"

const radiologyNavItems = [
  { name: "Dashboard", href: "/radiology", icon: LayoutDashboard },
  { name: "Scan Requests", href: "/radiology/requests", icon: ClipboardList },
  { name: "Scheduling", href: "/radiology/scheduling", icon: Calendar },
  { name: "Imaging", href: "/radiology/imaging", icon: ScanLine },
  { name: "Reports", href: "/radiology/reports", icon: FileText },
  { name: "PACS Viewer", href: "/radiology/pacs", icon: ImageIcon },
  { name: "Analytics", href: "/radiology/analytics", icon: BarChart3 },
  { name: "Settings", href: "/radiology/settings", icon: Settings },
]

export default function RadiologyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar title="Radiology" navItems={radiologyNavItems} role="radiology" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Dr. Anil Verma" userRole="Radiologist" />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
