"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, CheckCircle2, Clock, AlertCircle, Download, Printer, Eye } from "lucide-react"

export default function DischargePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDischarge, setSelectedDischarge] = useState<any | null>(null)

  const dischargeList = [
    {
      id: "DIS-2024-001",
      patientId: "PT003",
      patientName: "Amit Singh",
      bed: "PR-201",
      ward: "Private Room",
      admissionDate: "2024-01-13",
      diagnosis: "Appendectomy recovery",
      doctor: "Dr. Reddy",
      status: "Ready",
      billingStatus: "Cleared",
      checklistComplete: true,
    },
    {
      id: "DIS-2024-002",
      patientId: "PT001",
      patientName: "Rajesh Kumar",
      bed: "GW-A-101",
      ward: "General Ward A",
      admissionDate: "2024-01-15",
      diagnosis: "Pneumonia",
      doctor: "Dr. Sharma",
      status: "Pending",
      billingStatus: "Pending",
      checklistComplete: false,
    },
    {
      id: "DIS-2024-003",
      patientId: "PT004",
      patientName: "Meena Devi",
      bed: "GW-B-105",
      ward: "General Ward B",
      admissionDate: "2024-01-12",
      diagnosis: "Diabetic ketoacidosis",
      doctor: "Dr. Sharma",
      status: "In Progress",
      billingStatus: "In Review",
      checklistComplete: false,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ready":
        return <Badge className="bg-teal-100 text-teal-700">Ready</Badge>
      case "In Progress":
        return <Badge className="bg-amber-100 text-amber-700">In Progress</Badge>
      case "Pending":
        return <Badge className="bg-slate-100 text-slate-700">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getBillingBadge = (status: string) => {
    switch (status) {
      case "Cleared":
        return <Badge className="bg-teal-100 text-teal-700">Cleared</Badge>
      case "In Review":
        return <Badge className="bg-amber-100 text-amber-700">In Review</Badge>
      case "Pending":
        return <Badge className="bg-red-100 text-red-700">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredDischarges = dischargeList.filter((d) => d.patientName.toLowerCase().includes(searchTerm.toLowerCase()))

  const readyCount = dischargeList.filter((d) => d.status === "Ready").length
  const inProgressCount = dischargeList.filter((d) => d.status === "In Progress").length
  const pendingCount = dischargeList.filter((d) => d.status === "Pending").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Discharge Management</h1>
          <p className="text-slate-600">Process patient discharges and summaries</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-teal-50 border-teal-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-600">Ready for Discharge</p>
                <p className="text-2xl font-bold text-teal-700">{readyCount}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-teal-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-amber-50 border-amber-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">In Progress</p>
                <p className="text-2xl font-bold text-amber-700">{inProgressCount}</p>
              </div>
              <Clock className="h-8 w-8 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-50 border-slate-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Pending Review</p>
                <p className="text-2xl font-bold text-slate-700">{pendingCount}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-slate-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Discharge List */}
      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by patient name..."
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
                <TableHead>Patient</TableHead>
                <TableHead>Ward / Bed</TableHead>
                <TableHead>Admission Date</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Billing</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDischarges.map((discharge) => (
                <TableRow key={discharge.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{discharge.patientName}</p>
                      <p className="text-xs text-slate-500">{discharge.diagnosis}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{discharge.ward}</p>
                      <p className="text-xs text-slate-500">{discharge.bed}</p>
                    </div>
                  </TableCell>
                  <TableCell>{discharge.admissionDate}</TableCell>
                  <TableCell>{discharge.doctor}</TableCell>
                  <TableCell>{getBillingBadge(discharge.billingStatus)}</TableCell>
                  <TableCell>{getStatusBadge(discharge.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => setSelectedDischarge(discharge)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      {discharge.status === "Ready" && (
                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                          Process
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

      {/* Discharge Detail Dialog */}
      <Dialog open={!!selectedDischarge} onOpenChange={() => setSelectedDischarge(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Discharge Process - {selectedDischarge?.patientName}</DialogTitle>
          </DialogHeader>
          {selectedDischarge && (
            <div className="space-y-6 py-4">
              {/* Patient Info */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-500">Patient ID</p>
                  <p className="font-medium">{selectedDischarge.patientId}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-500">Ward / Bed</p>
                  <p className="font-medium">
                    {selectedDischarge.ward} - {selectedDischarge.bed}
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-500">Attending Doctor</p>
                  <p className="font-medium">{selectedDischarge.doctor}</p>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-900">Discharge Checklist</h3>
                <div className="space-y-2">
                  {[
                    { label: "Final vitals recorded", checked: true },
                    { label: "Discharge summary prepared", checked: selectedDischarge.status !== "Pending" },
                    { label: "Medications dispensed", checked: selectedDischarge.status === "Ready" },
                    { label: "Follow-up appointments scheduled", checked: selectedDischarge.status === "Ready" },
                    { label: "Patient education completed", checked: selectedDischarge.status === "Ready" },
                    { label: "Billing cleared", checked: selectedDischarge.billingStatus === "Cleared" },
                    { label: "Insurance documentation", checked: selectedDischarge.billingStatus === "Cleared" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox checked={item.checked} />
                      <label className="text-sm">{item.label}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Discharge Summary */}
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-900">Discharge Summary</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Diagnosis at Discharge</Label>
                    <Input defaultValue={selectedDischarge.diagnosis} />
                  </div>
                  <div className="space-y-2">
                    <Label>Treatment Summary</Label>
                    <Textarea placeholder="Summary of treatment provided during admission..." rows={3} />
                  </div>
                  <div className="space-y-2">
                    <Label>Discharge Instructions</Label>
                    <Textarea placeholder="Instructions for patient care at home..." rows={3} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Follow-up Date</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Follow-up Doctor</Label>
                      <Input defaultValue={selectedDischarge.doctor} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between pt-4 border-t">
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Printer className="h-4 w-4 mr-2" />
                    Print Summary
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setSelectedDischarge(null)}>
                    Cancel
                  </Button>
                  {selectedDischarge.status === "Ready" ? (
                    <Button className="bg-teal-600 hover:bg-teal-700">Complete Discharge</Button>
                  ) : (
                    <Button className="bg-indigo-600 hover:bg-indigo-700">Save Progress</Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
