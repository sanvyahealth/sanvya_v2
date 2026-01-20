"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle2, Clock, Droplets, User, Barcode } from "lucide-react"

export default function SampleCollectionPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSample, setSelectedSample] = useState<any | null>(null)

  const pendingSamples = [
    {
      id: "SMP-001",
      requestId: "TR-2024-001",
      patient: "Rajesh Kumar",
      patientId: "PT001",
      bed: "GW-A-101",
      tests: ["Complete Blood Count", "ESR"],
      sampleType: "Blood",
      tubeType: "EDTA (Purple)",
      priority: "Normal",
      status: "Pending",
      collectionTime: null,
    },
    {
      id: "SMP-002",
      requestId: "TR-2024-002",
      patient: "Priya Patel",
      patientId: "PT002",
      bed: "ICU-001",
      tests: ["Liver Function Test", "Kidney Function Test"],
      sampleType: "Blood",
      tubeType: "Plain (Red)",
      priority: "Urgent",
      status: "Pending",
      collectionTime: null,
    },
    {
      id: "SMP-003",
      requestId: "TR-2024-005",
      patient: "Suresh Reddy",
      patientId: "PT005",
      bed: "ICU-003",
      tests: ["Troponin I", "CK-MB"],
      sampleType: "Blood",
      tubeType: "Plain (Red)",
      priority: "Critical",
      status: "Pending",
      collectionTime: null,
    },
  ]

  const collectedSamples = [
    {
      id: "SMP-004",
      requestId: "TR-2024-003",
      patient: "Amit Singh",
      patientId: "PT003",
      tests: ["Blood Sugar (Fasting)"],
      sampleType: "Blood",
      tubeType: "Fluoride (Grey)",
      status: "Collected",
      collectionTime: "08:30 AM",
      collectedBy: "Phlebotomist Ravi",
    },
    {
      id: "SMP-005",
      requestId: "TR-2024-004",
      patient: "Meena Devi",
      patientId: "PT004",
      tests: ["Thyroid Profile"],
      sampleType: "Blood",
      tubeType: "Plain (Red)",
      status: "In Transit",
      collectionTime: "07:45 AM",
      collectedBy: "Phlebotomist Sita",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-700"
      case "Urgent":
        return "bg-amber-100 text-amber-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge className="bg-slate-100 text-slate-700">Pending</Badge>
      case "Collected":
        return <Badge className="bg-teal-100 text-teal-700">Collected</Badge>
      case "In Transit":
        return <Badge className="bg-indigo-100 text-indigo-700">In Transit</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sample Collection</h1>
          <p className="text-slate-600">Manage sample collection and tracking</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-slate-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Pending Collection</p>
                <p className="text-2xl font-bold text-slate-700">{pendingSamples.length}</p>
              </div>
              <Clock className="h-8 w-8 text-slate-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">Critical</p>
                <p className="text-2xl font-bold text-red-700">
                  {pendingSamples.filter((s) => s.priority === "Critical").length}
                </p>
              </div>
              <Droplets className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-teal-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-600">Collected Today</p>
                <p className="text-2xl font-bold text-teal-700">{collectedSamples.length}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-teal-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-indigo-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-600">In Transit</p>
                <p className="text-2xl font-bold text-indigo-700">
                  {collectedSamples.filter((s) => s.status === "In Transit").length}
                </p>
              </div>
              <Barcode className="h-8 w-8 text-indigo-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Collection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-500" />
            Pending Sample Collection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingSamples.map((sample) => (
              <div
                key={sample.id}
                className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-all ${
                  sample.priority === "Critical"
                    ? "bg-red-50 border-red-200"
                    : sample.priority === "Urgent"
                      ? "bg-amber-50 border-amber-200"
                      : "bg-white"
                }`}
                onClick={() => setSelectedSample(sample)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-slate-900">{sample.patient}</p>
                        <Badge className={getPriorityColor(sample.priority)}>{sample.priority}</Badge>
                      </div>
                      <p className="text-sm text-slate-500">
                        {sample.bed} - {sample.patientId}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex flex-wrap gap-1 justify-end">
                      {sample.tests.map((test, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {test}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                      {sample.sampleType} - {sample.tubeType}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recently Collected */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-teal-500" />
            Recently Collected
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sample ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Tests</TableHead>
                <TableHead>Sample Type</TableHead>
                <TableHead>Collection Time</TableHead>
                <TableHead>Collected By</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {collectedSamples.map((sample) => (
                <TableRow key={sample.id}>
                  <TableCell className="font-medium">{sample.id}</TableCell>
                  <TableCell>{sample.patient}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {sample.tests.map((test, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {test}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{sample.sampleType}</TableCell>
                  <TableCell>{sample.collectionTime}</TableCell>
                  <TableCell>{sample.collectedBy}</TableCell>
                  <TableCell>{getStatusBadge(sample.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Collection Dialog */}
      <Dialog open={!!selectedSample} onOpenChange={() => setSelectedSample(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Collect Sample</DialogTitle>
          </DialogHeader>
          {selectedSample && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-slate-50 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{selectedSample.patient}</p>
                  <Badge className={getPriorityColor(selectedSample.priority)}>{selectedSample.priority}</Badge>
                </div>
                <p className="text-sm text-slate-500">
                  {selectedSample.bed} - {selectedSample.patientId}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Sample Type</Label>
                  <Input value={selectedSample.sampleType} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Tube Type</Label>
                  <Input value={selectedSample.tubeType} disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tests</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedSample.tests.map((test: string, i: number) => (
                    <Badge key={i} variant="outline">
                      {test}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Barcode / Sample ID</Label>
                <Input placeholder="Scan or enter barcode" />
              </div>

              <div className="space-y-2">
                <Label>Notes (optional)</Label>
                <Input placeholder="Any collection notes..." />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setSelectedSample(null)}>
                  Cancel
                </Button>
                <Button className="bg-teal-600 hover:bg-teal-700">Confirm Collection</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
