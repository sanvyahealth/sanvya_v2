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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  IndianRupee,
  Users,
  Stethoscope,
  UserRound,
  AlertCircle,
  TrendingUp,
  PieChart as PieChartIcon,
  Activity,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts";

// --- Demo Data ---

const analyticsStats = {
  totalAppointments: 1248,
  totalRevenue: 8500000,
  uniquePatients: 3450,
  activeDoctors: 42,
  totalStaff: 156,
  lowInventory: 12,
};

// Appointment Trend Data (Wavy Chart)
const appointmentTrendData = [
  { month: "Jan", pending: 20, confirmed: 150, completed: 140, cancelled: 5 },
  { month: "Feb", pending: 25, confirmed: 160, completed: 155, cancelled: 8 },
  { month: "Mar", pending: 18, confirmed: 180, completed: 175, cancelled: 4 },
  { month: "Apr", pending: 30, confirmed: 140, completed: 130, cancelled: 10 },
  { month: "May", pending: 22, confirmed: 190, completed: 185, cancelled: 6 },
  { month: "Jun", pending: 28, confirmed: 210, completed: 200, cancelled: 5 },
];

// Appointment Status Data (Circular Chart)
const appointmentStatusData = [
  { name: "Pending", value: 143, fill: "#f59e0b" }, // Amber
  { name: "Confirmed", value: 1030, fill: "#3b82f6" }, // Blue
  { name: "Completed", value: 987, fill: "#10b981" }, // Green
  { name: "Cancelled", value: 38, fill: "#ef4444" }, // Red
];

// Billing Trend Data (Wavy Chart)
const billingTrendData = [
  { month: "Jan", revenue: 1200000 },
  { month: "Feb", revenue: 1150000 },
  { month: "Mar", revenue: 1450000 },
  { month: "Apr", revenue: 1300000 },
  { month: "May", revenue: 1600000 },
  { month: "Jun", revenue: 1800000 },
];

// Doctor Workload Data
const doctorWorkloadData = [
  {
    id: 1,
    name: "Dr. Sarah Wilson",
    specialization: "Cardiology",
    total: 145,
    completed: 142,
  },
  {
    id: 2,
    name: "Dr. James Chen",
    specialization: "Pediatrics",
    total: 132,
    completed: 128,
  },
  {
    id: 3,
    name: "Dr. Emily Parker",
    specialization: "Neurology",
    total: 98,
    completed: 95,
  },
  {
    id: 4,
    name: "Dr. Michael Brown",
    specialization: "Orthopedics",
    total: 115,
    completed: 110,
  },
  {
    id: 5,
    name: "Dr. Lisa Taylor",
    specialization: "Dermatology",
    total: 160,
    completed: 158,
  },
];

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col">
      <Header title="Analytics" />

      <div className="flex-1 space-y-6 p-6">
        {/* --- Stats Cards Grid --- */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <StatsCard
            title="Total Appointments"
            value={analyticsStats.totalAppointments}
            icon={Calendar}
            iconColor="bg-blue-500"
            change="+12% from last month"
            changeType="positive"
          />
          <StatsCard
            title="Total Revenue"
            value={`₹${(analyticsStats.totalRevenue / 100000).toFixed(1)}L`}
            icon={IndianRupee}
            iconColor="bg-green-500"
            change="+8.5% growth"
            changeType="positive"
          />
          <StatsCard
            title="Unique Patients"
            value={analyticsStats.uniquePatients}
            icon={Users}
            iconColor="bg-purple-500"
            change="+150 new patients"
            changeType="positive"
          />
          <StatsCard
            title="Active Doctors"
            value={analyticsStats.activeDoctors}
            icon={Stethoscope}
            iconColor="bg-sky-500"
            change="Full capacity"
            changeType="neutral"
          />
          <StatsCard
            title="Total Staff"
            value={analyticsStats.totalStaff}
            icon={UserRound}
            iconColor="bg-indigo-500"
            change="Stable"
            changeType="neutral"
          />
          <StatsCard
            title="Low Inventory"
            value={analyticsStats.lowInventory}
            icon={AlertCircle}
            iconColor="bg-red-500"
            change="Action needed"
            changeType="negative"
          />
        </div>

        {/* --- Charts Section: Appointments --- */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Circular Chart: Appointment Status */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5 text-primary" />
                Appointment Status Distribution
              </CardTitle>
              <CardDescription>Breakdown by current status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="10%"
                    outerRadius="80%"
                    barSize={20}
                    data={appointmentStatusData}
                  >
                    <RadialBar
                      label={{
                        position: "insideStart",
                        fill: "white",
                      }}
                      background
                      dataKey="value"
                    />
                    <Legend
                      iconSize={10}
                      layout="vertical"
                      verticalAlign="middle"
                      wrapperStyle={{
                        right: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    />
                    <Tooltip
                      formatter={(value: number | undefined) => [
                        value ?? 0,
                        "Appointments",
                      ]}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                      }}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Wavy Chart: Appointment Trends */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Appointment Trends
              </CardTitle>
              <CardDescription>
                Monthly appointment volume by status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={appointmentTrendData}>
                    <defs>
                      <linearGradient
                        id="colorConfirmed"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3b82f6"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3b82f6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorCompleted"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="completed"
                      stroke="#10b981"
                      fillOpacity={1}
                      fill="url(#colorCompleted)"
                    />
                    <Area
                      type="monotone"
                      dataKey="confirmed"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorConfirmed)"
                    />
                    {/* Hiding others to avoid clutter or stacking them if preferred, using confirmed/completed as main metrics */}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* --- Billing Chart --- */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Total Revenue Trends
            </CardTitle>
            <CardDescription>
              Monthly billing and revenue overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={billingTrendData}>
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis
                    stroke="#64748b"
                    fontSize={12}
                    tickFormatter={(v) => `₹${v / 100000}L`}
                  />
                  <Tooltip
                    formatter={(value: number | undefined) => [
                      `₹${((value ?? 0) / 100000).toFixed(2)}L`,
                      "Revenue",
                    ]}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* --- Doctor Workload Table --- */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Doctor Workload</CardTitle>
            <CardDescription>Performance metrics per doctor</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doctor Name</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead className="text-right">
                    Total Appointments
                  </TableHead>
                  <TableHead className="text-right">Completed</TableHead>
                  <TableHead className="text-right">Completion Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doctorWorkloadData.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.name}</TableCell>
                    <TableCell>{doc.specialization}</TableCell>
                    <TableCell className="text-right">{doc.total}</TableCell>
                    <TableCell className="text-right">
                      {doc.completed}
                    </TableCell>
                    <TableCell className="text-right">
                      {Math.round((doc.completed / doc.total) * 100)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
