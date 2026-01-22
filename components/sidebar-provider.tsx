"use client"

import React, { createContext, useContext, useState } from "react"

interface SidebarContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  
  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  // If used outside provider, return a dummy or undefined to avoid crash, 
  // but better to throw or handle gracefully. 
  // For this app, I'll return a safe fallback if possible, or just the context.
  if (!context) {
     // Return a dummy object so purely visual headers don't crash? 
     // Or just throw error to help debugging.
     // Let's assume it might be missing.
     return { open: false, setOpen: () => {} }
  }
  return context
}
