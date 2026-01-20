"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Clock, User, FileText, Scissors } from "lucide-react"
import { surgeries } from "@/lib/demo-data"

const statusColors = {
  Scheduled: "bg-blue-100 text-blue-700",
  "In Progress": "bg-amber-100 text-amber-700",
  Completed: "bg-green-100 text-green-700",
}

export default function DoctorSurgeriesPage() {
  return (
    <div className="flex flex-col">
      <Header title="My Surgeries" />

      <div className="flex-1 space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border-border bg-primary/5">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Scissors className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{surgeries.length}</p>
                <p className="text-sm text-muted-foreground">Scheduled</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <Scissors className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">This Month</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                <Scissors className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">This Year</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Upcoming Surgeries</CardTitle>
            <CardDescription>Your scheduled surgical procedures</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {surgeries.map((surgery) => (
                <div
                  key={surgery.id}
                  className="rounded-lg border border-border bg-card p-6 transition-all hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <Scissors className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{surgery.surgeryName}</h3>
                          <p className="text-sm text-muted-foreground">{surgery.id}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{surgery.patientName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <span>{surgery.scheduledDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{surgery.scheduledTime}</span>
                        </div>
                        <Badge variant="outline">{surgery.operationTheatre}</Badge>
                        <Badge
                          variant="secondary"
                          className={statusColors[surgery.status as keyof typeof statusColors]}
                        >
                          {surgery.status}
                        </Badge>
                      </div>

                      <div className="rounded-lg bg-muted/50 p-3 text-sm">
                        <p className="font-medium text-muted-foreground">Pre-Op Notes:</p>
                        <p className="mt-1">{surgery.preOpNotes}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            <FileText className="mr-2 h-4 w-4" />
                            Op Notes
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Operation Notes</DialogTitle>
                            <DialogDescription>
                              {surgery.surgeryName} - {surgery.patientName}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label>Pre-Operation Notes</Label>
                              <Textarea defaultValue={surgery.preOpNotes} />
                            </div>
                            <div className="space-y-2">
                              <Label>Post-Operation Notes</Label>
                              <Textarea placeholder="Enter post-operation notes..." />
                            </div>
                          </div>
                          <div className="flex justify-end gap-3">
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Notes</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button>View Details</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
