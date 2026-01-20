"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, FileText, Download, Printer, Eye, Send, Calendar } from "lucide-react"

export default function LabReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedReport, setSelectedReport] = useState<any | null>(null)

  const reports = [
    {
      id: "RPT-2024-001",
      patient: "Suresh Reddy",
      patientId: "PT005",
      tests: ["Troponin I", "CK-MB", "D-Dimer"],
      doctor: "Dr. Gupta",
      date: "2024-01-15",
      status: "Ready",
      results: [
        { test: "Troponin I", result: "0.8", unit: "ng/mL", range: "0.0 - 0.04", status: "Critical High" },
        { test: "CK-MB", result: "45", unit: "U/L", range: "0 - 25", status: "High" },
        { test: "D-Dimer", result: "0.3", unit: "mg/L", range: "0.0 - 0.5", status: "Normal" },
      ],
    },
    {
      id: "RPT-2024-002",
      patient: "Meena Devi",
      patientId: "PT004",
      tests: ["Thyroid Profile", "Lipid Profile"],
      doctor: "Dr. Sharma",
      date: "2024-01-15",
      status: "Ready",
      results: [
        { test: "TSH", result: "2.5", unit: "mIU/L", range: "0.4 - 4.0", status: "Normal" },
        { test: "T3", result: "1.2", unit: "ng/mL", range: "0.8 - 2.0", status: "Normal" },
        { test: "T4", result: "8.5", unit: "μg/dL", range: "5.0 - 12.0", status: "Normal" },
        { test: "Total Cholesterol", result: "220", unit: "mg/dL", range: "< 200", status: "High" },
        { test: "HDL", result: "45", unit: "mg/dL", range: "> 40", status: "Normal" },
        { test: "LDL", result: "140", unit: "mg/dL", range: "< 100", status: "High" },
      ],
    },
    {
      id: "RPT-2024-003",
      patient: "Amit Singh",
      patientId: "PT003",
      tests: ["Blood Sugar (Fasting)", "HbA1c"],
      doctor: "Dr. Reddy",
      date: "2024-01-15",
      status: "Sent",
      results: [
        { test: "Blood Sugar (Fasting)", result: "92", unit: "mg/dL", range: "70 - 100", status: "Normal" },
        { test: "HbA1c", result: "5.4", unit: "%", range: "4.0 - 5.6", status: "Normal" },
      ],
    },
    {
      id: "RPT-2024-004",
      patient: "Lakshmi Nair",
      patientId: "PT006",
      tests: ["Complete Blood Count"],
      doctor: "Dr. Sharma",
      date: "2024-01-14",
      status: "Sent",
      results: [
        { test: "Hemoglobin", result: "12.5", unit: "g/dL", range: "12.0 - 16.0", status: "Normal" },
        { test: "WBC", result: "8500", unit: "/μL", range: "4000 - 11000", status: "Normal" },
        { test: "Platelets", result: "250000", unit: "/μL", range: "150000 - 400000", status: "Normal" },
      ],
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ready":
        return <Badge className="bg-teal-100 text-teal-700">Ready</Badge>
      case "Sent":
        return <Badge className="bg-indigo-100 text-indigo-700">Sent</Badge>
      case "Pending":
        return <Badge className="bg-amber-100 text-amber-700">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getResultStatusColor = (status: string) => {
    if (status.includes("Critical")) return "text-red-600 bg-red-50"
    if (status.includes("High") || status.includes("Low")) return "text-amber-600 bg-amber-50"
    return "text-teal-600 bg-teal-50"
  }

  const filteredReports = reports.filter(
    (report) =>
      report.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Lab Reports</h1>
          <p className="text-slate-600">View and manage laboratory reports</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by patient name or report ID..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Tests</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{report.patient}</p>
                      <p className="text-xs text-slate-500">{report.patientId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {report.tests.slice(0, 2).map((test, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {test}
                        </Badge>
                      ))}
                      {report.tests.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{report.tests.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{report.doctor}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => setSelectedReport(report)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Printer className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      {report.status === "Ready" && (
                        <Button variant="ghost" size="icon">
                          <Send className="h-4 w-4" />
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

      {/* Report Detail Dialog */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-600" />
              Lab Report - {selectedReport?.id}
            </DialogTitle>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-6 py-4">
              {/* Patient Info */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-500">Patient</p>
                  <p className="font-medium">{selectedReport.patient}</p>
                  <p className="text-xs text-slate-400">{selectedReport.patientId}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-500">Requesting Doctor</p>
                  <p className="font-medium">{selectedReport.doctor}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-500">Report Date</p>
                  <p className="font-medium">{selectedReport.date}</p>
                </div>
              </div>

              {/* Results Table */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="p-3 text-left text-sm font-medium text-slate-600">Test</th>
                      <th className="p-3 text-center text-sm font-medium text-slate-600">Result</th>
                      <th className="p-3 text-center text-sm font-medium text-slate-600">Unit</th>
                      <th className="p-3 text-center text-sm font-medium text-slate-600">Reference Range</th>
                      <th className="p-3 text-center text-sm font-medium text-slate-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedReport.results.map((result: any, index: number) => (
                      <tr key={index} className="border-t">
                        <td className="p-3 font-medium">{result.test}</td>
                        <td className="p-3 text-center font-semibold">{result.result}</td>
                        <td className="p-3 text-center text-slate-500">{result.unit}</td>
                        <td className="p-3 text-center text-slate-500">{result.range}</td>
                        <td className="p-3 text-center">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${getResultStatusColor(result.status)}`}
                          >
                            {result.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Actions */}
              <div className="flex justify-between pt-4 border-t">
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Printer className="h-4 w-4 mr-2" /> Print
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" /> Download PDF
                  </Button>
                </div>
                {selectedReport.status === "Ready" && (
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <Send className="h-4 w-4 mr-2" /> Send to Doctor
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
