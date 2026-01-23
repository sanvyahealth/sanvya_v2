"use client";

import { Header } from "@/components/header";
import { StatsCard } from "@/components/stats-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  BedDouble,
  Calendar,
  IndianRupee,
  TrendingUp,
  Activity,
  Building2,
  Clock,
} from "lucide-react";
import {
  patients,
  departments,
  appointments,
  analyticsData,
} from "@/lib/demo-data";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 4200000, patients: 320 },
  { month: "Feb", revenue: 3800000, patients: 290 },
  { month: "Mar", revenue: 4500000, patients: 350 },
  { month: "Apr", revenue: 4100000, patients: 310 },
  { month: "May", revenue: 4800000, patients: 380 },
  { month: "Jun", revenue: 4520000, patients: 345 },
];

const departmentData = departments.map((d) => ({
  name: d.name,
  occupancy: d.occupancy,
}));

const statusColors = {
  Admitted: "bg-blue-100 text-blue-700",
  Discharged: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Confirmed: "bg-green-100 text-green-700",
};

const pieColors = [
  "#6366f1",
  "#14b8a6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
];

export default function AdminDashboard() {
  return (
    <div className="flex flex-col">
      <Header title="Admin Dashboard" />

      <div className="flex-1 space-y-6 p-6">
        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Patients"
            value={analyticsData.totalPatients.toLocaleString()}
            change="+12.5% from last month"
            changeType="positive"
            icon={Users}
            iconColor="bg-primary"
          />
          <StatsCard
            title="Admitted Today"
            value={analyticsData.admittedPatients}
            change="+8 from yesterday"
            changeType="positive"
            icon={BedDouble}
            iconColor="bg-primary"
          />
          <StatsCard
            title="Appointments"
            value={analyticsData.todayAppointments}
            change="12 pending confirmation"
            changeType="neutral"
            icon={Calendar}
            iconColor="bg-amber-500"
          />
          <StatsCard
            title="Revenue (MTD)"
            value={`₹${(analyticsData.totalRevenue / 100000).toFixed(1)}L`}
            change={`+${analyticsData.monthlyGrowth}% growth`}
            changeType="positive"
            icon={IndianRupee}
            iconColor="bg-green-500"
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Revenue Chart */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Revenue Overview
              </CardTitle>
              <CardDescription>
                Monthly revenue and patient admissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                    <YAxis
                      stroke="#64748b"
                      fontSize={12}
                      tickFormatter={(v) => `₹${v / 100000}L`}
                    />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        name === "revenue"
                          ? `₹${(value / 100000).toFixed(1)}L`
                          : value.toString(),
                        name === "revenue" ? "Revenue" : "Patients",
                      ]}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#6366f1"
                      fill="#6366f1"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Department Occupancy */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-secondary" />
                Department Occupancy
              </CardTitle>
              <CardDescription>
                Bed occupancy rate by department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      stroke="#64748b"
                      fontSize={12}
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      stroke="#64748b"
                      fontSize={11}
                      width={90}
                    />
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, "Occupancy"]}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                      }}
                    />
                    <Bar
                      dataKey="occupancy"
                      fill="#14b8a6"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Admissions */}
          <Card className="border-border lg:col-span-2 w-full min-w-0 max-w-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Admissions</CardTitle>
                <CardDescription>
                  Latest patients admitted to the hospital
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Ward</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patients.slice(0, 5).map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-mono text-xs">
                          {patient.id}
                        </TableCell>
                        <TableCell className="font-medium">
                          {patient.name}
                        </TableCell>
                        <TableCell>{patient.department}</TableCell>
                        <TableCell>{patient.ward}</TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              statusColors[
                                patient.status as keyof typeof statusColors
                              ]
                            }
                          >
                            {patient.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Today's Appointments */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                Today&apos;s Appointments
              </CardTitle>
              <CardDescription>
                {appointments.length} scheduled for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.slice(0, 4).map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center gap-4 rounded-lg border border-border bg-card p-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{apt.patientName}</p>
                      <p className="text-xs text-muted-foreground">
                        {apt.doctorName} • {apt.time}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={
                        statusColors[apt.status as keyof typeof statusColors]
                      }
                    >
                      {apt.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Department Stats */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Department Overview</CardTitle>
            <CardDescription>Quick stats for all departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {departments.slice(0, 4).map((dept) => (
                <div
                  key={dept.id}
                  className="rounded-lg border border-border bg-muted/30 p-4"
                >
                  <h4 className="font-medium text-foreground">{dept.name}</h4>
                  <p className="text-xs text-muted-foreground">{dept.head}</p>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Occupancy</span>
                      <span className="font-medium">{dept.occupancy}%</span>
                    </div>
                    <Progress value={dept.occupancy} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{dept.beds} beds</span>
                      <span>{dept.staff} staff</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
