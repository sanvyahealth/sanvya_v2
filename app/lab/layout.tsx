"use client"

import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import {
  FlaskConical,
  FileText,
  Microscope,
  ClipboardList,
  Users,
  BarChart3,
  Settings,
  LayoutDashboard,
} from "lucide-react"

const labNavItems = [
  { name: "Dashboard", href: "/lab", icon: LayoutDashboard },
  { name: "Test Requests", href: "/lab/requests", icon: ClipboardList },
  { name: "Sample Collection", href: "/lab/samples", icon: FlaskConical },
  { name: "Processing", href: "/lab/processing", icon: Microscope },
  { name: "Results Entry", href: "/lab/results", icon: FileText },
  { name: "Reports", href: "/lab/reports", icon: BarChart3 },
  { name: "Patients", href: "/lab/patients", icon: Users },
  { name: "Settings", href: "/lab/settings", icon: Settings },
]

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar title="Laboratory" navItems={labNavItems} role="lab" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Dr. Meera Joshi" userRole="Lab Director" />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
