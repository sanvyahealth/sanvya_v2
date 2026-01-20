"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BedDouble, User, CheckCircle2, Clock, Wrench } from "lucide-react"
import { demoWards, demoBeds } from "@/lib/demo-data"

export default function BedManagementPage() {
  const [selectedBed, setSelectedBed] = useState<(typeof demoBeds)[0] | null>(null)
  const [activeWard, setActiveWard] = useState(demoWards[0]?.id || "")

  const getBedStatusIcon = (status: string) => {
    switch (status) {
      case "Occupied":
        return <User className="h-4 w-4" />
      case "Available":
        return <CheckCircle2 className="h-4 w-4" />
      case "Reserved":
        return <Clock className="h-4 w-4" />
      case "Maintenance":
        return <Wrench className="h-4 w-4" />
      default:
        return <BedDouble className="h-4 w-4" />
    }
  }

  const getBedStatusColor = (status: string) => {
    switch (status) {
      case "Occupied":
        return "bg-red-100 border-red-200 text-red-700"
      case "Available":
        return "bg-teal-100 border-teal-200 text-teal-700"
      case "Reserved":
        return "bg-amber-100 border-amber-200 text-amber-700"
      case "Maintenance":
        return "bg-slate-100 border-slate-200 text-slate-700"
      default:
        return "bg-slate-100 border-slate-200 text-slate-700"
    }
  }

  const wardBeds = demoBeds.filter((bed) => bed.wardId === activeWard)
  const occupiedCount = wardBeds.filter((b) => b.status === "Occupied").length
  const availableCount = wardBeds.filter((b) => b.status === "Available").length
  const reservedCount = wardBeds.filter((b) => b.status === "Reserved").length
  const maintenanceCount = wardBeds.filter((b) => b.status === "Maintenance").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bed Management</h1>
          <p className="text-slate-600">Real-time bed availability and allocation</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-red-50 border-red-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">Occupied</p>
                <p className="text-2xl font-bold text-red-700">{occupiedCount}</p>
              </div>
              <User className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-teal-50 border-teal-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-600">Available</p>
                <p className="text-2xl font-bold text-teal-700">{availableCount}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-teal-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-amber-50 border-amber-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">Reserved</p>
                <p className="text-2xl font-bold text-amber-700">{reservedCount}</p>
              </div>
              <Clock className="h-8 w-8 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-50 border-slate-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Maintenance</p>
                <p className="text-2xl font-bold text-slate-700">{maintenanceCount}</p>
              </div>
              <Wrench className="h-8 w-8 text-slate-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ward Tabs */}
      <Tabs value={activeWard} onValueChange={setActiveWard}>
        <TabsList className="bg-slate-100">
          {demoWards.map((ward) => (
            <TabsTrigger key={ward.id} value={ward.id} className="data-[state=active]:bg-white">
              {ward.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {demoWards.map((ward) => (
          <TabsContent key={ward.id} value={ward.id} className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BedDouble className="h-5 w-5 text-indigo-600" />
                  {ward.name} - Floor {ward.floor}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                  {demoBeds
                    .filter((bed) => bed.wardId === ward.id)
                    .map((bed) => (
                      <button
                        key={bed.id}
                        onClick={() => setSelectedBed(bed)}
                        className={`p-3 rounded-lg border-2 transition-all hover:shadow-md ${getBedStatusColor(
                          bed.status,
                        )}`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          {getBedStatusIcon(bed.status)}
                          <span className="text-xs font-medium">{bed.number}</span>
                        </div>
                      </button>
                    ))}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-teal-100 border border-teal-200" />
                    <span className="text-sm text-slate-600">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-red-100 border border-red-200" />
                    <span className="text-sm text-slate-600">Occupied</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-amber-100 border border-amber-200" />
                    <span className="text-sm text-slate-600">Reserved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-slate-100 border border-slate-200" />
                    <span className="text-sm text-slate-600">Maintenance</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Bed Detail Dialog */}
      <Dialog open={!!selectedBed} onOpenChange={() => setSelectedBed(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bed Details - {selectedBed?.number}</DialogTitle>
          </DialogHeader>
          {selectedBed && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Bed Number</p>
                  <p className="font-medium">{selectedBed.number}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <Badge className={getBedStatusColor(selectedBed.status)}>{selectedBed.status}</Badge>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Bed Type</p>
                  <p className="font-medium">{selectedBed.type}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Ward</p>
                  <p className="font-medium">{demoWards.find((w) => w.id === selectedBed.wardId)?.name}</p>
                </div>
              </div>
              {selectedBed.status === "Occupied" && (
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm font-medium text-slate-700 mb-2">Current Patient</p>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="text-slate-500">Name:</span> Rajesh Kumar
                    </p>
                    <p className="text-sm">
                      <span className="text-slate-500">Admission:</span> ADM-2024-001
                    </p>
                    <p className="text-sm">
                      <span className="text-slate-500">Doctor:</span> Dr. Sharma
                    </p>
                    <p className="text-sm">
                      <span className="text-slate-500">Since:</span> Jan 15, 2024
                    </p>
                  </div>
                </div>
              )}
              <div className="flex gap-3">
                {selectedBed.status === "Available" && (
                  <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">Assign Patient</Button>
                )}
                {selectedBed.status === "Occupied" && (
                  <>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Transfer Patient
                    </Button>
                    <Button className="flex-1 bg-teal-600 hover:bg-teal-700">Discharge</Button>
                  </>
                )}
                {selectedBed.status === "Maintenance" && (
                  <Button className="flex-1 bg-teal-600 hover:bg-teal-700">Mark Available</Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
