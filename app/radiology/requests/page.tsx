"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Eye, Calendar } from "lucide-react"
import { demoPatients, demoDoctors } from "@/lib/demo-data"

export default function ScanRequestsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false)

  const scanRequests = [
    {
      id: "SR-2024-001",
      patient: "Rajesh Kumar",
      patientId: "PT001",
      doctor: "Dr. Sharma",
      scan: "CT Chest with Contrast",
      priority: "Urgent",
      status: "Scheduled",
      scheduledTime: "10:30 AM",
      requestDate: "2024-01-15",
    },
    {
      id: "SR-2024-002",
      patient: "Priya Patel",
      patientId: "PT002",
      doctor: "Dr. Gupta",
      scan: "MRI Brain",
      priority: "Normal",
      status: "Pending",
      scheduledTime: "-",
      requestDate: "2024-01-15",
    },
    {
      id: "SR-2024-003",
      patient: "Amit Singh",
      patientId: "PT003",
      doctor: "Dr. Reddy",
      scan: "X-Ray Chest PA",
      priority: "Normal",
      status: "Completed",
      scheduledTime: "09:00 AM",
      requestDate: "2024-01-15",
    },
    {
      id: "SR-2024-004",
      patient: "Suresh Reddy",
      patientId: "PT005",
      doctor: "Dr. Gupta",
      scan: "Echo Cardiography",
      priority: "Urgent",
      status: "In Progress",
      scheduledTime: "10:00 AM",
      requestDate: "2024-01-15",
    },
  ]

  const scanTypes = {
    xray: ["X-Ray Chest PA", "X-Ray Chest AP", "X-Ray Abdomen", "X-Ray Spine", "X-Ray Extremities"],
    ct: ["CT Head Plain", "CT Head with Contrast", "CT Chest", "CT Abdomen", "CT Spine", "CT Angiography"],
    mri: ["MRI Brain", "MRI Spine", "MRI Abdomen", "MRI Knee", "MRI Shoulder"],
    ultrasound: ["USG Abdomen", "USG Pelvis", "USG KUB", "USG Thyroid", "Doppler Study"],
    others: ["Echo Cardiography", "Mammography", "Bone Density Scan"],
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge className="bg-slate-100 text-slate-700">Pending</Badge>
      case "Scheduled":
        return <Badge className="bg-indigo-100 text-indigo-700">Scheduled</Badge>
      case "In Progress":
        return <Badge className="bg-amber-100 text-amber-700">In Progress</Badge>
      case "Completed":
        return <Badge className="bg-teal-100 text-teal-700">Completed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredRequests = scanRequests.filter(
    (request) =>
      request.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Scan Requests</h1>
          <p className="text-slate-600">Manage radiology scan requests</p>
        </div>
        <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="h-4 w-4 mr-2" />
              New Scan Request
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>New Scan Request</DialogTitle>
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Scan Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xray">X-Ray</SelectItem>
                      <SelectItem value="ct">CT Scan</SelectItem>
                      <SelectItem value="mri">MRI</SelectItem>
                      <SelectItem value="ultrasound">Ultrasound</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Scan Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select scan" />
                    </SelectTrigger>
                    <SelectContent>
                      {scanTypes.ct.map((scan) => (
                        <SelectItem key={scan} value={scan}>
                          {scan}
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
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Clinical Indication</Label>
                <Textarea placeholder="Describe the clinical reason for this scan..." rows={3} />
              </div>

              <div className="space-y-2">
                <Label>Special Instructions (optional)</Label>
                <Input placeholder="Any special preparation or instructions..." />
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by patient name or request ID..."
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
                <TableHead>Request ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Scan</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Scheduled</TableHead>
                <TableHead>Status</TableHead>
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
                  <TableCell>{request.scan}</TableCell>
                  <TableCell>{request.doctor}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        request.priority === "Urgent" ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-700"
                      }
                    >
                      {request.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{request.scheduledTime}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {request.status === "Pending" && (
                        <Button variant="ghost" size="icon">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      )}
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
