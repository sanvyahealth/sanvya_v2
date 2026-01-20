"use client"

import { useState } from "react"
import type React from "react"
import { Sidebar } from "@/components/sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        userType="admin"
        userName="Dr. Vikram Joshi"
        userRole="Hospital Admin"
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
      />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
