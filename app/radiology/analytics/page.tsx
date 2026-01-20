"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Download, TrendingUp, Clock, ScanLine, FileText } from "lucide-react"

const scanVolume = [
  { day: "Mon", xray: 45, ct: 12, mri: 8, usg: 18 },
  { day: "Tue", xray: 52, ct: 15, mri: 10, usg: 22 },
  { day: "Wed", xray: 48, ct: 14, mri: 9, usg: 20 },
  { day: "Thu", xray: 55, ct: 18, mri: 11, usg: 25 },
  { day: "Fri", xray: 50, ct: 16, mri: 10, usg: 23 },
  { day: "Sat", xray: 35, ct: 10, mri: 6, usg: 15 },
  { day: "Sun", xray: 20, ct: 5, mri: 3, usg: 8 },
]

const turnaroundTime = [
  { type: "X-Ray", avgTime: 2.5, target: 2 },
  { type: "CT Scan", avgTime: 4.2, target: 4 },
  { type: "MRI", avgTime: 6.8, target: 6 },
  { type: "Ultrasound", avgTime: 3.1, target: 3 },
  { type: "Echo", avgTime: 2.8, target: 3 },
]

const equipmentUtilization = [
  { name: "CT Scanner 1", value: 78, color: "#4f46e5" },
  { name: "MRI Machine", value: 65, color: "#0d9488" },
  { name: "X-Ray Room 1", value: 85, color: "#f59e0b" },
  { name: "X-Ray Room 2", value: 72, color: "#ef4444" },
  { name: "Ultrasound 1", value: 80, color: "#8b5cf6" },
]

const monthlyTrend = [
  { month: "Aug", scans: 1250, reports: 1220 },
  { month: "Sep", scans: 1380, reports: 1350 },
  { month: "Oct", scans: 1420, reports: 1400 },
  { month: "Nov", scans: 1520, reports: 1490 },
  { month: "Dec", scans: 1480, reports: 1460 },
  { month: "Jan", scans: 1620, reports: 1580 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Radiology Analytics</h1>
          <p className="text-muted-foreground">Performance metrics and insights</p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <ScanLine className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">1,620</p>
              <p className="text-sm text-muted-foreground">Total Scans</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
              <FileText className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold">1,580</p>
              <p className="text-sm text-muted-foreground">Reports Generated</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">3.8 hrs</p>
              <p className="text-sm text-muted-foreground">Avg Turnaround</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">76%</p>
              <p className="text-sm text-muted-foreground">Avg Utilization</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Scan Volume */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Scan Volume by Type</CardTitle>
            <CardDescription>Number of scans performed each day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scanVolume}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="xray" fill="#4f46e5" name="X-Ray" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="ct" fill="#0d9488" name="CT" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="mri" fill="#f59e0b" name="MRI" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="usg" fill="#8b5cf6" name="USG" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Equipment Utilization */}
        <Card>
          <CardHeader>
            <CardTitle>Equipment Utilization</CardTitle>
            <CardDescription>Usage percentage by equipment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {equipmentUtilization.map((eq) => (
                <div key={eq.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{eq.name}</p>
                    <span className="text-sm font-semibold">{eq.value}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${eq.value}%`, backgroundColor: eq.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Turnaround Time */}
        <Card>
          <CardHeader>
            <CardTitle>Report Turnaround Time</CardTitle>
            <CardDescription>Average hours from scan to report (vs target)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={turnaroundTime} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-xs" unit=" hrs" />
                  <YAxis dataKey="type" type="category" width={100} className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="avgTime" fill="#4f46e5" name="Actual" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="target" fill="#e5e7eb" name="Target" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trend</CardTitle>
            <CardDescription>Scans performed and reports generated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="scans"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    name="Scans"
                    dot={{ fill: "#4f46e5" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="reports"
                    stroke="#0d9488"
                    strokeWidth={2}
                    name="Reports"
                    dot={{ fill: "#0d9488" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
