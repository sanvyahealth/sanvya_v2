"use client"

import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import {
  Package,
  ShoppingCart,
  FileText,
  Users,
  TrendingUp,
  Settings,
  LayoutDashboard,
  AlertTriangle,
  Truck,
} from "lucide-react"

const pharmacyNavItems = [
  { name: "Dashboard", href: "/pharmacy", icon: LayoutDashboard },
  { name: "Inventory", href: "/pharmacy/inventory", icon: Package },
  { name: "Prescriptions", href: "/pharmacy/prescriptions", icon: FileText },
  { name: "Dispense", href: "/pharmacy/dispense", icon: ShoppingCart },
  { name: "Stock Alerts", href: "/pharmacy/alerts", icon: AlertTriangle },
  { name: "Purchase Orders", href: "/pharmacy/orders", icon: Truck },
  { name: "Reports", href: "/pharmacy/reports", icon: TrendingUp },
  { name: "Patients", href: "/pharmacy/patients", icon: Users },
  { name: "Settings", href: "/pharmacy/settings", icon: Settings },
]

export default function PharmacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar title="Pharmacy" navItems={pharmacyNavItems} role="pharmacy" />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header userName="Ravi Krishnan" userRole="Chief Pharmacist" />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
