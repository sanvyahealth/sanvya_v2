"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Play, CheckCircle2, Clock, AlertCircle, ScanLine } from "lucide-react"

const inProgressScans = [
  {
    id: "IMG-001",
    patient: "Rajesh Kumar",
    patientId: "SNV-2024-001",
    scan: "CT Chest",
    equipment: "CT Scanner 1",
    technician: "Ramesh K.",
    startTime: "10:15 AM",
    status: "in-progress",
  },
  {
    id: "IMG-002",
    patient: "Lakshmi Nair",
    patientId: "SNV-2024-008",
    scan: "MRI Brain",
    equipment: "MRI Machine",
    technician: "Priya S.",
    startTime: "10:00 AM",
    status: "in-progress",
  },
]

const queuedScans = [
  {
    id: "IMG-003",
    patient: "Priya Patel",
    patientId: "SNV-2024-002",
    scan: "X-Ray Chest",
    equipment: "X-Ray Room 1",
    scheduledTime: "10:30 AM",
    priority: "normal",
    status: "queued",
  },
  {
    id: "IMG-004",
    patient: "Suresh Reddy",
    patientId: "SNV-2024-009",
    scan: "Echo",
    equipment: "Ultrasound 1",
    scheduledTime: "10:30 AM",
    priority: "urgent",
    status: "queued",
  },
  {
    id: "IMG-005",
    patient: "Amit Singh",
    patientId: "SNV-2024-003",
    scan: "USG Abdomen",
    equipment: "Ultrasound 1",
    scheduledTime: "11:00 AM",
    priority: "normal",
    status: "queued",
  },
  {
    id: "IMG-006",
    patient: "Farhan Khan",
    patientId: "SNV-2024-010",
    scan: "CT Brain",
    equipment: "CT Scanner 1",
    scheduledTime: "11:00 AM",
    priority: "urgent",
    status: "queued",
  },
]

const completedScans = [
  {
    id: "IMG-007",
    patient: "Meena Devi",
    patientId: "SNV-2024-011",
    scan: "Ultrasound Abdomen",
    equipment: "Ultrasound 1",
    completedTime: "09:45 AM",
    technician: "Kavita N.",
    reportStatus: "pending",
  },
  {
    id: "IMG-008",
    patient: "Vijay Malhotra",
    patientId: "SNV-2024-012",
    scan: "MRI Spine",
    equipment: "MRI Machine",
    completedTime: "09:30 AM",
    technician: "Priya S.",
    reportStatus: "in-progress",
  },
  {
    id: "IMG-009",
    patient: "Sunita Gupta",
    patientId: "SNV-2024-013",
    scan: "X-Ray Knee",
    equipment: "X-Ray Room 2",
    completedTime: "09:15 AM",
    technician: "Mohan D.",
    reportStatus: "completed",
  },
]

export default function ImagingPage() {
  const [search, setSearch] = useState("")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Imaging Workflow</h1>
        <p className="text-muted-foreground">Manage ongoing scans and imaging queue</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Play className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-700">{inProgressScans.length}</p>
              <p className="text-sm text-blue-600">In Progress</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-700">{queuedScans.length}</p>
              <p className="text-sm text-amber-600">In Queue</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-700">
                {queuedScans.filter((s) => s.priority === "urgent").length}
              </p>
              <p className="text-sm text-red-600">Urgent</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-700">{completedScans.length}</p>
              <p className="text-sm text-green-600">Completed Today</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* In Progress */}
      {inProgressScans.length > 0 && (
        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50/50">
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Play className="h-5 w-5" />
              Currently In Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Scan Type</TableHead>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Technician</TableHead>
                  <TableHead>Started</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inProgressScans.map((scan) => (
                  <TableRow key={scan.id} className="bg-blue-50/30">
                    <TableCell>
                      <div>
                        <p className="font-medium">{scan.patient}</p>
                        <p className="text-xs text-muted-foreground">{scan.patientId}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <ScanLine className="h-4 w-4 text-blue-600" />
                        {scan.scan}
                      </div>
                    </TableCell>
                    <TableCell>{scan.equipment}</TableCell>
                    <TableCell>{scan.technician}</TableCell>
                    <TableCell>{scan.startTime}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm">Complete Scan</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Tabs for Queue and Completed */}
      <Tabs defaultValue="queue">
        <TabsList>
          <TabsTrigger value="queue" className="gap-2">
            <Clock className="h-4 w-4" />
            Queue ({queuedScans.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Completed ({completedScans.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Scan Queue</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search queue..."
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
                    <TableHead>Patient</TableHead>
                    <TableHead>Scan Type</TableHead>
                    <TableHead>Equipment</TableHead>
                    <TableHead>Scheduled</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queuedScans.map((scan) => (
                    <TableRow key={scan.id} className={scan.priority === "urgent" ? "bg-red-50/50" : ""}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{scan.patient}</p>
                          <p className="text-xs text-muted-foreground">{scan.patientId}</p>
                        </div>
                      </TableCell>
                      <TableCell>{scan.scan}</TableCell>
                      <TableCell>{scan.equipment}</TableCell>
                      <TableCell>{scan.scheduledTime}</TableCell>
                      <TableCell>
                        <Badge variant={scan.priority === "urgent" ? "destructive" : "secondary"}>
                          {scan.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline">
                          Start Scan
                        </Button>
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
              <CardTitle>Completed Scans</CardTitle>
              <CardDescription>Scans completed today awaiting reports</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Scan Type</TableHead>
                    <TableHead>Equipment</TableHead>
                    <TableHead>Completed</TableHead>
                    <TableHead>Technician</TableHead>
                    <TableHead>Report Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedScans.map((scan) => (
                    <TableRow key={scan.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{scan.patient}</p>
                          <p className="text-xs text-muted-foreground">{scan.patientId}</p>
                        </div>
                      </TableCell>
                      <TableCell>{scan.scan}</TableCell>
                      <TableCell>{scan.equipment}</TableCell>
                      <TableCell>{scan.completedTime}</TableCell>
                      <TableCell>{scan.technician}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            scan.reportStatus === "completed"
                              ? "default"
                              : scan.reportStatus === "in-progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {scan.reportStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost">
                          View Images
                        </Button>
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
