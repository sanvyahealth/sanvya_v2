"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Eye, Printer } from "lucide-react"
import { demoPatients, demoDoctors } from "@/lib/demo-data"

export default function TestRequestsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false)

  const testRequests = [
    {
      id: "TR-2024-001",
      patient: "Rajesh Kumar",
      patientId: "PT001",
      doctor: "Dr. Sharma",
      tests: ["Complete Blood Count", "ESR"],
      priority: "Normal",
      status: "Pending",
      requestDate: "2024-01-15 09:30",
    },
    {
      id: "TR-2024-002",
      patient: "Priya Patel",
      patientId: "PT002",
      doctor: "Dr. Gupta",
      tests: ["Liver Function Test", "Kidney Function Test"],
      priority: "Urgent",
      status: "Sample Collected",
      requestDate: "2024-01-15 08:45",
    },
    {
      id: "TR-2024-003",
      patient: "Amit Singh",
      patientId: "PT003",
      doctor: "Dr. Reddy",
      tests: ["Blood Sugar (Fasting)", "HbA1c"],
      priority: "Normal",
      status: "In Processing",
      requestDate: "2024-01-15 07:30",
    },
    {
      id: "TR-2024-004",
      patient: "Meena Devi",
      patientId: "PT004",
      doctor: "Dr. Sharma",
      tests: ["Thyroid Profile", "Lipid Profile"],
      priority: "Urgent",
      status: "Completed",
      requestDate: "2024-01-14 16:00",
    },
    {
      id: "TR-2024-005",
      patient: "Suresh Reddy",
      patientId: "PT005",
      doctor: "Dr. Gupta",
      tests: ["Troponin I", "CK-MB", "D-Dimer"],
      priority: "Critical",
      status: "In Processing",
      requestDate: "2024-01-15 06:00",
    },
  ]

  const testCategories = {
    hematology: ["Complete Blood Count", "ESR", "Peripheral Smear", "Reticulocyte Count"],
    biochemistry: [
      "Blood Sugar (Fasting)",
      "Blood Sugar (PP)",
      "HbA1c",
      "Liver Function Test",
      "Kidney Function Test",
      "Lipid Profile",
      "Electrolytes",
    ],
    cardiac: ["Troponin I", "CK-MB", "D-Dimer", "BNP", "Procalcitonin"],
    thyroid: ["T3", "T4", "TSH", "Thyroid Profile"],
    serology: ["HIV", "HBsAg", "HCV", "VDRL", "Widal Test"],
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge className="bg-slate-100 text-slate-700">Pending</Badge>
      case "Sample Collected":
        return <Badge className="bg-amber-100 text-amber-700">Sample Collected</Badge>
      case "In Processing":
        return <Badge className="bg-indigo-100 text-indigo-700">In Processing</Badge>
      case "Completed":
        return <Badge className="bg-teal-100 text-teal-700">Completed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Critical":
        return <Badge className="bg-red-100 text-red-700">Critical</Badge>
      case "Urgent":
        return <Badge className="bg-amber-100 text-amber-700">Urgent</Badge>
      default:
        return <Badge className="bg-slate-100 text-slate-700">Normal</Badge>
    }
  }

  const filteredRequests = testRequests.filter((request) => {
    const matchesSearch =
      request.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status.toLowerCase().replace(" ", "-") === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Test Requests</h1>
          <p className="text-slate-600">Manage laboratory test requests</p>
        </div>
        <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="h-4 w-4 mr-2" />
              New Test Request
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>New Test Request</DialogTitle>
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
                  <Label>Requesting Doctor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {demoDoctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          {doctor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Priority</Label>
                <Select defaultValue="normal">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Select Tests</Label>
                {Object.entries(testCategories).map(([category, tests]) => (
                  <div key={category} className="space-y-2">
                    <p className="text-sm font-medium text-slate-700 capitalize">{category}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {tests.map((test) => (
                        <div key={test} className="flex items-center space-x-2">
                          <Checkbox id={test} />
                          <label htmlFor={test} className="text-sm">
                            {test}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label>Clinical Notes (optional)</Label>
                <Input placeholder="Any relevant clinical information..." />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsNewRequestOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700">Submit Request</Button>
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
                placeholder="Search by patient name or request ID..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sample-collected">Sample Collected</SelectItem>
                <SelectItem value="in-processing">In Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Tests</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{request.patient}</p>
                      <p className="text-xs text-slate-500">{request.patientId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {request.tests.slice(0, 2).map((test, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {test}
                        </Badge>
                      ))}
                      {request.tests.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{request.tests.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{request.doctor}</TableCell>
                  <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell className="text-sm">{request.requestDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Printer className="h-4 w-4" />
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
