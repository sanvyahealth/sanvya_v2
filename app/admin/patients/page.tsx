"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Plus, Eye, Edit } from "lucide-react"
import { patients, departments } from "@/lib/demo-data"

const statusColors = {
  Admitted: "bg-blue-100 text-blue-700",
  Discharged: "bg-green-100 text-green-700",
}

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPatient, setSelectedPatient] = useState<(typeof patients)[0] | null>(null)

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || patient.department === departmentFilter
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter
    return matchesSearch && matchesDepartment && matchesStatus
  })

  return (
    <div className="flex flex-col">
      <Header title="Patients" />

      <div className="flex-1 space-y-6 p-6">
        <Card className="border-border">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>All Patients</CardTitle>
                <CardDescription>Manage patient records and admissions</CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Patient
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name or ID..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.name}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Admitted">Admitted</SelectItem>
                  <SelectItem value="Discharged">Discharged</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sanvya ID</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Age/Gender</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Ward/Room</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-mono text-xs">{patient.id}</TableCell>
                      <TableCell className="font-medium">{patient.name}</TableCell>
                      <TableCell>
                        {patient.age} / {patient.gender[0]}
                      </TableCell>
                      <TableCell className="text-xs">{patient.phone}</TableCell>
                      <TableCell>{patient.department}</TableCell>
                      <TableCell>
                        {patient.ward} / {patient.room}
                      </TableCell>
                      <TableCell>{patient.doctor}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={statusColors[patient.status as keyof typeof statusColors]}
                        >
                          {patient.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => setSelectedPatient(patient)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[95vw] sm:max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Patient Details - {patient.name}</DialogTitle>
                                <DialogDescription>Sanvya ID: {patient.id}</DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4 sm:grid-cols-2">
                                <div className="space-y-1">
                                  <Label className="text-muted-foreground">Blood Group</Label>
                                  <p className="font-medium">{patient.bloodGroup}</p>
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-muted-foreground">Admission Date</Label>
                                  <p className="font-medium">{patient.admissionDate}</p>
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-muted-foreground">Email</Label>
                                  <p className="font-medium">{patient.email}</p>
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-muted-foreground">Insurance</Label>
                                  <p className="font-medium">{patient.insurance}</p>
                                </div>
                                <div className="space-y-1 sm:col-span-2">
                                  <Label className="text-muted-foreground">Address</Label>
                                  <p className="font-medium">{patient.address}</p>
                                </div>
                                <div className="space-y-1 sm:col-span-2">
                                  <Label className="text-muted-foreground">Emergency Contact</Label>
                                  <p className="font-medium">{patient.emergencyContact}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
