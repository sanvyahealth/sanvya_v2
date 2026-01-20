"use client"

import { Header } from "@/components/header"
import { StatsCard } from "@/components/stats-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Users, Clock, Stethoscope, FileText, Heart, Thermometer, Droplets } from "lucide-react"
import { appointments, patients } from "@/lib/demo-data"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const weeklyPatients = [
  { day: "Mon", patients: 12 },
  { day: "Tue", patients: 15 },
  { day: "Wed", patients: 8 },
  { day: "Thu", patients: 18 },
  { day: "Fri", patients: 14 },
  { day: "Sat", patients: 10 },
]

const statusColors = {
  Confirmed: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
}

// Filter appointments for current doctor
const doctorAppointments = appointments.filter((apt) => apt.doctorName === "Dr. Anil Kapoor")
const doctorPatients = patients.filter((p) => p.doctor === "Dr. Anil Kapoor")

export default function DoctorDashboard() {
  return (
    <div className="flex flex-col">
      <Header title="Doctor Dashboard" />

      <div className="flex-1 space-y-6 p-6">
        {/* Welcome Section */}
        <Card className="border-border bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">AK</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Good Morning, Dr. Kapoor</h2>
                <p className="text-muted-foreground">You have {doctorAppointments.length} appointments today</p>
              </div>
            </div>
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              View Schedule
            </Button>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Today's Appointments"
            value={doctorAppointments.length}
            change="2 pending confirmation"
            changeType="neutral"
            icon={Calendar}
            iconColor="bg-primary"
          />
          <StatsCard
            title="My Patients"
            value={doctorPatients.length}
            change="Currently admitted"
            changeType="neutral"
            icon={Users}
            iconColor="bg-secondary"
          />
          <StatsCard
            title="Surgeries This Week"
            value={2}
            change="1 scheduled for tomorrow"
            changeType="neutral"
            icon={Stethoscope}
            iconColor="bg-amber-500"
          />
          <StatsCard
            title="Lab Reports"
            value={5}
            change="3 pending review"
            changeType="neutral"
            icon={FileText}
            iconColor="bg-green-500"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Today's Appointments */}
          <Card className="border-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Today&apos;s Appointments
              </CardTitle>
              <CardDescription>Your scheduled appointments for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-sm font-semibold text-primary">{apt.time.split(" ")[0]}</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{apt.patientName}</p>
                        <p className="text-sm text-muted-foreground">
                          {apt.type} • {apt.department}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className={statusColors[apt.status as keyof typeof statusColors]}>
                        {apt.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Overview */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Weekly Overview</CardTitle>
              <CardDescription>Patients seen this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyPatients}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                    <Area type="monotone" dataKey="patients" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Patients */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>My Current Patients</CardTitle>
              <CardDescription>Patients under your care</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {patients.slice(0, 3).map((patient) => (
                <Card key={patient.id} className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-secondary/10 text-secondary">
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-xs text-muted-foreground">{patient.id}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{patient.ward}</Badge>
                    </div>

                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                      <div className="flex items-center gap-1 rounded bg-red-50 px-2 py-1">
                        <Heart className="h-3 w-3 text-red-500" />
                        <span className="text-xs font-medium">72 bpm</span>
                      </div>
                      <div className="flex items-center gap-1 rounded bg-amber-50 px-2 py-1">
                        <Thermometer className="h-3 w-3 text-amber-500" />
                        <span className="text-xs font-medium">98.6°F</span>
                      </div>
                      <div className="flex items-center gap-1 rounded bg-blue-50 px-2 py-1">
                        <Droplets className="h-3 w-3 text-blue-500" />
                        <span className="text-xs font-medium">{patient.bloodGroup}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        Records
                      </Button>
                      <Button size="sm" className="flex-1">
                        Vitals
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
