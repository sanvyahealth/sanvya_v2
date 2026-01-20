"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, FileText, Check, X } from "lucide-react"
import { appointments } from "@/lib/demo-data"

const statusColors = {
  Confirmed: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Completed: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
}

export default function DoctorAppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredAppointments = appointments.filter((apt) => statusFilter === "all" || apt.status === statusFilter)

  return (
    <div className="flex flex-col">
      <Header title="My Appointments" />

      <div className="flex-1 space-y-6 p-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Calendar */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
              <CardDescription>Select a date to view appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            </CardContent>
          </Card>

          {/* Appointments List */}
          <Card className="border-border lg:col-span-2">
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Appointments</CardTitle>
                  <CardDescription>{date?.toLocaleDateString("en-IN", { dateStyle: "full" })}</CardDescription>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-primary/10">
                          <span className="text-lg font-bold text-primary">{apt.time.split(":")[0]}</span>
                          <span className="text-xs text-primary">{apt.time.split(" ")[1]}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <p className="font-semibold text-foreground">{apt.patientName}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{apt.patientId}</p>
                          <div className="mt-2 flex items-center gap-4">
                            <Badge variant="outline">{apt.type}</Badge>
                            <Badge
                              variant="secondary"
                              className={statusColors[apt.status as keyof typeof statusColors]}
                            >
                              {apt.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Button variant="outline" size="sm" className="flex-shrink-0">
                          <FileText className="mr-1 h-4 w-4" />
                          Notes
                        </Button>
                        {apt.status === "Pending" && (
                          <>
                            <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                              <Check className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                              <X className="h-4 w-4 text-red-600" />
                            </Button>
                          </>
                        )}
                        {apt.status === "Confirmed" && <Button size="sm">Start Consultation</Button>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
