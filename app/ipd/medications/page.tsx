"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pill, Search, Clock, CheckCircle2, AlertTriangle, User, Calendar } from "lucide-react"

export default function MedicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMedication, setSelectedMedication] = useState<any | null>(null)

  const medicationSchedule = [
    {
      id: "MED001",
      patient: "Rajesh Kumar",
      bed: "GW-A-101",
      medication: "Amoxicillin 500mg",
      route: "Oral",
      frequency: "TDS",
      nextDue: "10:00 AM",
      status: "Due",
      doctor: "Dr. Sharma",
    },
    {
      id: "MED002",
      patient: "Priya Patel",
      bed: "ICU-001",
      medication: "Pantoprazole 40mg IV",
      route: "IV",
      frequency: "BD",
      nextDue: "10:30 AM",
      status: "Due",
      doctor: "Dr. Gupta",
    },
    {
      id: "MED003",
      patient: "Amit Singh",
      bed: "PR-201",
      medication: "Paracetamol 650mg",
      route: "Oral",
      frequency: "SOS",
      nextDue: "As needed",
      status: "Given",
      doctor: "Dr. Reddy",
    },
    {
      id: "MED004",
      patient: "Meena Devi",
      bed: "GW-B-105",
      medication: "Insulin Regular",
      route: "SC",
      frequency: "Before meals",
      nextDue: "10:00 AM",
      status: "Overdue",
      doctor: "Dr. Sharma",
    },
    {
      id: "MED005",
      patient: "Suresh Reddy",
      bed: "ICU-003",
      medication: "Aspirin 75mg",
      route: "Oral",
      frequency: "OD",
      nextDue: "11:00 AM",
      status: "Due",
      doctor: "Dr. Gupta",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Overdue":
        return <Badge className="bg-red-100 text-red-700">Overdue</Badge>
      case "Due":
        return <Badge className="bg-amber-100 text-amber-700">Due</Badge>
      case "Given":
        return <Badge className="bg-teal-100 text-teal-700">Given</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredMedications = medicationSchedule.filter(
    (med) =>
      med.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.medication.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const dueCount = medicationSchedule.filter((m) => m.status === "Due").length
  const overdueCount = medicationSchedule.filter((m) => m.status === "Overdue").length
  const givenCount = medicationSchedule.filter((m) => m.status === "Given").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Medications</h1>
          <p className="text-slate-600">Medication administration and tracking</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Pill className="h-4 w-4 mr-2" />
          Add Medication Order
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-amber-50 border-amber-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">Due Now</p>
                <p className="text-2xl font-bold text-amber-700">{dueCount}</p>
              </div>
              <Clock className="h-8 w-8 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">Overdue</p>
                <p className="text-2xl font-bold text-red-700">{overdueCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-teal-50 border-teal-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-600">Administered</p>
                <p className="text-2xl font-bold text-teal-700">{givenCount}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-teal-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="schedule">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="schedule" className="data-[state=active]:bg-white">
            Schedule
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-white">
            Administration History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="mt-4">
          <Card>
            <CardHeader>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by patient or medication..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Patient / Bed</TableHead>
                    <TableHead>Medication</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Next Due</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMedications.map((med) => (
                    <TableRow key={med.id} className={med.status === "Overdue" ? "bg-red-50" : ""}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{med.patient}</p>
                          <p className="text-xs text-slate-500">{med.bed}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{med.medication}</TableCell>
                      <TableCell>{med.route}</TableCell>
                      <TableCell>{med.frequency}</TableCell>
                      <TableCell>{med.nextDue}</TableCell>
                      <TableCell>{getStatusBadge(med.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          className={
                            med.status === "Given" ? "bg-slate-100 text-slate-500" : "bg-teal-600 hover:bg-teal-700"
                          }
                          disabled={med.status === "Given"}
                          onClick={() => setSelectedMedication(med)}
                        >
                          {med.status === "Given" ? "Given" : "Administer"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="font-medium">Amoxicillin 500mg administered</p>
                        <p className="text-sm text-slate-500">Rajesh Kumar (GW-A-101) - Oral</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600">Nurse Priya Sharma</p>
                      <p className="text-xs text-slate-400">Today, 8:00 AM</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Administration Dialog */}
      <Dialog open={!!selectedMedication} onOpenChange={() => setSelectedMedication(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Administer Medication</DialogTitle>
          </DialogHeader>
          {selectedMedication && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-slate-50 rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-400" />
                  <span className="font-medium">{selectedMedication.patient}</span>
                  <Badge variant="outline">{selectedMedication.bed}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Pill className="h-4 w-4 text-slate-400" />
                  <span>{selectedMedication.medication}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-500">
                    {selectedMedication.route} - {selectedMedication.frequency}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Notes (optional)</label>
                <Input placeholder="Add any notes about administration..." />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="verify" />
                <label htmlFor="verify" className="text-sm">
                  I verify this is the correct medication, dose, and patient
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setSelectedMedication(null)}>
                  Cancel
                </Button>
                <Button className="bg-teal-600 hover:bg-teal-700">Confirm Administration</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
