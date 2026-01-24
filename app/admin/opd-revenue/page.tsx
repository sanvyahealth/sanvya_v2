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
  Activity,
  BarChart3,
  Calendar,
  CreditCard,
  DollarSign,
  FileText,
  IndianRupee,
  TrendingDown,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";

// --- Demo Data ---

const statsData = [
  {
    title: "Total OPD Patients",
    value: "12,450",
    change: "+15% vs last month",
    changeType: "positive",
    icon: Users,
    iconColor: "bg-blue-500",
  },
  {
    title: "Total OPD Revenue",
    value: "₹45.2L",
    change: "+8% vs last month",
    changeType: "positive",
    icon: IndianRupee,
    iconColor: "bg-green-500",
  },
  {
    title: "OPD Appointments",
    value: "1,240",
    change: "124 today",
    changeType: "neutral",
    icon: Calendar,
    iconColor: "bg-purple-500",
  },
  {
    title: "Avg. Visit Cost",
    value: "₹850",
    change: "+₹50 vs last month",
    changeType: "positive",
    icon: DollarSign,
    iconColor: "bg-amber-500",
  },
  {
    title: "Paid Revenue",
    value: "₹42.8L",
    change: "94% collection rate",
    changeType: "positive",
    icon: CreditCard,
    iconColor: "bg-emerald-500",
  },
  {
    title: "Unpaid Revenue",
    value: "₹2.4L",
    change: "-2% from last month",
    changeType: "positive", // Lower unpaid is good
    icon: TrendingDown,
    iconColor: "bg-red-500",
  },
  {
    title: "Total Bills Generated",
    value: "3,850",
    change: "+120 this week",
    changeType: "neutral",
    icon: FileText,
    iconColor: "bg-indigo-500",
  },
  {
    title: "Payment Rate",
    value: "94.8%",
    change: "+1.2% improvement",
    changeType: "positive",
    icon: UserCheck,
    iconColor: "bg-cyan-500",
  },
] as const;

const revenueData = [
  { month: "Jan", revenue: 3800000 },
  { month: "Feb", revenue: 4200000 },
  { month: "Mar", revenue: 3900000 },
  { month: "Apr", revenue: 4500000 },
  { month: "May", revenue: 4800000 },
  { month: "Jun", revenue: 4520000 },
];

const appointmentData = [
  { month: "Jan", appointments: 1100 },
  { month: "Feb", appointments: 1250 },
  { month: "Mar", appointments: 1150 },
  { month: "Apr", appointments: 1400 },
  { month: "May", appointments: 1550 },
  { month: "Jun", appointments: 1480 },
];

const deptPerformanceData = [
  { dept: "Cardiology", patients: 450, revenue: 1500000 },
  { dept: "Orthopedics", patients: 380, revenue: 1250000 },
  { dept: "Neurology", patients: 220, revenue: 980000 },
  { dept: "Pediatrics", patients: 550, revenue: 650000 },
  { dept: "Dermatology", patients: 310, revenue: 420000 },
];

const paymentStatusData = [
  { status: "Paid", transactions: 2850, amount: 4280000, percentage: 94 },
  { status: "Pending", transactions: 150, amount: 180000, percentage: 4 },
  { status: "Failed", transactions: 45, amount: 60000, percentage: 2 },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function OPDRevenuePage() {
  return (
    <div className="flex flex-col">
      <Header title="OPD Revenue" />

      <main className="flex-1 p-6 space-y-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header Section */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Revenue Overview
            </h1>
            <p className="text-muted-foreground">
              Detailed breakdown of Outpatient Department financials and
              performance.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <StatsCard
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  changeType={stat.changeType}
                  icon={stat.icon}
                  iconColor={stat.iconColor}
                />
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Line Chart: Monthly Revenue */}
            <motion.div variants={itemVariants} className="w-full">
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Monthly OPD Revenue
                  </CardTitle>
                  <CardDescription>
                    Revenue trends over the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData}>
                        <defs>
                          <linearGradient
                            id="colorRevenue"
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
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorRevenue)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Bar Chart: Monthly Appointments */}
            <motion.div variants={itemVariants} className="w-full">
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    Monthly OPD Appointments
                  </CardTitle>
                  <CardDescription>
                    Patient volume trends over the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={appointmentData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip
                          cursor={{ fill: "transparent" }}
                          contentStyle={{
                            borderRadius: "8px",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                        <Bar
                          dataKey="appointments"
                          fill="#3b82f6"
                          radius={[4, 4, 0, 0]}
                          barSize={40}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Tables Section */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Table 1: Performance by Dept */}
            <motion.div variants={itemVariants} className="h-full">
              <Card className="border-border shadow-sm h-full">
                <CardHeader>
                  <CardTitle>OPD Performance by Dept</CardTitle>
                  <CardDescription>
                    Patient count and revenue contribution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead className="text-right">Patients</TableHead>
                        <TableHead className="text-right">Revenue</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {deptPerformanceData.map((dept, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">
                            {dept.dept}
                          </TableCell>
                          <TableCell className="text-right">
                            {dept.patients}
                          </TableCell>
                          <TableCell className="text-right text-green-600 font-medium">
                            ₹{(dept.revenue / 100000).toFixed(2)}L
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>

            {/* Table 2: Revenue by Payment Status */}
            <motion.div variants={itemVariants} className="h-full">
              <Card className="border-border shadow-sm h-full">
                <CardHeader>
                  <CardTitle>Revenue by Payment Status</CardTitle>
                  <CardDescription>
                    Breakdown of transaction statuses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">
                          Transactions
                        </TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right">%</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentStatusData.map((status, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                status.status === "Paid"
                                  ? "bg-green-100 text-green-800"
                                  : status.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {status.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            {status.transactions}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            ₹{(status.amount / 100000).toFixed(2)}L
                          </TableCell>
                          <TableCell className="text-right">
                            {status.percentage}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
