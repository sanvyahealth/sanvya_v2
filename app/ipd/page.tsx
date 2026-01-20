"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatsCard } from "@/components/stats-card"
import { BedDouble, Users, AlertTriangle, Clock, ArrowRight } from "lucide-react"
import { demoPatients, demoWards, demoBeds } from "@/lib/demo-data"
import Link from "next/link"

export default function IPDDashboard() {
  const admittedPatients = demoPatients.filter((p) => p.status === "Admitted")
  const occupiedBeds = demoBeds.filter((b) => b.status === "Occupied")
  const availableBeds = demoBeds.filter((b) => b.status === "Available")
  const criticalPatients = admittedPatients.filter((p) => p.status === "Admitted").slice(0, 2)

  const recentAdmissions = [
    {
      id: "ADM001",
      patient: "Rajesh Kumar",
      ward: "General Ward A",
      bed: "GW-A-101",
      time: "2 hours ago",
      doctor: "Dr. Sharma",
    },
    { id: "ADM002", patient: "Priya Patel", ward: "ICU", bed: "ICU-001", time: "4 hours ago", doctor: "Dr. Gupta" },
    {
      id: "ADM003",
      patient: "Amit Singh",
      ward: "Private Room",
      bed: "PR-201",
      time: "6 hours ago",
      doctor: "Dr. Reddy",
    },
  ]

  const pendingTasks = [
    { task: "Medication round - Ward A", time: "10:00 AM", priority: "High" },
    { task: "Vitals check - ICU patients", time: "10:30 AM", priority: "Critical" },
    { task: "Discharge preparation - Bed GW-B-105", time: "11:00 AM", priority: "Medium" },
    { task: "Doctor consultation - Room PR-203", time: "11:30 AM", priority: "High" },
  ]

  const wardOccupancy = demoWards.map((ward) => ({
    ...ward,
    occupied: Math.floor(ward.totalBeds * 0.7),
    available: Math.floor(ward.totalBeds * 0.3),
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">IPD Dashboard</h1>
          <p className="text-slate-600">Inpatient department overview and management</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/ipd/rounds">Start Ward Round</Link>
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
            <Link href="/ipd/admissions">New Admission</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Admitted"
          value={admittedPatients.length.toString()}
          change="+3 today"
          trend="up"
          icon={Users}
        />
        <StatsCard
          title="Beds Occupied"
          value={`${occupiedBeds.length}/${demoBeds.length}`}
          change="72% occupancy"
          trend="up"
          icon={BedDouble}
        />
        <StatsCard
          title="Critical Patients"
          value={criticalPatients.length.toString()}
          change="ICU monitoring"
          trend="down"
          icon={AlertTriangle}
        />
        <StatsCard title="Pending Discharges" value="8" change="Today" trend="up" icon={Clock} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ward Occupancy */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Ward Occupancy</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/ipd/beds">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wardOccupancy.map((ward) => (
                <div key={ward.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{ward.name}</span>
                    <span className="text-slate-500">
                      {ward.occupied}/{ward.totalBeds} beds
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        (ward.occupied / ward.totalBeds) > 0.9
                          ? "bg-red-500"
                          : ward.occupied / ward.totalBeds > 0.7
                            ? "bg-amber-500"
                            : "bg-teal-500"
                      }`}
                      style={{ width: `${(ward.occupied / ward.totalBeds) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTasks.map((task, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <div
                    className={`w-2 h-2 mt-2 rounded-full ${
                      task.priority === "Critical"
                        ? "bg-red-500"
                        : task.priority === "High"
                          ? "bg-amber-500"
                          : "bg-teal-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">{task.task}</p>
                    <p className="text-xs text-slate-500">{task.time}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      task.priority === "Critical"
                        ? "border-red-200 text-red-700 bg-red-50"
                        : task.priority === "High"
                          ? "border-amber-200 text-amber-700 bg-amber-50"
                          : "border-teal-200 text-teal-700 bg-teal-50"
                    }
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Admissions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Admissions</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/ipd/admissions">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAdmissions.map((admission) => (
                <div key={admission.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-700">{admission.patient}</p>
                      <p className="text-xs text-slate-500">
                        {admission.ward} - {admission.bed}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600">{admission.doctor}</p>
                    <p className="text-xs text-slate-400">{admission.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Critical Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Critical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-red-700">ICU-003: Low SpO2 Alert</p>
                  <Badge className="bg-red-100 text-red-700">Critical</Badge>
                </div>
                <p className="text-sm text-red-600 mt-1">Patient Suresh Reddy - SpO2 dropped to 88%</p>
                <p className="text-xs text-red-500 mt-1">5 minutes ago</p>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-amber-700">GW-A-105: Medication Due</p>
                  <Badge className="bg-amber-100 text-amber-700">High</Badge>
                </div>
                <p className="text-sm text-amber-600 mt-1">Patient Meena Devi - IV antibiotics overdue by 30 mins</p>
                <p className="text-xs text-amber-500 mt-1">30 minutes ago</p>
              </div>
              <div className="p-3 bg-teal-50 border border-teal-100 rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-teal-700">PR-201: Discharge Ready</p>
                  <Badge className="bg-teal-100 text-teal-700">Info</Badge>
                </div>
                <p className="text-sm text-teal-600 mt-1">
                  Patient Amit Singh - All reports clear, ready for discharge
                </p>
                <p className="text-xs text-teal-500 mt-1">1 hour ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
