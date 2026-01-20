"use client"

import { useState } from "react"
import type React from "react"

import { Sidebar } from "@/components/sidebar"

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        userType="doctor"
        userName="Dr. Anil Kapoor"
        userRole="Cardiologist"
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
      />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
