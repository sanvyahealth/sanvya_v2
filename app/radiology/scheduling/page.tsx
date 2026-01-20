"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, Clock, Plus } from "lucide-react"

const scheduleData = [
  {
    time: "08:00",
    ct1: { patient: "Rajesh Kumar", scan: "CT Chest", priority: "urgent" },
    mri: null,
    xray1: { patient: "Priya Patel", scan: "X-Ray Chest", priority: "normal" },
    xray2: null,
    us1: { patient: "Amit Singh", scan: "USG Abdomen", priority: "normal" },
  },
  {
    time: "08:30",
    ct1: null,
    mri: { patient: "Lakshmi Nair", scan: "MRI Brain", priority: "urgent" },
    xray1: { patient: "Suresh Reddy", scan: "X-Ray Knee", priority: "normal" },
    xray2: { patient: "Meena Devi", scan: "X-Ray Spine", priority: "normal" },
    us1: null,
  },
  {
    time: "09:00",
    ct1: { patient: "Vijay Malhotra", scan: "CT Abdomen", priority: "normal" },
    mri: null,
    xray1: null,
    xray2: { patient: "Anita Sharma", scan: "X-Ray Hand", priority: "normal" },
    us1: { patient: "Ravi Kumar", scan: "Echo", priority: "urgent" },
  },
  {
    time: "09:30",
    ct1: null,
    mri: { patient: "Sunita Gupta", scan: "MRI Spine", priority: "normal" },
    xray1: { patient: "Mohan Das", scan: "X-Ray Chest", priority: "normal" },
    xray2: null,
    us1: { patient: "Kavita Nair", scan: "USG Pelvis", priority: "normal" },
  },
  {
    time: "10:00",
    ct1: { patient: "Farhan Khan", scan: "CT Brain", priority: "urgent" },
    mri: null,
    xray1: { patient: "Deepa Joshi", scan: "X-Ray Ankle", priority: "normal" },
    xray2: { patient: "Ramesh Iyer", scan: "X-Ray Shoulder", priority: "normal" },
    us1: null,
  },
  {
    time: "10:30",
    ct1: null,
    mri: { patient: "Geeta Rani", scan: "MRI Knee", priority: "normal" },
    xray1: null,
    xray2: null,
    us1: { patient: "Sanjay Gupta", scan: "Doppler", priority: "urgent" },
  },
  {
    time: "11:00",
    ct1: { patient: "Anil Kapoor", scan: "HRCT Chest", priority: "normal" },
    mri: null,
    xray1: { patient: "Neha Singh", scan: "X-Ray Chest", priority: "normal" },
    xray2: { patient: "Vikram Joshi", scan: "X-Ray Pelvis", priority: "normal" },
    us1: { patient: "Pooja Sharma", scan: "USG Thyroid", priority: "normal" },
  },
  {
    time: "11:30",
    ct1: null,
    mri: { patient: "Rahul Verma", scan: "MRI Shoulder", priority: "normal" },
    xray1: null,
    xray2: null,
    us1: null,
  },
]

const equipment = ["CT Scanner 1", "MRI Machine", "X-Ray Room 1", "X-Ray Room 2", "Ultrasound 1"]

export default function SchedulingPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  const renderSlot = (slot: { patient: string; scan: string; priority: string } | null) => {
    if (!slot) {
      return (
        <div className="h-full min-h-[60px] rounded-lg border-2 border-dashed border-border bg-muted/30 p-2 flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Available</span>
        </div>
      )
    }
    return (
      <div
        className={`h-full min-h-[60px] rounded-lg p-2 ${slot.priority === "urgent" ? "bg-red-50 border border-red-200" : "bg-primary/5 border border-primary/20"}`}
      >
        <p className="text-xs font-medium text-foreground truncate">{slot.patient}</p>
        <p className="text-xs text-muted-foreground truncate">{slot.scan}</p>
        {slot.priority === "urgent" && (
          <Badge variant="destructive" className="mt-1 text-[10px] px-1 py-0">
            Urgent
          </Badge>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Scan Scheduling</h1>
          <p className="text-muted-foreground">Manage imaging appointments and equipment</p>
        </div>
        <div className="flex gap-3">
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-[180px]"
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Schedule Scan
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule New Scan</DialogTitle>
                <DialogDescription>Book a scan appointment</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Patient ID</Label>
                  <Input placeholder="Enter patient ID or search" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Scan Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select scan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ct-chest">CT Chest</SelectItem>
                        <SelectItem value="ct-abdomen">CT Abdomen</SelectItem>
                        <SelectItem value="mri-brain">MRI Brain</SelectItem>
                        <SelectItem value="mri-spine">MRI Spine</SelectItem>
                        <SelectItem value="xray-chest">X-Ray Chest</SelectItem>
                        <SelectItem value="usg-abdomen">USG Abdomen</SelectItem>
                        <SelectItem value="echo">Echocardiogram</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Equipment</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select equipment" />
                      </SelectTrigger>
                      <SelectContent>
                        {equipment.map((eq) => (
                          <SelectItem key={eq} value={eq}>
                            {eq}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input type="time" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="stat">STAT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Clinical Notes</Label>
                  <Input placeholder="Reason for scan, special instructions..." />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button>Schedule</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Schedule Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today's Schedule -{" "}
            {new Date(selectedDate).toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </CardTitle>
          <CardDescription>Equipment and time slot allocation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-border bg-muted/50 p-2 text-left text-sm font-medium w-20">Time</th>
                  <th className="border border-border bg-muted/50 p-2 text-center text-sm font-medium min-w-[140px]">
                    CT Scanner 1
                  </th>
                  <th className="border border-border bg-muted/50 p-2 text-center text-sm font-medium min-w-[140px]">
                    MRI Machine
                  </th>
                  <th className="border border-border bg-muted/50 p-2 text-center text-sm font-medium min-w-[140px]">
                    X-Ray Room 1
                  </th>
                  <th className="border border-border bg-muted/50 p-2 text-center text-sm font-medium min-w-[140px]">
                    X-Ray Room 2
                  </th>
                  <th className="border border-border bg-muted/50 p-2 text-center text-sm font-medium min-w-[140px]">
                    Ultrasound 1
                  </th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((row) => (
                  <tr key={row.time}>
                    <td className="border border-border bg-muted/30 p-2 text-sm font-medium">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {row.time}
                      </div>
                    </td>
                    <td className="border border-border p-1">{renderSlot(row.ct1)}</td>
                    <td className="border border-border p-1">{renderSlot(row.mri)}</td>
                    <td className="border border-border p-1">{renderSlot(row.xray1)}</td>
                    <td className="border border-border p-1">{renderSlot(row.xray2)}</td>
                    <td className="border border-border p-1">{renderSlot(row.us1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border-2 border-dashed border-border bg-muted/30" />
          <span className="text-sm text-muted-foreground">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-primary/10 border border-primary/20" />
          <span className="text-sm text-muted-foreground">Scheduled</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-red-50 border border-red-200" />
          <span className="text-sm text-muted-foreground">Urgent</span>
        </div>
      </div>
    </div>
  )
}
