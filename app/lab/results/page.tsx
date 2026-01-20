"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit, CheckCircle2, AlertTriangle } from "lucide-react"

export default function ResultsEntryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedResult, setSelectedResult] = useState<any | null>(null)

  const pendingResults = [
    {
      id: "RES-001",
      sampleId: "SMP-003",
      patient: "Suresh Reddy",
      patientId: "PT005",
      test: "Troponin I",
      unit: "ng/mL",
      normalRange: "0.0 - 0.04",
      result: "",
      status: "Pending Entry",
      priority: "Critical",
    },
    {
      id: "RES-002",
      sampleId: "SMP-003",
      patient: "Suresh Reddy",
      patientId: "PT005",
      test: "CK-MB",
      unit: "U/L",
      normalRange: "0 - 25",
      result: "",
      status: "Pending Entry",
      priority: "Critical",
    },
    {
      id: "RES-003",
      sampleId: "SMP-004",
      patient: "Amit Singh",
      patientId: "PT003",
      test: "Blood Sugar (Fasting)",
      unit: "mg/dL",
      normalRange: "70 - 100",
      result: "92",
      status: "Pending Verification",
      priority: "Normal",
    },
  ]

  const completedResults = [
    {
      id: "RES-004",
      patient: "Meena Devi",
      test: "TSH",
      result: "2.5",
      unit: "mIU/L",
      normalRange: "0.4 - 4.0",
      status: "Normal",
      verifiedBy: "Dr. Meera Joshi",
      verifiedAt: "09:30 AM",
    },
    {
      id: "RES-005",
      patient: "Lakshmi Nair",
      test: "HbA1c",
      result: "7.2",
      unit: "%",
      normalRange: "4.0 - 5.6",
      status: "High",
      verifiedBy: "Dr. Meera Joshi",
      verifiedAt: "09:15 AM",
    },
    {
      id: "RES-006",
      patient: "Vijay Malhotra",
      test: "Creatinine",
      result: "1.1",
      unit: "mg/dL",
      normalRange: "0.7 - 1.3",
      status: "Normal",
      verifiedBy: "Dr. Meera Joshi",
      verifiedAt: "09:00 AM",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending Entry":
        return <Badge className="bg-slate-100 text-slate-700">Pending Entry</Badge>
      case "Pending Verification":
        return <Badge className="bg-amber-100 text-amber-700">Pending Verification</Badge>
      case "Normal":
        return <Badge className="bg-teal-100 text-teal-700">Normal</Badge>
      case "High":
        return <Badge className="bg-red-100 text-red-700">High</Badge>
      case "Low":
        return <Badge className="bg-amber-100 text-amber-700">Low</Badge>
      case "Critical":
        return <Badge className="bg-red-100 text-red-700">Critical</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredPending = pendingResults.filter(
    (result) =>
      result.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.test.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Results Entry</h1>
          <p className="text-slate-600">Enter and verify test results</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-slate-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Pending Entry</p>
                <p className="text-2xl font-bold text-slate-700">
                  {pendingResults.filter((r) => r.status === "Pending Entry").length}
                </p>
              </div>
              <Edit className="h-8 w-8 text-slate-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">Pending Verification</p>
                <p className="text-2xl font-bold text-amber-700">
                  {pendingResults.filter((r) => r.status === "Pending Verification").length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-teal-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-600">Verified Today</p>
                <p className="text-2xl font-bold text-teal-700">{completedResults.length}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-teal-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Results */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Pending Results</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sample ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Test</TableHead>
                <TableHead>Normal Range</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPending.map((result) => (
                <TableRow key={result.id} className={result.priority === "Critical" ? "bg-red-50" : ""}>
                  <TableCell className="font-medium">{result.sampleId}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{result.patient}</p>
                      <p className="text-xs text-slate-500">{result.patientId}</p>
                    </div>
                  </TableCell>
                  <TableCell>{result.test}</TableCell>
                  <TableCell>
                    {result.normalRange} {result.unit}
                  </TableCell>
                  <TableCell>
                    {result.result ? (
                      <span className="font-medium">
                        {result.result} {result.unit}
                      </span>
                    ) : (
                      <span className="text-slate-400">Not entered</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(result.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      className="bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => setSelectedResult(result)}
                    >
                      {result.status === "Pending Entry" ? "Enter" : "Verify"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Verified Results */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recently Verified</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Test</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Normal Range</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verified By</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completedResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">{result.patient}</TableCell>
                  <TableCell>{result.test}</TableCell>
                  <TableCell className="font-medium">
                    {result.result} {result.unit}
                  </TableCell>
                  <TableCell>
                    {result.normalRange} {result.unit}
                  </TableCell>
                  <TableCell>{getStatusBadge(result.status)}</TableCell>
                  <TableCell>{result.verifiedBy}</TableCell>
                  <TableCell>{result.verifiedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Result Entry Dialog */}
      <Dialog open={!!selectedResult} onOpenChange={() => setSelectedResult(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedResult?.status === "Pending Entry" ? "Enter Result" : "Verify Result"}</DialogTitle>
          </DialogHeader>
          {selectedResult && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold">{selectedResult.test}</p>
                  <Badge
                    className={
                      selectedResult.priority === "Critical" ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-700"
                    }
                  >
                    {selectedResult.priority}
                  </Badge>
                </div>
                <p className="text-sm text-slate-500">{selectedResult.patient}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Result Value</Label>
                  <Input type="number" step="0.01" placeholder="Enter value" defaultValue={selectedResult.result} />
                </div>
                <div className="space-y-2">
                  <Label>Unit</Label>
                  <Input value={selectedResult.unit} disabled />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-500">Normal Range</p>
                <p className="font-medium">
                  {selectedResult.normalRange} {selectedResult.unit}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Interpretation</Label>
                <Select defaultValue="normal">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical-low">Critical Low</SelectItem>
                    <SelectItem value="critical-high">Critical High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Comments (optional)</Label>
                <Textarea placeholder="Add any relevant comments..." rows={2} />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setSelectedResult(null)}>
                  Cancel
                </Button>
                {selectedResult.status === "Pending Entry" ? (
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Save Result</Button>
                ) : (
                  <>
                    <Button variant="outline">
                      <Edit className="h-4 w-4 mr-2" /> Edit
                    </Button>
                    <Button className="bg-teal-600 hover:bg-teal-700">
                      <CheckCircle2 className="h-4 w-4 mr-2" /> Verify & Send
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
