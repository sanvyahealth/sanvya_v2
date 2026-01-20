"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Plus, Clock, CalendarIcon, Eye, FileText } from "lucide-react"
import { surgeries } from "@/lib/demo-data"

const statusColors = {
  Scheduled: "bg-blue-100 text-blue-700",
  "In Progress": "bg-amber-100 text-amber-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
}

export default function SurgeriesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSurgeries = surgeries.filter(
    (surgery) =>
      surgery.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surgery.surgeryName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col">
      <Header title="Surgeries" />

      <div className="flex-1 space-y-6 p-6">
        <Card className="border-border">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Surgery Schedule</CardTitle>
                <CardDescription>Manage surgery scheduling and operation notes</CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Schedule Surgery
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search surgeries..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Surgery ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Surgery Name</TableHead>
                    <TableHead>Surgeon</TableHead>
                    <TableHead>Anesthetist</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>OT</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSurgeries.map((surgery) => (
                    <TableRow key={surgery.id}>
                      <TableCell className="font-mono text-xs">{surgery.id}</TableCell>
                      <TableCell className="font-medium">{surgery.patientName}</TableCell>
                      <TableCell>{surgery.surgeryName}</TableCell>
                      <TableCell>{surgery.surgeon}</TableCell>
                      <TableCell>{surgery.anesthetist}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{surgery.scheduledDate}</span>
                          <Clock className="ml-2 h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{surgery.scheduledTime}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{surgery.operationTheatre}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={statusColors[surgery.status as keyof typeof statusColors]}
                        >
                          {surgery.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{surgery.surgeryName}</DialogTitle>
                                <DialogDescription>Surgery ID: {surgery.id}</DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-1">
                                    <Label className="text-muted-foreground">Patient</Label>
                                    <p className="font-medium">{surgery.patientName}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <Label className="text-muted-foreground">Patient ID</Label>
                                    <p className="font-mono text-sm">{surgery.patientId}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <Label className="text-muted-foreground">Surgeon</Label>
                                    <p className="font-medium">{surgery.surgeon}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <Label className="text-muted-foreground">Anesthetist</Label>
                                    <p className="font-medium">{surgery.anesthetist}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <Label className="text-muted-foreground">Duration</Label>
                                    <p className="font-medium">{surgery.estimatedDuration}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <Label className="text-muted-foreground">Operation Theatre</Label>
                                    <p className="font-medium">{surgery.operationTheatre}</p>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-muted-foreground">Pre-Op Notes</Label>
                                  <p className="rounded-lg bg-muted/50 p-3 text-sm">{surgery.preOpNotes}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
