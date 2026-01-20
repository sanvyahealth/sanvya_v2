"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Eye, FileText } from "lucide-react"
import { patients } from "@/lib/demo-data"

const patientHistory = [
  { date: "2024-01-28", rxId: "RX-2024-015", items: 4, amount: 1250, doctor: "Dr. Anil Kapoor" },
  { date: "2024-01-15", rxId: "RX-2024-008", items: 3, amount: 850, doctor: "Dr. Anil Kapoor" },
  { date: "2024-01-02", rxId: "RX-2024-002", items: 5, amount: 1680, doctor: "Dr. Kavita Nair" },
]

export default function PatientsPage() {
  const [search, setSearch] = useState("")

  const filteredPatients = patients.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Patient Records</h1>
        <p className="text-muted-foreground">View patient prescription history</p>
      </div>

      <Card>
        <CardHeader>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Blood Group</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{patient.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {patient.age} yrs • {patient.gender}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{patient.phone}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{patient.bloodGroup}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={patient.status === "Admitted" ? "default" : "secondary"}>{patient.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Patient Prescription History</DialogTitle>
                          <DialogDescription>
                            {patient.name} • {patient.id}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4 rounded-lg bg-muted/50 p-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Age / Gender</p>
                              <p className="font-medium">
                                {patient.age} yrs / {patient.gender}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Blood Group</p>
                              <p className="font-medium">{patient.bloodGroup}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Phone</p>
                              <p className="font-medium">{patient.phone}</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="mb-3 font-medium">Recent Prescriptions</h4>
                            <div className="space-y-3">
                              {patientHistory.map((rx) => (
                                <div
                                  key={rx.rxId}
                                  className="flex items-center justify-between rounded-lg border border-border p-4"
                                >
                                  <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                      <FileText className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                      <p className="font-medium">{rx.rxId}</p>
                                      <p className="text-sm text-muted-foreground">
                                        {rx.date} • {rx.items} items • {rx.doctor}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-semibold">₹{rx.amount}</p>
                                    <Button variant="ghost" size="sm" className="text-xs">
                                      View Details
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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
