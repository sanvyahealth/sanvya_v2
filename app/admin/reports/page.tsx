"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, TrendingUp, Users, IndianRupee, BedDouble } from "lucide-react"

const reportTypes = [
  { name: "Patient Admissions Report", icon: Users, description: "Daily, weekly, and monthly admission statistics" },
  { name: "Revenue Report", icon: IndianRupee, description: "Financial summary and billing analytics" },
  { name: "Department Performance", icon: TrendingUp, description: "Department-wise metrics and KPIs" },
  { name: "Bed Occupancy Report", icon: BedDouble, description: "Ward and room utilization statistics" },
]

export default function ReportsPage() {
  return (
    <div className="flex flex-col">
      <Header title="Reports" />

      <div className="flex-1 space-y-6 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Generate Reports</h2>
            <p className="text-sm text-muted-foreground">Download comprehensive hospital reports</p>
          </div>
          <Select defaultValue="this-month">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="this-quarter">This Quarter</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {reportTypes.map((report) => (
            <Card key={report.name} className="border-border">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <report.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{report.name}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <FileText className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
