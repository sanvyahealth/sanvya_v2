"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StatsCard } from "@/components/stats-card"
import { Pill, AlertTriangle, Clock, CheckCircle2, ArrowRight, IndianRupee } from "lucide-react"

const pendingPrescriptions = [
  {
    id: "RX-001",
    patientName: "Rajesh Kumar Sharma",
    patientId: "SNV-2024-001",
    doctor: "Dr. Anil Kapoor",
    medicines: 4,
    priority: "urgent",
    time: "10 mins ago",
  },
  {
    id: "RX-002",
    patientName: "Priya Patel",
    patientId: "SNV-2024-002",
    doctor: "Dr. Meera Reddy",
    medicines: 2,
    priority: "normal",
    time: "25 mins ago",
  },
  {
    id: "RX-003",
    patientName: "Amit Singh",
    patientId: "SNV-2024-003",
    doctor: "Dr. Suresh Menon",
    medicines: 6,
    priority: "urgent",
    time: "35 mins ago",
  },
  {
    id: "RX-004",
    patientName: "Mohammed Farhan",
    patientId: "SNV-2024-005",
    doctor: "Dr. Kavita Nair",
    medicines: 3,
    priority: "normal",
    time: "1 hour ago",
  },
]

const lowStockItems = [
  { name: "Paracetamol 500mg", current: 120, minimum: 500, unit: "tablets" },
  { name: "Amoxicillin 250mg", current: 45, minimum: 200, unit: "capsules" },
  { name: "Insulin Glargine", current: 8, minimum: 30, unit: "vials" },
  { name: "Omeprazole 20mg", current: 85, minimum: 300, unit: "capsules" },
  { name: "Metformin 500mg", current: 150, minimum: 400, unit: "tablets" },
]

const expiringMedicines = [
  { name: "Azithromycin 500mg", batch: "AZ-2024-001", expiry: "Feb 2025", quantity: 150 },
  { name: "Cetirizine 10mg", batch: "CT-2023-089", expiry: "Mar 2025", quantity: 200 },
  { name: "Diclofenac Gel", batch: "DG-2024-015", expiry: "Apr 2025", quantity: 45 },
]

const recentDispensed = [
  { id: "DSP-001", patient: "Lakshmi Venkatesh", items: 3, amount: 1250, time: "5 mins ago", status: "completed" },
  { id: "DSP-002", patient: "Suresh Kumar", items: 5, amount: 2840, time: "15 mins ago", status: "completed" },
  { id: "DSP-003", patient: "Anita Sharma", items: 2, amount: 560, time: "30 mins ago", status: "completed" },
]

export default function PharmacyDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Pharmacy Dashboard</h1>
        <p className="text-muted-foreground">Manage inventory, prescriptions, and dispensing</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Pending Prescriptions"
          value="24"
          change="+8 from yesterday"
          trend="up"
          icon={<Clock className="h-5 w-5 text-primary" />}
        />
        <StatsCard
          title="Dispensed Today"
          value="156"
          change="+12% from avg"
          trend="up"
          icon={<CheckCircle2 className="h-5 w-5 text-green-600" />}
        />
        <StatsCard
          title="Low Stock Items"
          value="18"
          change="5 critical"
          trend="down"
          icon={<AlertTriangle className="h-5 w-5 text-amber-600" />}
        />
        <StatsCard
          title="Today's Revenue"
          value="₹1.24L"
          change="+8% from yesterday"
          trend="up"
          icon={<IndianRupee className="h-5 w-5 text-secondary" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Prescriptions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pending Prescriptions</CardTitle>
              <CardDescription>Prescriptions awaiting dispensing</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingPrescriptions.map((rx) => (
                <div key={rx.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Pill className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{rx.patientName}</p>
                        {rx.priority === "urgent" && (
                          <Badge variant="destructive" className="text-xs">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {rx.id} • {rx.medicines} medicines • {rx.doctor}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{rx.time}</span>
                    <Button size="sm">Dispense</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                Low Stock Alert
              </CardTitle>
              <CardDescription>Items below minimum stock level</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Create PO
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-foreground">{item.name}</p>
                    <Badge variant={item.current < item.minimum * 0.2 ? "destructive" : "secondary"}>
                      {item.current} {item.unit}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${
                          item.current < item.minimum * 0.2 ? "bg-red-500" : "bg-amber-500"
                        }`}
                        style={{ width: `${(item.current / item.minimum) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">Min: {item.minimum}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Expiring Soon */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-600" />
              Expiring Soon
            </CardTitle>
            <CardDescription>Medicines expiring in next 90 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expiringMedicines.map((med, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="font-medium text-foreground">{med.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Batch: {med.batch} • Qty: {med.quantity}
                    </p>
                  </div>
                  <Badge variant="outline" className="border-amber-500 text-amber-600">
                    Exp: {med.expiry}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Dispensed */}
        <Card>
          <CardHeader>
            <CardTitle>Recently Dispensed</CardTitle>
            <CardDescription>Latest prescription dispensing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDispensed.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.patient}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.id} • {item.items} items
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">₹{item.amount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
