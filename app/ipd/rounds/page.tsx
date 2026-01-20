"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Stethoscope, User, Clock, CheckCircle2, AlertCircle, ChevronRight, Play, Pause } from "lucide-react"

export default function WardRoundsPage() {
  const [activeRound, setActiveRound] = useState<string | null>(null)
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null)

  const roundPatients = [
    {
      id: "PT001",
      name: "Rajesh Kumar",
      bed: "GW-A-101",
      ward: "General Ward A",
      diagnosis: "Pneumonia",
      status: "Pending",
      priority: "Normal",
      doctor: "Dr. Sharma",
      notes: "",
      vitals: { bp: "120/80", pulse: 78, temp: 98.6, spo2: 97 },
    },
    {
      id: "PT002",
      name: "Priya Patel",
      bed: "ICU-001",
      ward: "ICU",
      diagnosis: "Post-operative care",
      status: "Pending",
      priority: "High",
      doctor: "Dr. Gupta",
      notes: "",
      vitals: { bp: "110/70", pulse: 82, temp: 99.2, spo2: 95 },
    },
    {
      id: "PT003",
      name: "Amit Singh",
      bed: "PR-201",
      ward: "Private Room",
      diagnosis: "Appendectomy recovery",
      status: "Completed",
      priority: "Normal",
      doctor: "Dr. Reddy",
      notes: "Recovery progressing well. Continue current medications.",
      vitals: { bp: "118/76", pulse: 72, temp: 98.4, spo2: 99 },
    },
    {
      id: "PT004",
      name: "Meena Devi",
      bed: "GW-B-105",
      ward: "General Ward B",
      diagnosis: "Diabetic ketoacidosis",
      status: "Pending",
      priority: "High",
      doctor: "Dr. Sharma",
      notes: "",
      vitals: { bp: "130/85", pulse: 88, temp: 99.0, spo2: 96 },
    },
    {
      id: "PT005",
      name: "Suresh Reddy",
      bed: "ICU-003",
      ward: "ICU",
      diagnosis: "Acute MI",
      status: "Pending",
      priority: "Critical",
      doctor: "Dr. Gupta",
      notes: "",
      vitals: { bp: "140/90", pulse: 92, temp: 98.8, spo2: 88 },
    },
  ]

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Critical":
        return <Badge className="bg-red-100 text-red-700">Critical</Badge>
      case "High":
        return <Badge className="bg-amber-100 text-amber-700">High</Badge>
      default:
        return <Badge className="bg-slate-100 text-slate-700">Normal</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="h-5 w-5 text-teal-500" />
      case "In Progress":
        return <Clock className="h-5 w-5 text-amber-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-slate-400" />
    }
  }

  const pendingCount = roundPatients.filter((p) => p.status === "Pending").length
  const completedCount = roundPatients.filter((p) => p.status === "Completed").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ward Rounds</h1>
          <p className="text-slate-600">Daily patient rounds and assessments</p>
        </div>
        <div className="flex gap-3">
          {activeRound ? (
            <Button variant="outline" onClick={() => setActiveRound(null)}>
              <Pause className="h-4 w-4 mr-2" />
              Pause Round
            </Button>
          ) : (
            <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => setActiveRound("morning")}>
              <Play className="h-4 w-4 mr-2" />
              Start Round
            </Button>
          )}
        </div>
      </div>

      {/* Round Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Morning Round</h3>
                <p className="text-sm text-slate-500">
                  {completedCount} of {roundPatients.length} patients assessed
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900">{pendingCount}</p>
                <p className="text-xs text-slate-500">Pending</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-teal-600">{completedCount}</p>
                <p className="text-xs text-slate-500">Completed</p>
              </div>
              <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full"
                  style={{
                    width: `${(completedCount / roundPatients.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient List */}
      <div className="space-y-3">
        {roundPatients.map((patient) => (
          <Card
            key={patient.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              patient.status === "Completed" ? "bg-slate-50" : ""
            }`}
            onClick={() => setSelectedPatient(patient)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getStatusIcon(patient.status)}
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">{patient.name}</h3>
                      {getPriorityBadge(patient.priority)}
                    </div>
                    <p className="text-sm text-slate-500">
                      {patient.bed} - {patient.ward}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-700">{patient.diagnosis}</p>
                    <p className="text-xs text-slate-500">{patient.doctor}</p>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-xs text-slate-500">BP</p>
                      <p className="text-sm font-medium">{patient.vitals.bp}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Pulse</p>
                      <p className="text-sm font-medium">{patient.vitals.pulse}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Temp</p>
                      <p className="text-sm font-medium">{patient.vitals.temp}°F</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">SpO2</p>
                      <p className={`text-sm font-medium ${patient.vitals.spo2 < 92 ? "text-red-600" : ""}`}>
                        {patient.vitals.spo2}%
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Patient Assessment Dialog */}
      <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Patient Assessment - {selectedPatient?.name}</DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-500">Bed / Ward</p>
                  <p className="font-medium">
                    {selectedPatient.bed} - {selectedPatient.ward}
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-500">Diagnosis</p>
                  <p className="font-medium">{selectedPatient.diagnosis}</p>
                </div>
              </div>

              {/* Vitals Update */}
              <div className="space-y-2">
                <Label>Update Vitals</Label>
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <Label className="text-xs">BP (mmHg)</Label>
                    <Input defaultValue={selectedPatient.vitals.bp} />
                  </div>
                  <div>
                    <Label className="text-xs">Pulse (bpm)</Label>
                    <Input defaultValue={selectedPatient.vitals.pulse} />
                  </div>
                  <div>
                    <Label className="text-xs">Temp (°F)</Label>
                    <Input defaultValue={selectedPatient.vitals.temp} />
                  </div>
                  <div>
                    <Label className="text-xs">SpO2 (%)</Label>
                    <Input defaultValue={selectedPatient.vitals.spo2} />
                  </div>
                </div>
              </div>

              {/* Assessment Notes */}
              <div className="space-y-2">
                <Label>Assessment Notes</Label>
                <Textarea
                  placeholder="Enter clinical findings and observations..."
                  rows={4}
                  defaultValue={selectedPatient.notes}
                />
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <Label>Quick Actions</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="order-lab" />
                    <label htmlFor="order-lab" className="text-sm">
                      Order Lab Tests
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="update-meds" />
                    <label htmlFor="update-meds" className="text-sm">
                      Update Medications
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="order-imaging" />
                    <label htmlFor="order-imaging" className="text-sm">
                      Order Imaging
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="consult" />
                    <label htmlFor="consult" className="text-sm">
                      Request Consultation
                    </label>
                  </div>
                </div>
              </div>

              {/* Condition */}
              <div className="space-y-2">
                <Label>Patient Condition</Label>
                <Select defaultValue="stable">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="serious">Serious</SelectItem>
                    <SelectItem value="stable">Stable</SelectItem>
                    <SelectItem value="improving">Improving</SelectItem>
                    <SelectItem value="ready-discharge">Ready for Discharge</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setSelectedPatient(null)}>
                  Cancel
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700">Complete Assessment</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
