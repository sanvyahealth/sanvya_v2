"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Building2,
  BedDouble,
  DoorOpen,
  Calendar,
  FlaskConical,
  FileText,
  CreditCard,
  Settings,
  LogOut,
  Stethoscope,
  Activity,
  Scissors,
  Shield,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const adminNavItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Patients", href: "/admin/patients", icon: Users },
  { title: "Staffs", href: "#", icon: UserRound },
  { title: "Doctors", href: "/admin/doctors", icon: Stethoscope },
  { title: "Departments", href: "/admin/departments", icon: Building2 },
  { title: "Wards", href: "/admin/wards", icon: BedDouble },
  { title: "Rooms", href: "/admin/rooms", icon: DoorOpen },
  { title: "Appointments", href: "/admin/appointments", icon: Calendar },
  { title: "Surgeries", href: "/admin/surgeries", icon: Scissors },
  { title: "Lab & Radiology", href: "/admin/lab", icon: FlaskConical },
  { title: "Billing", href: "/admin/billing", icon: CreditCard },
  { title: "Reports", href: "/admin/reports", icon: FileText },
  { title: "Nurses", href: "#", icon: UserRound },
  { title: "Lab Technicians", href: "#", icon: FlaskConical },
  { title: "Pharmacists", href: "#", icon: Stethoscope },
  { title: "Prescriptions", href: "#", icon: FileText },
  { title: "Inventory", href: "#", icon: Building2 },
  { title: "OPD Revenue", href: "#", icon: DoorOpen },
  { title: "Analytics", href: "#", icon: Calendar },
  { title: "User Managements", href: "#", icon: UserRound },
  { title: "Lab Reports", href: "#", icon: FlaskConical },
  { title: "Notifications", href: "#", icon: FileText },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

const doctorNavItems = [
  { title: "Dashboard", href: "/doctor", icon: LayoutDashboard },
  { title: "My Appointments", href: "/doctor/appointments", icon: Calendar },
  { title: "My Patients", href: "/doctor/patients", icon: Users },
  { title: "Lab Reports", href: "/doctor/lab-reports", icon: FlaskConical },
  { title: "Surgeries", href: "/doctor/surgeries", icon: Scissors },
  { title: "Schedule", href: "/doctor/schedule", icon: Activity },
  { title: "Settings", href: "/doctor/settings", icon: Settings },
];

const patientNavItems = [
  { title: "Dashboard", href: "/patient", icon: LayoutDashboard },
  { title: "Appointments", href: "/patient/appointments", icon: Calendar },
  { title: "Health Records", href: "/patient/records", icon: FileText },
  { title: "Test Results", href: "/patient/tests", icon: FlaskConical },
  { title: "Billing", href: "/patient/billing", icon: CreditCard },
  { title: "Insurance", href: "/patient/insurance", icon: Shield },
  { title: "Settings", href: "/patient/settings", icon: Settings },
];

interface SidebarProps {
  userType: "admin" | "doctor" | "patient";
  userName?: string;
  userRole?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function SidebarContent({
  userType,
  userName = "User",
  userRole = "Staff",
  onLinkClick,
}: SidebarProps & { onLinkClick?: () => void }) {
  const pathname = usePathname();
  const navItems =
    userType === "admin"
      ? adminNavItems
      : userType === "doctor"
        ? doctorNavItems
        : patientNavItems;

  return (
    <>
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
          <Image
            src="/color.png"
            alt="Sanvya Logo"
            width={50}
            height={50}
            className="h-50 w-50 object-contain"
          />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">Sanvya</h1>
          <p className="text-xs text-muted-foreground">Healthcare v2</p>
        </div>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onLinkClick}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
            <UserCog className="h-5 w-5 text-accent-foreground" />
          </div>
          <div className="flex-1 truncate">
            <p className="text-sm font-medium text-foreground">{userName}</p>
            <p className="text-xs text-muted-foreground">{userRole}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
            <Link href="/login">
              <LogOut className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}

export function Sidebar({
  userType,
  userName,
  userRole,
  open,
  onOpenChange,
}: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex h-screen w-64 flex-col border-r border-border bg-card">
        <SidebarContent
          userType={userType}
          userName={userName}
          userRole={userRole}
        />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="p-0 w-64">
          <div className="flex h-full flex-col bg-card">
            <SidebarContent
              userType={userType}
              userName={userName}
              userRole={userRole}
              onLinkClick={() => onOpenChange?.(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
