"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { StatsCard } from "@/components/stats-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  UserPlus,
  Stethoscope,
  Users,
  Calendar,
  UserCog,
  ShieldAlert,
  BarChart3,
  Share2,
  FileText,
  FileSpreadsheet,
  Download,
  Building2,
  List,
  IndianRupee,
  Clock,
  CheckCircle2,
  AlertCircle,
  Pill,
  FlaskConical,
  PackageMinus,
  Search,
  Eye,
  MoreVertical,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { appointments } from "@/lib/demo-data";

// --- Mock Data for Charts ---

const appointmentStatusData = [
  { name: "Pending", value: 12, color: "#f59e0b" },
  { name: "Confirmed", value: 25, color: "#3b82f6" },
  { name: "Cancelled", value: 5, color: "#ef4444" },
  { name: "Completed", value: 45, color: "#10b981" },
];

const revenueMethodData = [
  { name: "Mon", Cash: 4000, Card: 2400, UPI: 2400 },
  { name: "Tue", Cash: 3000, Card: 1398, UPI: 2210 },
  { name: "Wed", Cash: 2000, Card: 9800, UPI: 2290 },
  { name: "Thu", Cash: 2780, Card: 3908, UPI: 2000 },
  { name: "Fri", Cash: 1890, Card: 4800, UPI: 2181 },
  { name: "Sat", Cash: 2390, Card: 3800, UPI: 2500 },
  { name: "Sun", Cash: 3490, Card: 4300, UPI: 2100 },
];

const appointmentsPerDayData = [
  { day: "Mon", appointments: 45 },
  { day: "Tue", appointments: 52 },
  { day: "Wed", appointments: 38 },
  { day: "Thu", appointments: 65 },
  { day: "Fri", appointments: 48 },
  { day: "Sat", appointments: 55 },
  { day: "Sun", appointments: 20 },
];

const doctorPerformanceData = [
  { name: "Dr. Anil", score: 95 },
  { name: "Dr. Meera", score: 88 },
  { name: "Dr. Suresh", score: 92 },
  { name: "Dr. Ramesh", score: 85 },
  { name: "Dr. Kavita", score: 78 },
];

const patientDemographicsData = [
  { name: "Male", value: 550, color: "#3b82f6" },
  { name: "Female", value: 450, color: "#ec4899" },
];

// --- Small Cards Data ---
const smallCards = [
  { title: "Add Patient", icon: UserPlus, color: "text-blue-500" },
  { title: "Add Doctor", icon: Stethoscope, color: "text-green-500" },
  { title: "Add Staff", icon: Users, color: "text-purple-500" },
  { title: "Appointments", icon: Calendar, color: "text-orange-500" },
  { title: "User Mgmt", icon: UserCog, color: "text-indigo-500" },
  { title: "Security", icon: ShieldAlert, color: "text-red-500" },
  { title: "Analytics", icon: BarChart3, color: "text-pink-500" },
  { title: "Ref. Doctors", icon: Share2, color: "text-cyan-500" },
  { title: "Referred List", icon: List, color: "text-teal-500" },
  { title: "Daily Report", icon: FileText, color: "text-yellow-500" },
  { title: "Monthly Rpt", icon: FileSpreadsheet, color: "text-lime-500" },
  { title: "Export Center", icon: Download, color: "text-gray-500" },
  { title: "IPD Admin", icon: Building2, color: "text-amber-500" },
];

// --- Normal Cards Data ---
const normalCards = [
  {
    title: "Total Patients",
    value: "1,250",
    change: "+12%",
    changeType: "positive",
    icon: Users,
    iconColor: "bg-blue-100 text-blue-600",
  },
  {
    title: "Total Doctors",
    value: "45",
    change: "+2",
    changeType: "positive",
    icon: Stethoscope,
    iconColor: "bg-green-100 text-green-600",
  },
  {
    title: "Total Appointments",
    value: "3,450",
    change: "+8%",
    changeType: "positive",
    icon: Calendar,
    iconColor: "bg-purple-100 text-purple-600",
  },
  {
    title: "Total Revenue",
    value: "₹45.2L",
    change: "+15%",
    changeType: "positive",
    icon: IndianRupee,
    iconColor: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Pending Appts",
    value: "12",
    change: "Needs action",
    changeType: "negative",
    icon: Clock,
    iconColor: "bg-orange-100 text-orange-600",
  },
  {
    title: "Completed Appts",
    value: "48",
    change: "Today",
    changeType: "neutral",
    icon: CheckCircle2,
    iconColor: "bg-teal-100 text-teal-600",
  },
  {
    title: "Total Staff",
    value: "128",
    change: "0",
    changeType: "neutral",
    icon: Users,
    iconColor: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Unpaid Bills",
    value: "32",
    change: "₹4.5L",
    changeType: "negative",
    icon: AlertCircle,
    iconColor: "bg-red-100 text-red-600",
  },
  {
    title: "Prescriptions",
    value: "156",
    change: "Today",
    changeType: "neutral",
    icon: Pill,
    iconColor: "bg-pink-100 text-pink-600",
  },
  {
    title: "Lab Reports",
    value: "42",
    change: "8 Pending",
    changeType: "neutral",
    icon: FlaskConical,
    iconColor: "bg-cyan-100 text-cyan-600",
  },
  {
    title: "Low Stock",
    value: "5",
    change: "Urgent",
    changeType: "negative",
    icon: PackageMinus,
    iconColor: "bg-rose-100 text-rose-600",
  },
];

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAppointments = appointments.filter(
    (app) =>
      app.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50 ">
      <Header title="Admin Dashboard" />

      <main className="flex-1 space-y-8 p-6">
        {/* 1. Small Action Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 ">
          {smallCards.map((card, index) => (
            <Card
              key={index}
              className="hover:shadow-md transition-shadow cursor-pointer border-none shadow-sm"
            >
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <div className={`p-2 rounded-full bg-gray-100 ${card.color}`}>
                  <card.icon className="w-5 h-5 " />
                </div>
                <span className="text-xs font-semibold text-gray-700 leading-tight">
                  {card.title}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 2. Normal Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
          {normalCards.map((card, index) => (
            <StatsCard
              key={index}
              title={card.title}
              value={card.value}
              change={card.change}
              changeType={card.changeType as any}
              icon={card.icon}
              iconColor={card.iconColor}
            />
          ))}
        </div>

        {/* 3. Graphs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Appointments by Status - Pie Chart */}
          <Card className="col-span-1 border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Appointments by Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={appointmentStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {appointmentStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Revenue by Method - Line Chart */}
          <Card className="col-span-1 lg:col-span-2 border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Revenue by Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueMethodData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="Cash"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="Card"
                      stroke="#82ca9d"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="UPI"
                      stroke="#ffc658"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Appointments Per Day - Bar/Area Chart */}
          <Card className="col-span-1 border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Appointments Per Day</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={appointmentsPerDayData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="appointments"
                      fill="#6366f1"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Doctor Performance - Bar Chart */}
          <Card className="col-span-1 border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Doctor Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={doctorPerformanceData}
                    layout="vertical"
                    margin={{ left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#14b8a6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Patient Demographics - Pie Chart */}
          <Card className="col-span-1 border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Patient Demographics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={patientDemographicsData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label
                    >
                      {patientDemographicsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 4. Recent Appointments Table */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Appointments</CardTitle>
              <CardDescription>
                Overview of latest scheduled appointments
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search appointments..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((apt) => (
                      <TableRow key={apt.id}>
                        <TableCell className="font-medium">{apt.id}</TableCell>
                        <TableCell>{apt.patientName}</TableCell>
                        <TableCell>{apt.doctorName}</TableCell>
                        <TableCell>{apt.date}</TableCell>
                        <TableCell>{apt.time}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              apt.status === "Confirmed"
                                ? "default" // Using default (primary) for confirmed which is usually good
                                : apt.status === "Pending"
                                  ? "secondary" // Secondary (often muted/yellowish) for pending
                                  : apt.status === "Cancelled"
                                    ? "destructive" // Destructive (red) for cancelled
                                    : "outline"
                            }
                            className={
                              apt.status === "Confirmed"
                                ? "bg-green-100 text-green-700 hover:bg-green-100 border-green-200"
                                : apt.status === "Pending"
                                  ? "bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200"
                                  : ""
                            }
                          >
                            {apt.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No appointments found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
