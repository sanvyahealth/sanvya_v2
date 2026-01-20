"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Heart, Thermometer, Droplets, Activity, FileText, Plus } from "lucide-react"
import { patients } from "@/lib/demo-data"

const statusColors = {
  Admitted: "bg-blue-100 text-blue-700",
  Discharged: "bg-green-100 text-green-700",
}

export default function DoctorPatientsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col">
      <Header title="My Patients" />

      <div className="flex-1 space-y-6 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{patient.name}</p>
                      <p className="text-xs text-muted-foreground">{patient.id}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className={statusColors[patient.status as keyof typeof statusColors]}>
                    {patient.status}
                  </Badge>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Age/Gender</span>
                    <span>
                      {patient.age} / {patient.gender}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ward/Room</span>
                    <span>
                      {patient.ward} / {patient.room}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Admitted</span>
                    <span>{patient.admissionDate}</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="flex items-center gap-1 rounded-lg bg-red-50 px-2 py-1.5">
                    <Heart className="h-3 w-3 text-red-500" />
                    <span className="text-xs font-medium">72 bpm</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1.5">
                    <Thermometer className="h-3 w-3 text-amber-500" />
                    <span className="text-xs font-medium">98.6°F</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-1.5">
                    <Droplets className="h-3 w-3 text-blue-500" />
                    <span className="text-xs font-medium">{patient.bloodGroup}</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <FileText className="mr-1 h-4 w-4" />
                        Records
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{patient.name}</DialogTitle>
                        <DialogDescription>{patient.id}</DialogDescription>
                      </DialogHeader>
                      <Tabs defaultValue="vitals" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="vitals">Vitals</TabsTrigger>
                          <TabsTrigger value="history">History</TabsTrigger>
                          <TabsTrigger value="notes">Notes</TabsTrigger>
                        </TabsList>
                        <TabsContent value="vitals" className="mt-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-lg border border-border p-4">
                              <div className="flex items-center gap-2">
                                <Heart className="h-5 w-5 text-red-500" />
                                <span className="text-muted-foreground">Heart Rate</span>
                              </div>
                              <p className="mt-2 text-2xl font-bold">
                                72 <span className="text-sm font-normal">bpm</span>
                              </p>
                            </div>
                            <div className="rounded-lg border border-border p-4">
                              <div className="flex items-center gap-2">
                                <Activity className="h-5 w-5 text-green-500" />
                                <span className="text-muted-foreground">Blood Pressure</span>
                              </div>
                              <p className="mt-2 text-2xl font-bold">
                                120/80 <span className="text-sm font-normal">mmHg</span>
                              </p>
                            </div>
                            <div className="rounded-lg border border-border p-4">
                              <div className="flex items-center gap-2">
                                <Thermometer className="h-5 w-5 text-amber-500" />
                                <span className="text-muted-foreground">Temperature</span>
                              </div>
                              <p className="mt-2 text-2xl font-bold">
                                98.6 <span className="text-sm font-normal">°F</span>
                              </p>
                            </div>
                            <div className="rounded-lg border border-border p-4">
                              <div className="flex items-center gap-2">
                                <Droplets className="h-5 w-5 text-blue-500" />
                                <span className="text-muted-foreground">SpO2</span>
                              </div>
                              <p className="mt-2 text-2xl font-bold">
                                98 <span className="text-sm font-normal">%</span>
                              </p>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="history" className="mt-4">
                          <div className="space-y-4">
                            <div className="rounded-lg bg-muted/50 p-4">
                              <p className="text-sm font-medium">Medical History</p>
                              <p className="mt-2 text-sm text-muted-foreground">
                                Hypertension (controlled), Type 2 Diabetes (on medication)
                              </p>
                            </div>
                            <div className="rounded-lg bg-muted/50 p-4">
                              <p className="text-sm font-medium">Allergies</p>
                              <p className="mt-2 text-sm text-muted-foreground">No known allergies</p>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="notes" className="mt-4">
                          <div className="space-y-4">
                            <div className="rounded-lg border border-border p-4">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">Jan 27, 2024</p>
                                <p className="text-xs text-muted-foreground">Dr. Anil Kapoor</p>
                              </div>
                              <p className="mt-2 text-sm text-muted-foreground">
                                Patient stable. Continue current medication. Review lipid profile results.
                              </p>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                  <Button size="sm" className="flex-1">
                    <Plus className="mr-1 h-4 w-4" />
                    Add Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
