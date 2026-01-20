"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatsCard } from "@/components/stats-card"
import { FlaskConical, Clock, CheckCircle2, AlertTriangle, ArrowRight, Microscope } from "lucide-react"
import Link from "next/link"

export default function LabDashboard() {
  const pendingTests = [
    { id: "LAB001", patient: "Rajesh Kumar", test: "Complete Blood Count", priority: "Normal", time: "30 mins ago" },
    { id: "LAB002", patient: "Priya Patel", test: "Liver Function Test", priority: "Urgent", time: "15 mins ago" },
    { id: "LAB003", patient: "Amit Singh", test: "Blood Sugar (Fasting)", priority: "Normal", time: "45 mins ago" },
    { id: "LAB004", patient: "Meena Devi", test: "HbA1c", priority: "Urgent", time: "20 mins ago" },
  ]

  const recentResults = [
    {
      id: "RES001",
      patient: "Suresh Reddy",
      test: "Troponin I",
      result: "0.8 ng/mL",
      status: "Critical",
      time: "10 mins ago",
    },
    { id: "RES002", patient: "Lakshmi Nair", test: "TSH", result: "2.5 mIU/L", status: "Normal", time: "25 mins ago" },
    {
      id: "RES003",
      patient: "Vijay Malhotra",
      test: "Creatinine",
      result: "1.2 mg/dL",
      status: "Normal",
      time: "35 mins ago",
    },
  ]

  const testCategories = [
    { name: "Hematology", count: 45, color: "bg-red-100 text-red-700" },
    { name: "Biochemistry", count: 38, color: "bg-indigo-100 text-indigo-700" },
    { name: "Microbiology", count: 12, color: "bg-teal-100 text-teal-700" },
    { name: "Serology", count: 15, color: "bg-amber-100 text-amber-700" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Laboratory Dashboard</h1>
          <p className="text-slate-600">Manage tests, samples, and results</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/lab/reports">View Reports</Link>
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
            <Link href="/lab/requests">New Test Request</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Pending Tests" value="24" change="+5 this hour" trend="up" icon={Clock} />
        <StatsCard title="In Processing" value="18" change="6 urgent" trend="up" icon={Microscope} />
        <StatsCard title="Completed Today" value="87" change="+12% vs yesterday" trend="up" icon={CheckCircle2} />
        <StatsCard title="Critical Results" value="3" change="Requires attention" trend="down" icon={AlertTriangle} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Tests */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Pending Test Requests</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/lab/requests">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTests.map((test) => (
                <div key={test.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <FlaskConical className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-700">{test.test}</p>
                      <p className="text-sm text-slate-500">{test.patient}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      className={test.priority === "Urgent" ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-700"}
                    >
                      {test.priority}
                    </Badge>
                    <span className="text-xs text-slate-400">{test.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Test Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Tests by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {testCategories.map((category) => (
                <div key={category.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-700">{category.name}</span>
                  <Badge className={category.color}>{category.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Results */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Results</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/lab/results">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentResults.map((result) => (
                <div
                  key={result.id}
                  className={`p-3 rounded-lg ${
                    result.status === "Critical" ? "bg-red-50 border border-red-100" : "bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-700">{result.test}</p>
                      <p className="text-sm text-slate-500">{result.patient}</p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${result.status === "Critical" ? "text-red-600" : "text-slate-700"}`}
                      >
                        {result.result}
                      </p>
                      <Badge
                        className={
                          result.status === "Critical" ? "bg-red-100 text-red-700" : "bg-teal-100 text-teal-700"
                        }
                      >
                        {result.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Turnaround Time */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Turnaround Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { test: "CBC", target: "2 hrs", actual: "1.5 hrs", status: "good" },
                { test: "LFT", target: "4 hrs", actual: "3.8 hrs", status: "good" },
                { test: "Blood Culture", target: "48 hrs", actual: "52 hrs", status: "delayed" },
                { test: "Urinalysis", target: "1 hr", actual: "45 mins", status: "good" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">{item.test}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-500">Target: {item.target}</span>
                    <span
                      className={`text-sm font-medium ${item.status === "good" ? "text-teal-600" : "text-red-600"}`}
                    >
                      {item.actual}
                    </span>
                    {item.status === "good" ? (
                      <CheckCircle2 className="h-4 w-4 text-teal-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
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
