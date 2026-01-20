"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Clock, Edit } from "lucide-react"

const weekDays = [
  { day: "Monday", slots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"], active: true },
  { day: "Tuesday", slots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"], active: true },
  { day: "Wednesday", slots: ["9:00 AM - 12:00 PM"], active: true },
  { day: "Thursday", slots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"], active: true },
  { day: "Friday", slots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"], active: true },
  { day: "Saturday", slots: ["9:00 AM - 1:00 PM"], active: true },
  { day: "Sunday", slots: [], active: false },
]

export default function SchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col">
      <Header title="My Schedule" />

      <div className="flex-1 space-y-6 p-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view or edit schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            </CardContent>
          </Card>

          <Card className="border-border lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Weekly Schedule</CardTitle>
                <CardDescription>Your regular consultation hours</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit Schedule
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weekDays.map((item) => (
                  <div key={item.day} className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-24">
                        <p className="font-medium">{item.day}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.slots.length > 0 ? (
                          item.slots.map((slot) => (
                            <Badge key={slot} variant="secondary" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {slot}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-muted-foreground">Not Available</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`switch-${item.day}`} className="sr-only">
                        Toggle {item.day}
                      </Label>
                      <Switch id={`switch-${item.day}`} checked={item.active} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Leave Management</CardTitle>
            <CardDescription>Manage your leave and unavailability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Upcoming Leave</p>
                <p className="text-sm text-muted-foreground">No upcoming leave scheduled</p>
              </div>
              <Button>Apply for Leave</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
