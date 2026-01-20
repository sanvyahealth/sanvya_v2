"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatsCard } from "@/components/stats-card"
import { ScanLine, Clock, CheckCircle2, ArrowRight, FileText, ImageIcon } from "lucide-react"
import Link from "next/link"

export default function RadiologyDashboard() {
  const pendingScans = [
    { id: "RAD001", patient: "Rajesh Kumar", scan: "CT Chest", priority: "Urgent", scheduledTime: "10:30 AM" },
    { id: "RAD002", patient: "Priya Patel", scan: "MRI Brain", priority: "Normal", scheduledTime: "11:00 AM" },
    { id: "RAD003", patient: "Amit Singh", scan: "X-Ray Chest PA", priority: "Normal", scheduledTime: "11:30 AM" },
    { id: "RAD004", patient: "Suresh Reddy", scan: "Echo", priority: "Urgent", scheduledTime: "12:00 PM" },
  ]

  const pendingReports = [
    { id: "RPT001", patient: "Meena Devi", scan: "Ultrasound Abdomen", completedAt: "09:30 AM", status: "Pending" },
    { id: "RPT002", patient: "Lakshmi Nair", scan: "CT Abdomen", completedAt: "09:00 AM", status: "In Progress" },
    { id: "RPT003", patient: "Vijay Malhotra", scan: "MRI Spine", completedAt: "08:30 AM", status: "Pending" },
  ]

  const scanTypes = [
    { type: "X-Ray", count: 25, color: "bg-slate-100 text-slate-700" },
    { type: "CT Scan", count: 12, color: "bg-indigo-100 text-indigo-700" },
    { type: "MRI", count: 8, color: "bg-teal-100 text-teal-700" },
    { type: "Ultrasound", count: 15, color: "bg-amber-100 text-amber-700" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Radiology Dashboard</h1>
          <p className="text-slate-600">Manage imaging requests and reports</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/radiology/pacs">Open PACS</Link>
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
            <Link href="/radiology/requests">New Scan Request</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Today's Scans" value="32" change="8 completed" trend="up" icon={ScanLine} />
        <StatsCard title="Pending Scans" value="12" change="4 urgent" trend="up" icon={Clock} />
        <StatsCard title="Reports Pending" value="6" change="2 high priority" trend="down" icon={FileText} />
        <StatsCard title="Completed Today" value="18" change="+15% vs yesterday" trend="up" icon={CheckCircle2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Today's Schedule</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/radiology/scheduling">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingScans.map((scan) => (
                <div key={scan.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <ScanLine className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-700">{scan.scan}</p>
                      <p className="text-sm text-slate-500">{scan.patient}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      className={scan.priority === "Urgent" ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-700"}
                    >
                      {scan.priority}
                    </Badge>
                    <span className="text-sm font-medium text-slate-600">{scan.scheduledTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scan Types */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Scans by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scanTypes.map((type) => (
                <div key={type.type} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-700">{type.type}</span>
                  <Badge className={type.color}>{type.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Reports */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Pending Reports</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/radiology/reports">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <ImageIcon className="h-5 w-5 text-indigo-600" />
                    <div>
                      <p className="font-medium text-slate-700">{report.scan}</p>
                      <p className="text-sm text-slate-500">{report.patient}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={
                        report.status === "In Progress" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700"
                      }
                    >
                      {report.status}
                    </Badge>
                    <p className="text-xs text-slate-400 mt-1">{report.completedAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Equipment Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Equipment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "CT Scanner 1", status: "Active", queue: 3 },
                { name: "MRI Machine", status: "Active", queue: 2 },
                { name: "X-Ray Room 1", status: "Active", queue: 5 },
                { name: "X-Ray Room 2", status: "Maintenance", queue: 0 },
                { name: "Ultrasound 1", status: "Active", queue: 4 },
              ].map((equipment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        equipment.status === "Active" ? "bg-teal-500" : "bg-amber-500"
                      }`}
                    />
                    <span className="font-medium text-slate-700">{equipment.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      className={
                        equipment.status === "Active" ? "bg-teal-100 text-teal-700" : "bg-amber-100 text-amber-700"
                      }
                    >
                      {equipment.status}
                    </Badge>
                    {equipment.queue > 0 && <span className="text-sm text-slate-500">{equipment.queue} in queue</span>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
