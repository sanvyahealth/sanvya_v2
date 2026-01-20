"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, ClipboardList, Bell, MessageSquare, Plus, Phone } from "lucide-react"

export default function NursingStationPage() {
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<any | null>(null)

  const nursingTasks = [
    {
      id: "NT001",
      patient: "Rajesh Kumar",
      bed: "GW-A-101",
      task: "Medication administration - Amoxicillin",
      priority: "High",
      dueTime: "10:00 AM",
      status: "Pending",
      assignedTo: "Nurse Priya",
    },
    {
      id: "NT002",
      patient: "Priya Patel",
      bed: "ICU-001",
      task: "Vitals monitoring - Hourly",
      priority: "Critical",
      dueTime: "10:30 AM",
      status: "Pending",
      assignedTo: "Nurse Anita",
    },
    {
      id: "NT003",
      patient: "Amit Singh",
      bed: "PR-201",
      task: "Wound dressing change",
      priority: "Normal",
      dueTime: "11:00 AM",
      status: "Completed",
      assignedTo: "Nurse Priya",
    },
    {
      id: "NT004",
      patient: "Meena Devi",
      bed: "GW-B-105",
      task: "Blood sugar monitoring",
      priority: "High",
      dueTime: "10:00 AM",
      status: "Overdue",
      assignedTo: "Nurse Kavita",
    },
    {
      id: "NT005",
      patient: "Suresh Reddy",
      bed: "ICU-003",
      task: "IV fluid replacement",
      priority: "Critical",
      dueTime: "09:30 AM",
      status: "In Progress",
      assignedTo: "Nurse Anita",
    },
  ]

  const nursingNotes = [
    {
      id: "NN001",
      patient: "Rajesh Kumar",
      bed: "GW-A-101",
      note: "Patient resting comfortably. Vitals stable. No complaints of pain.",
      nurse: "Nurse Priya",
      time: "9:00 AM",
    },
    {
      id: "NN002",
      patient: "Priya Patel",
      bed: "ICU-001",
      note: "Patient anxious about surgery outcome. Provided emotional support and explained recovery process.",
      nurse: "Nurse Anita",
      time: "8:30 AM",
    },
    {
      id: "NN003",
      patient: "Suresh Reddy",
      bed: "ICU-003",
      note: "SpO2 levels fluctuating. Increased oxygen flow. Notified Dr. Gupta.",
      nurse: "Nurse Anita",
      time: "8:00 AM",
    },
  ]

  const callRequests = [
    {
      id: "CR001",
      bed: "GW-A-103",
      patient: "Ramesh Yadav",
      reason: "Pain medication",
      time: "2 mins ago",
      priority: "High",
    },
    {
      id: "CR002",
      bed: "GW-B-108",
      patient: "Lakshmi Nair",
      reason: "Assistance needed",
      time: "5 mins ago",
      priority: "Normal",
    },
    {
      id: "CR003",
      bed: "PR-202",
      patient: "Vijay Malhotra",
      reason: "Water request",
      time: "8 mins ago",
      priority: "Low",
    },
  ]

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Critical":
        return <Badge className="bg-red-100 text-red-700">Critical</Badge>
      case "High":
        return <Badge className="bg-amber-100 text-amber-700">High</Badge>
      case "Normal":
        return <Badge className="bg-slate-100 text-slate-700">Normal</Badge>
      case "Low":
        return <Badge className="bg-teal-100 text-teal-700">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Overdue":
        return <Badge className="bg-red-100 text-red-700">Overdue</Badge>
      case "Pending":
        return <Badge className="bg-amber-100 text-amber-700">Pending</Badge>
      case "In Progress":
        return <Badge className="bg-indigo-100 text-indigo-700">In Progress</Badge>
      case "Completed":
        return <Badge className="bg-teal-100 text-teal-700">Completed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Nursing Station</h1>
          <p className="text-slate-600">Task management and patient care coordination</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => setIsAddNoteOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Note
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="tasks">
            <TabsList className="bg-slate-100">
              <TabsTrigger value="tasks" className="data-[state=active]:bg-white">
                Tasks
              </TabsTrigger>
              <TabsTrigger value="notes" className="data-[state=active]:bg-white">
                Nursing Notes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tasks" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-indigo-600" />
                    Today's Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {nursingTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-all ${
                          task.status === "Overdue"
                            ? "bg-red-50 border-red-200"
                            : task.status === "Completed"
                              ? "bg-slate-50 border-slate-200"
                              : "bg-white"
                        }`}
                        onClick={() => setSelectedTask(task)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-slate-900">{task.task}</p>
                              {getPriorityBadge(task.priority)}
                            </div>
                            <p className="text-sm text-slate-500">
                              {task.patient} - {task.bed}
                            </p>
                          </div>
                          <div className="text-right">
                            {getStatusBadge(task.status)}
                            <p className="text-xs text-slate-400 mt-1">{task.dueTime}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t">
                          <p className="text-xs text-slate-500">Assigned to: {task.assignedTo}</p>
                          {task.status !== "Completed" && (
                            <Button
                              size="sm"
                              className={
                                task.status === "Overdue"
                                  ? "bg-red-600 hover:bg-red-700"
                                  : "bg-teal-600 hover:bg-teal-700"
                              }
                            >
                              {task.status === "In Progress" ? "Complete" : "Start"}
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-indigo-600" />
                    Recent Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {nursingNotes.map((note) => (
                      <div key={note.id} className="p-4 bg-slate-50 rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{note.bed}</Badge>
                            <span className="font-medium text-slate-700">{note.patient}</span>
                          </div>
                          <span className="text-xs text-slate-400">{note.time}</span>
                        </div>
                        <p className="text-sm text-slate-600">{note.note}</p>
                        <p className="text-xs text-slate-500">- {note.nurse}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - Call Requests */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5 text-amber-500" />
                Patient Calls
                <Badge className="bg-amber-100 text-amber-700 ml-auto">{callRequests.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {callRequests.map((call) => (
                  <div key={call.id} className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {call.bed}
                          </Badge>
                          {getPriorityBadge(call.priority)}
                        </div>
                        <p className="font-medium text-slate-700 mt-1">{call.patient}</p>
                        <p className="text-sm text-slate-500">{call.reason}</p>
                      </div>
                      <Button size="icon" variant="ghost" className="text-amber-600">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">{call.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shift Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-600" />
                Shift Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Patients Assigned</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Tasks Completed</span>
                  <span className="font-semibold text-teal-600">8/15</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Overdue Tasks</span>
                  <span className="font-semibold text-red-600">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Critical Patients</span>
                  <span className="font-semibold text-amber-600">3</span>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-xs text-slate-500">Shift ends in</p>
                  <p className="text-lg font-semibold text-indigo-600">4h 30m</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Note Dialog */}
      <Dialog open={isAddNoteOpen} onOpenChange={setIsAddNoteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Nursing Note</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Patient</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  {nursingTasks.map((task) => (
                    <SelectItem key={task.id} value={task.id}>
                      {task.patient} ({task.bed})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Note Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Observation</SelectItem>
                  <SelectItem value="assessment">Assessment</SelectItem>
                  <SelectItem value="intervention">Intervention</SelectItem>
                  <SelectItem value="response">Patient Response</SelectItem>
                  <SelectItem value="handoff">Shift Handoff</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Note</Label>
              <Textarea placeholder="Enter nursing note..." rows={4} />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsAddNoteOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700">Save Note</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Task Detail Dialog */}
      <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Task Details</DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-slate-50 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{selectedTask.task}</p>
                  {getPriorityBadge(selectedTask.priority)}
                </div>
                <p className="text-sm text-slate-500">
                  {selectedTask.patient} - {selectedTask.bed}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Due Time</p>
                  <p className="font-medium">{selectedTask.dueTime}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Assigned To</p>
                  <p className="font-medium">{selectedTask.assignedTo}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea placeholder="Add notes about task completion..." rows={3} />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setSelectedTask(null)}>
                  Close
                </Button>
                {selectedTask.status !== "Completed" && (
                  <Button className="bg-teal-600 hover:bg-teal-700">Mark Complete</Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
