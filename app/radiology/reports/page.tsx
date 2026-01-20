"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, FileText, Eye, Edit, CheckCircle2, Clock, Send } from "lucide-react"

const pendingReports = [
  {
    id: "RPT-001",
    patient: "Meena Devi",
    patientId: "SNV-2024-011",
    scan: "Ultrasound Abdomen",
    scanDate: "2024-01-28",
    requestedBy: "Dr. Kavita Nair",
    priority: "normal",
  },
  {
    id: "RPT-002",
    patient: "Vijay Malhotra",
    patientId: "SNV-2024-012",
    scan: "MRI Spine",
    scanDate: "2024-01-28",
    requestedBy: "Dr. Suresh Menon",
    priority: "urgent",
  },
  {
    id: "RPT-003",
    patient: "Lakshmi Nair",
    patientId: "SNV-2024-008",
    scan: "CT Abdomen",
    scanDate: "2024-01-28",
    requestedBy: "Dr. Anil Kapoor",
    priority: "normal",
  },
  {
    id: "RPT-004",
    patient: "Farhan Khan",
    patientId: "SNV-2024-010",
    scan: "CT Brain",
    scanDate: "2024-01-28",
    requestedBy: "Dr. Ramesh Iyer",
    priority: "urgent",
  },
]

const completedReports = [
  {
    id: "RPT-005",
    patient: "Sunita Gupta",
    patientId: "SNV-2024-013",
    scan: "X-Ray Knee",
    scanDate: "2024-01-28",
    reportedBy: "Dr. Anil Verma",
    reportDate: "2024-01-28",
    finding: "Mild osteoarthritis",
  },
  {
    id: "RPT-006",
    patient: "Rajesh Kumar",
    patientId: "SNV-2024-001",
    scan: "CT Chest",
    scanDate: "2024-01-27",
    reportedBy: "Dr. Anil Verma",
    reportDate: "2024-01-27",
    finding: "No significant abnormality",
  },
  {
    id: "RPT-007",
    patient: "Priya Patel",
    patientId: "SNV-2024-002",
    scan: "X-Ray Chest",
    scanDate: "2024-01-27",
    reportedBy: "Dr. Anil Verma",
    reportDate: "2024-01-27",
    finding: "Normal study",
  },
]

export default function ReportsPage() {
  const [search, setSearch] = useState("")
  const [selectedReport, setSelectedReport] = useState<(typeof pendingReports)[0] | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Radiology Reports</h1>
        <p className="text-muted-foreground">Create and manage imaging reports</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-700">{pendingReports.length}</p>
              <p className="text-sm text-amber-600">Pending Reports</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <FileText className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-700">
                {pendingReports.filter((r) => r.priority === "urgent").length}
              </p>
              <p className="text-sm text-red-600">Urgent Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-700">{completedReports.length}</p>
              <p className="text-sm text-green-600">Completed Today</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="h-4 w-4" />
            Pending ({pendingReports.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Completed ({completedReports.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Pending Reports</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search reports..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Scan Type</TableHead>
                    <TableHead>Scan Date</TableHead>
                    <TableHead>Requested By</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingReports.map((report) => (
                    <TableRow key={report.id} className={report.priority === "urgent" ? "bg-red-50/50" : ""}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{report.patient}</p>
                          <p className="text-xs text-muted-foreground">{report.patientId}</p>
                        </div>
                      </TableCell>
                      <TableCell>{report.scan}</TableCell>
                      <TableCell>{report.scanDate}</TableCell>
                      <TableCell>{report.requestedBy}</TableCell>
                      <TableCell>
                        <Badge variant={report.priority === "urgent" ? "destructive" : "secondary"}>
                          {report.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" onClick={() => setSelectedReport(report)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Report
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>Create Report - {report.id}</DialogTitle>
                                <DialogDescription>
                                  {report.patient} • {report.scan} • {report.scanDate}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted/50 p-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Patient</p>
                                    <p className="font-medium">{report.patient}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Requested By</p>
                                    <p className="font-medium">{report.requestedBy}</p>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label>Clinical History</Label>
                                  <Textarea placeholder="Enter clinical history and indication for scan..." rows={2} />
                                </div>
                                <div className="space-y-2">
                                  <Label>Technique</Label>
                                  <Textarea placeholder="Describe imaging technique used..." rows={2} />
                                </div>
                                <div className="space-y-2">
                                  <Label>Findings</Label>
                                  <Textarea placeholder="Describe findings in detail..." rows={4} />
                                </div>
                                <div className="space-y-2">
                                  <Label>Impression</Label>
                                  <Textarea placeholder="Summary and diagnosis..." rows={2} />
                                </div>
                                <div className="space-y-2">
                                  <Label>Recommendations</Label>
                                  <Input placeholder="Follow-up recommendations if any..." />
                                </div>
                              </div>
                              <div className="flex justify-end gap-3">
                                <Button variant="outline">Save Draft</Button>
                                <Button>
                                  <Send className="mr-2 h-4 w-4" />
                                  Submit Report
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Reports</CardTitle>
              <CardDescription>Reports submitted today</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Scan Type</TableHead>
                    <TableHead>Reported By</TableHead>
                    <TableHead>Report Date</TableHead>
                    <TableHead>Finding</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{report.patient}</p>
                          <p className="text-xs text-muted-foreground">{report.patientId}</p>
                        </div>
                      </TableCell>
                      <TableCell>{report.scan}</TableCell>
                      <TableCell>{report.reportedBy}</TableCell>
                      <TableCell>{report.reportDate}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{report.finding}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            Print
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
