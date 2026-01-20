"use client"

import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import {
  BedDouble,
  Users,
  ClipboardList,
  Pill,
  Activity,
  FileText,
  Settings,
  LayoutDashboard,
  Stethoscope,
} from "lucide-react"

const ipdNavItems = [
  { name: "Dashboard", href: "/ipd", icon: LayoutDashboard },
  { name: "Admissions", href: "/ipd/admissions", icon: ClipboardList },
  { name: "Bed Management", href: "/ipd/beds", icon: BedDouble },
  { name: "Ward Rounds", href: "/ipd/rounds", icon: Stethoscope },
  { name: "Medications", href: "/ipd/medications", icon: Pill },
  { name: "Vitals Monitoring", href: "/ipd/vitals", icon: Activity },
  { name: "Discharge", href: "/ipd/discharge", icon: FileText },
  { name: "Nursing Station", href: "/ipd/nursing", icon: Users },
  { name: "Settings", href: "/ipd/settings", icon: Settings },
]

export default function IPDLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar title="IPD Module" navItems={ipdNavItems} role="ipd" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Nurse Priya Sharma" userRole="Head Nurse - IPD" />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
