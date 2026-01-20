"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Eye, CheckCircle2, Clock, XCircle } from "lucide-react"

const prescriptions = [
  {
    id: "RX-2024-001",
    patientName: "Rajesh Kumar Sharma",
    patientId: "SNV-2024-001",
    doctor: "Dr. Anil Kapoor",
    department: "Cardiology",
    date: "2024-01-28",
    medicines: [
      { name: "Atorvastatin 10mg", qty: 30, dosage: "1 tablet at night" },
      { name: "Aspirin 75mg", qty: 30, dosage: "1 tablet after breakfast" },
      { name: "Metoprolol 25mg", qty: 60, dosage: "1 tablet twice daily" },
      { name: "Clopidogrel 75mg", qty: 30, dosage: "1 tablet at night" },
    ],
    status: "pending",
    priority: "urgent",
  },
  {
    id: "RX-2024-002",
    patientName: "Priya Patel",
    patientId: "SNV-2024-002",
    doctor: "Dr. Meera Reddy",
    department: "Gynecology",
    date: "2024-01-28",
    medicines: [
      { name: "Folic Acid 5mg", qty: 30, dosage: "1 tablet daily" },
      { name: "Iron + Folic Acid", qty: 30, dosage: "1 tablet daily after lunch" },
    ],
    status: "pending",
    priority: "normal",
  },
  {
    id: "RX-2024-003",
    patientName: "Amit Singh",
    patientId: "SNV-2024-003",
    doctor: "Dr. Suresh Menon",
    department: "Orthopedics",
    date: "2024-01-27",
    medicines: [
      { name: "Diclofenac 50mg", qty: 20, dosage: "1 tablet twice daily after food" },
      { name: "Pantoprazole 40mg", qty: 20, dosage: "1 tablet before breakfast" },
      { name: "Calcium + Vitamin D3", qty: 30, dosage: "1 tablet daily" },
    ],
    status: "dispensed",
    priority: "normal",
  },
  {
    id: "RX-2024-004",
    patientName: "Mohammed Farhan",
    patientId: "SNV-2024-005",
    doctor: "Dr. Kavita Nair",
    department: "General Medicine",
    date: "2024-01-28",
    medicines: [
      { name: "Azithromycin 500mg", qty: 3, dosage: "1 tablet daily for 3 days" },
      { name: "Paracetamol 650mg", qty: 10, dosage: "1 tablet if fever" },
      { name: "Cetirizine 10mg", qty: 5, dosage: "1 tablet at night" },
    ],
    status: "pending",
    priority: "normal",
  },
  {
    id: "RX-2024-005",
    patientName: "Lakshmi Venkatesh",
    patientId: "SNV-2024-004",
    doctor: "Dr. Ramesh Iyer",
    department: "Neurology",
    date: "2024-01-26",
    medicines: [
      { name: "Levetiracetam 500mg", qty: 60, dosage: "1 tablet twice daily" },
      { name: "Vitamin B12", qty: 30, dosage: "1 tablet daily" },
    ],
    status: "dispensed",
    priority: "urgent",
  },
]

export default function PrescriptionsPage() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [selectedRx, setSelectedRx] = useState<(typeof prescriptions)[0] | null>(null)

  const filteredPrescriptions = prescriptions.filter((rx) => {
    const matchesSearch =
      rx.patientName.toLowerCase().includes(search.toLowerCase()) || rx.id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = status === "all" || rx.status === status
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-amber-600" />
      case "dispensed":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Prescriptions</h1>
        <p className="text-muted-foreground">View and manage patient prescriptions</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search prescriptions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Tabs value={status} onValueChange={setStatus}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="dispensed">Dispensed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rx ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrescriptions.map((rx) => (
                <TableRow key={rx.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{rx.id}</span>
                      {rx.priority === "urgent" && (
                        <Badge variant="destructive" className="text-xs">
                          Urgent
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{rx.patientName}</p>
                      <p className="text-xs text-muted-foreground">{rx.patientId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-foreground">{rx.doctor}</p>
                      <p className="text-xs text-muted-foreground">{rx.department}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{rx.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{rx.medicines.length} medicines</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(rx.status)}
                      <span className="capitalize">{rx.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setSelectedRx(rx)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Prescription Details - {rx.id}</DialogTitle>
                            <DialogDescription>
                              {rx.patientName} • {rx.patientId}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted/50 p-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Doctor</p>
                                <p className="font-medium">{rx.doctor}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Department</p>
                                <p className="font-medium">{rx.department}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Date</p>
                                <p className="font-medium">{rx.date}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Status</p>
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(rx.status)}
                                  <span className="font-medium capitalize">{rx.status}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="mb-3 font-medium">Prescribed Medicines</h4>
                              <div className="space-y-3">
                                {rx.medicines.map((med, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between rounded-lg border border-border p-3"
                                  >
                                    <div>
                                      <p className="font-medium">{med.name}</p>
                                      <p className="text-sm text-muted-foreground">{med.dosage}</p>
                                    </div>
                                    <Badge variant="outline">Qty: {med.qty}</Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          {rx.status === "pending" && (
                            <div className="flex justify-end gap-3">
                              <Button variant="outline">Print</Button>
                              <Button>Dispense Now</Button>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      {rx.status === "pending" && <Button size="sm">Dispense</Button>}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
