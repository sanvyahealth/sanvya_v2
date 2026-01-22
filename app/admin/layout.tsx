"use client"

import { useState } from "react"
import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { SidebarProvider, useSidebar } from "@/components/sidebar-provider"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SidebarProvider>
  )
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { open, setOpen } = useSidebar()

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        userType="admin"
        userName="Dr. Vikram Joshi"
        userRole="Hospital Admin"
        open={open}
        onOpenChange={setOpen}
      />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
