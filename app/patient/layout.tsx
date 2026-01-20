"use client"

import { useState } from "react"
import type React from "react"

import { Sidebar } from "@/components/sidebar"

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        userType="patient"
        userName="Rajesh Kumar Sharma"
        userRole="Patient"
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
      />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
