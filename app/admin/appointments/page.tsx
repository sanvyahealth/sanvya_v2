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
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Search,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  Edit,
  Trash2,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock as PendingIcon,
} from "lucide-react";
import {
  appointments,
  doctors,
  patients as patientsList,
} from "@/lib/demo-data";
import { format } from "date-fns";
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

// --- Stats & Chart Data ---
const pendingCount = appointments.filter((a) => a.status === "Pending").length;
const confirmedCount = appointments.filter(
  (a) => a.status === "Confirmed",
).length;
const completedCount = appointments.filter(
  (a) => a.status === "Completed",
).length;
const cancelledCount = appointments.filter(
  (a) => a.status === "Cancelled",
).length; // Assuming Cancelled exists or 0 if not in demo data

const statusData = [
  { name: "Pending", value: pendingCount },
  { name: "Confirmed", value: confirmedCount },
  { name: "Completed", value: completedCount },
  { name: "Cancelled", value: cancelledCount || 12 }, // Mocking cancelled if 0 for view
];

const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#ef4444"];

const trendData = [
  { day: "Day 1", appointments: 12 },
  { day: "Day 2", appointments: 18 },
  { day: "Day 3", appointments: 15 },
  { day: "Day 4", appointments: 25 },
  { day: "Day 5", appointments: 20 },
  { day: "Day 6", appointments: 30 },
  { day: "Day 7", appointments: 22 },
];

const statusColors = {
  Confirmed: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700",
  Completed: "bg-blue-100 text-blue-700",
};

export default function AppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [view, setView] = useState("list");

  // Filter Logic
  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const appointmentsOnSelectedDate = appointments.filter((apt) => {
    if (!date) return false;
    // VERY Basic date matching for demo - assuming demo data dates are roughly near.
    // In real app, proper date comparison needed.
    // For now, if demo data format matches "YYYY-MM-DD", we compare strings.
    const selectedStr = format(date, "yyyy-MM-dd");
    return apt.date === selectedStr;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <Header title="Appointment Management" />

      <main className="flex-1 space-y-8 p-6">
        {/* 1. Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Pending"
            value={pendingCount}
            icon={PendingIcon}
            iconColor="bg-amber-100 text-amber-600"
          />
          <StatsCard
            title="Confirmed"
            value={confirmedCount}
            icon={CheckCircle2}
            iconColor="bg-blue-100 text-blue-600"
          />
          <StatsCard
            title="Completed"
            value={completedCount}
            icon={CheckCircle2}
            iconColor="bg-green-100 text-green-600"
          />
          <StatsCard
            title="Cancelled"
            value={cancelledCount}
            icon={XCircle}
            iconColor="bg-red-100 text-red-600"
          />
        </div>

        {/* 2. Graphs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Status Distribution */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Appointment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Trend Graph */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Appointments Trend (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorApt" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#8884d8"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8884d8"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="appointments"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorApt)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 3. Main Content (Tabs) */}
        <Tabs defaultValue="list" className="w-full" onValueChange={setView}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>

            <div className="flex gap-2 w-full sm:w-auto">
              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" /> Add Appointment
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>New Appointment</DialogTitle>
                    <DialogDescription>
                      Schedule a new appointment for a patient.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label>Patient</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select patient" />
                        </SelectTrigger>
                        <SelectContent>
                          {patientsList.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                              {p.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Doctor</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select doctor" />
                        </SelectTrigger>
                        <SelectContent>
                          {doctors.map((d) => (
                            <SelectItem key={d.id} value={d.id}>
                              {d.name} ({d.specialization})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label>Time</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "09:00 AM",
                              "10:00 AM",
                              "11:00 AM",
                              "02:00 PM",
                              "03:00 PM",
                              "04:00 PM",
                            ].map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => setIsAddOpen(false)}>
                      Schedule
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <TabsContent value="list" className="mt-0">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <div className="relative max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by patient or doctor..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map((apt) => (
                        <TableRow key={apt.id}>
                          <TableCell className="font-medium">
                            {apt.id}
                          </TableCell>
                          <TableCell>{apt.patientName}</TableCell>
                          <TableCell>{apt.doctorName}</TableCell>
                          <TableCell>
                            <div className="flex flex-col text-xs">
                              <span className="font-medium">{apt.date}</span>
                              <span className="text-muted-foreground">
                                {apt.time}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className={
                                statusColors[
                                  apt.status as keyof typeof statusColors
                                ]
                              }
                            >
                              {apt.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No appointments found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="mt-0">
            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="border rounded-md p-4 bg-muted/20 w-fit h-fit">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border bg-card"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-4">
                      Appointments for{" "}
                      {date ? format(date, "PPP") : "Selected Date"}
                    </h3>
                    {appointmentsOnSelectedDate.length > 0 ? (
                      <div className="space-y-4">
                        {appointmentsOnSelectedDate.map((apt) => (
                          <div
                            key={apt.id}
                            className="flex items-center justify-between p-4 border rounded-lg bg-card hover:shadow-sm"
                          >
                            <div className="flex items-center gap-4">
                              <div className="p-2 bg-primary/10 rounded-full">
                                <Clock className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{apt.time}</p>
                                <p className="text-sm text-muted-foreground">
                                  {apt.patientName} with {apt.doctorName}
                                </p>
                              </div>
                            </div>
                            <Badge
                              variant="secondary"
                              className={
                                statusColors[
                                  apt.status as keyof typeof statusColors
                                ]
                              }
                            >
                              {apt.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-48 text-muted-foreground border-2 border-dashed rounded-lg">
                        <CalendarIcon className="h-8 w-8 mb-2" />
                        <p>No appointments scheduled for this date.</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
