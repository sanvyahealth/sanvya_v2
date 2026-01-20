"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, Edit, UserPlus } from "lucide-react"
import { demoPatients, demoDoctors, demoWards, demoBeds } from "@/lib/demo-data"

export default function AdmissionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isNewAdmissionOpen, setIsNewAdmissionOpen] = useState(false)

  const admissions = [
    {
      id: "ADM-2024-001",
      patientId: "PT001",
      patientName: "Rajesh Kumar",
      age: 45,
      gender: "Male",
      ward: "General Ward A",
      bed: "GW-A-101",
      admissionDate: "2024-01-15",
      doctor: "Dr. Sharma",
      diagnosis: "Pneumonia",
      status: "Active",
    },
    {
      id: "ADM-2024-002",
      patientId: "PT002",
      patientName: "Priya Patel",
      age: 32,
      gender: "Female",
      ward: "ICU",
      bed: "ICU-001",
      admissionDate: "2024-01-14",
      doctor: "Dr. Gupta",
      diagnosis: "Post-operative care",
      status: "Critical",
    },
    {
      id: "ADM-2024-003",
      patientId: "PT003",
      patientName: "Amit Singh",
      age: 28,
      gender: "Male",
      ward: "Private Room",
      bed: "PR-201",
      admissionDate: "2024-01-13",
      doctor: "Dr. Reddy",
      diagnosis: "Appendectomy recovery",
      status: "Stable",
    },
    {
      id: "ADM-2024-004",
      patientId: "PT004",
      patientName: "Meena Devi",
      age: 55,
      gender: "Female",
      ward: "General Ward B",
      bed: "GW-B-105",
      admissionDate: "2024-01-12",
      doctor: "Dr. Sharma",
      diagnosis: "Diabetic ketoacidosis",
      status: "Active",
    },
    {
      id: "ADM-2024-005",
      patientId: "PT005",
      patientName: "Suresh Reddy",
      age: 62,
      gender: "Male",
      ward: "ICU",
      bed: "ICU-003",
      admissionDate: "2024-01-11",
      doctor: "Dr. Gupta",
      diagnosis: "Acute MI",
      status: "Critical",
    },
  ]

  const filteredAdmissions = admissions.filter((admission) => {
    const matchesSearch =
      admission.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admission.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || admission.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Critical":
        return <Badge className="bg-red-100 text-red-700">Critical</Badge>
      case "Active":
        return <Badge className="bg-indigo-100 text-indigo-700">Active</Badge>
      case "Stable":
        return <Badge className="bg-teal-100 text-teal-700">Stable</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admissions</h1>
          <p className="text-slate-600">Manage patient admissions and records</p>
        </div>
        <Dialog open={isNewAdmissionOpen} onOpenChange={setIsNewAdmissionOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <UserPlus className="h-4 w-4 mr-2" />
              New Admission
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>New Patient Admission</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Patient</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {demoPatients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.name} ({patient.id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Attending Doctor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {demoDoctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          {doctor.name} - {doctor.department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ward</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ward" />
                    </SelectTrigger>
                    <SelectContent>
                      {demoWards.map((ward) => (
                        <SelectItem key={ward.id} value={ward.id}>
                          {ward.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Bed</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bed" />
                    </SelectTrigger>
                    <SelectContent>
                      {demoBeds
                        .filter((bed) => bed.status === "Available")
                        .map((bed) => (
                          <SelectItem key={bed.id} value={bed.id}>
                            {bed.number} - {bed.wardId}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Admission Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="elective">Elective</SelectItem>
                    <SelectItem value="transfer">Transfer</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Primary Diagnosis</Label>
                <Input placeholder="Enter primary diagnosis" />
              </div>
              <div className="space-y-2">
                <Label>Chief Complaints</Label>
                <Textarea placeholder="Enter chief complaints and symptoms" rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Medical History</Label>
                <Textarea placeholder="Enter relevant medical history" rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Insurance Provider</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select insurance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="star">Star Health Insurance</SelectItem>
                      <SelectItem value="hdfc">HDFC Ergo</SelectItem>
                      <SelectItem value="icici">ICICI Lombard</SelectItem>
                      <SelectItem value="self">Self Pay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Policy Number</Label>
                  <Input placeholder="Enter policy number" />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsNewAdmissionOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700">Admit Patient</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by patient name or admission ID..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="stable">Stable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Admission ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Ward / Bed</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAdmissions.map((admission) => (
                <TableRow key={admission.id}>
                  <TableCell className="font-medium">{admission.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{admission.patientName}</p>
                      <p className="text-xs text-slate-500">
                        {admission.age}Y / {admission.gender}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{admission.ward}</p>
                      <p className="text-xs text-slate-500">{admission.bed}</p>
                    </div>
                  </TableCell>
                  <TableCell>{admission.doctor}</TableCell>
                  <TableCell className="max-w-[150px] truncate">{admission.diagnosis}</TableCell>
                  <TableCell>{admission.admissionDate}</TableCell>
                  <TableCell>{getStatusBadge(admission.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
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
