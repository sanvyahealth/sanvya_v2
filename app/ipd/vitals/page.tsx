"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Activity,
  Heart,
  Thermometer,
  Wind,
  Droplets,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Plus,
} from "lucide-react"

export default function VitalsMonitoringPage() {
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null)
  const [isAddVitalsOpen, setIsAddVitalsOpen] = useState(false)

  const patients = [
    {
      id: "PT001",
      name: "Rajesh Kumar",
      bed: "GW-A-101",
      ward: "General Ward A",
      vitals: {
        bp: { value: "120/80", status: "normal", trend: "stable" },
        pulse: { value: 78, status: "normal", trend: "stable" },
        temp: { value: 98.6, status: "normal", trend: "stable" },
        spo2: { value: 97, status: "normal", trend: "stable" },
        rr: { value: 16, status: "normal", trend: "stable" },
      },
      lastUpdated: "10 mins ago",
    },
    {
      id: "PT002",
      name: "Priya Patel",
      bed: "ICU-001",
      ward: "ICU",
      vitals: {
        bp: { value: "110/70", status: "normal", trend: "up" },
        pulse: { value: 82, status: "normal", trend: "stable" },
        temp: { value: 99.2, status: "elevated", trend: "up" },
        spo2: { value: 95, status: "low", trend: "down" },
        rr: { value: 20, status: "elevated", trend: "up" },
      },
      lastUpdated: "5 mins ago",
    },
    {
      id: "PT005",
      name: "Suresh Reddy",
      bed: "ICU-003",
      ward: "ICU",
      vitals: {
        bp: { value: "140/90", status: "elevated", trend: "up" },
        pulse: { value: 92, status: "elevated", trend: "up" },
        temp: { value: 98.8, status: "normal", trend: "stable" },
        spo2: { value: 88, status: "critical", trend: "down" },
        rr: { value: 24, status: "elevated", trend: "up" },
      },
      lastUpdated: "2 mins ago",
    },
    {
      id: "PT003",
      name: "Amit Singh",
      bed: "PR-201",
      ward: "Private Room",
      vitals: {
        bp: { value: "118/76", status: "normal", trend: "stable" },
        pulse: { value: 72, status: "normal", trend: "down" },
        temp: { value: 98.4, status: "normal", trend: "stable" },
        spo2: { value: 99, status: "normal", trend: "stable" },
        rr: { value: 14, status: "normal", trend: "stable" },
      },
      lastUpdated: "15 mins ago",
    },
    {
      id: "PT004",
      name: "Meena Devi",
      bed: "GW-B-105",
      ward: "General Ward B",
      vitals: {
        bp: { value: "130/85", status: "elevated", trend: "up" },
        pulse: { value: 88, status: "elevated", trend: "up" },
        temp: { value: 99.0, status: "elevated", trend: "up" },
        spo2: { value: 96, status: "normal", trend: "stable" },
        rr: { value: 18, status: "normal", trend: "stable" },
      },
      lastUpdated: "8 mins ago",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "text-red-600 bg-red-50"
      case "elevated":
        return "text-amber-600 bg-amber-50"
      case "low":
        return "text-amber-600 bg-amber-50"
      default:
        return "text-teal-600 bg-teal-50"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3" />
      case "down":
        return <TrendingDown className="h-3 w-3" />
      default:
        return null
    }
  }

  const criticalCount = patients.filter((p) => Object.values(p.vitals).some((v) => v.status === "critical")).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Vitals Monitoring</h1>
          <p className="text-slate-600">Real-time patient vital signs tracking</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => setIsAddVitalsOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Record Vitals
        </Button>
      </div>

      {/* Alert Banner */}
      {criticalCount > 0 && (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <p className="font-medium text-red-700">
                {criticalCount} patient(s) with critical vital signs requiring immediate attention
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Patient Vitals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {patients.map((patient) => {
          const hasCritical = Object.values(patient.vitals).some((v) => v.status === "critical")
          return (
            <Card
              key={patient.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                hasCritical ? "border-red-200 bg-red-50/50" : ""
              }`}
              onClick={() => setSelectedPatient(patient)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{patient.name}</CardTitle>
                    <p className="text-sm text-slate-500">
                      {patient.bed} - {patient.ward}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Last updated</p>
                    <p className="text-sm text-slate-600">{patient.lastUpdated}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {/* Blood Pressure */}
                  <div className={`p-2 rounded-lg text-center ${getStatusColor(patient.vitals.bp.status)}`}>
                    <Droplets className="h-4 w-4 mx-auto mb-1" />
                    <p className="text-xs opacity-75">BP</p>
                    <p className="font-semibold text-sm">{patient.vitals.bp.value}</p>
                    <div className="flex justify-center">{getTrendIcon(patient.vitals.bp.trend)}</div>
                  </div>

                  {/* Pulse */}
                  <div className={`p-2 rounded-lg text-center ${getStatusColor(patient.vitals.pulse.status)}`}>
                    <Heart className="h-4 w-4 mx-auto mb-1" />
                    <p className="text-xs opacity-75">Pulse</p>
                    <p className="font-semibold text-sm">{patient.vitals.pulse.value}</p>
                    <div className="flex justify-center">{getTrendIcon(patient.vitals.pulse.trend)}</div>
                  </div>

                  {/* Temperature */}
                  <div className={`p-2 rounded-lg text-center ${getStatusColor(patient.vitals.temp.status)}`}>
                    <Thermometer className="h-4 w-4 mx-auto mb-1" />
                    <p className="text-xs opacity-75">Temp</p>
                    <p className="font-semibold text-sm">{patient.vitals.temp.value}°F</p>
                    <div className="flex justify-center">{getTrendIcon(patient.vitals.temp.trend)}</div>
                  </div>

                  {/* SpO2 */}
                  <div className={`p-2 rounded-lg text-center ${getStatusColor(patient.vitals.spo2.status)}`}>
                    <Activity className="h-4 w-4 mx-auto mb-1" />
                    <p className="text-xs opacity-75">SpO2</p>
                    <p className="font-semibold text-sm">{patient.vitals.spo2.value}%</p>
                    <div className="flex justify-center">{getTrendIcon(patient.vitals.spo2.trend)}</div>
                  </div>

                  {/* Respiratory Rate */}
                  <div className={`p-2 rounded-lg text-center ${getStatusColor(patient.vitals.rr.status)}`}>
                    <Wind className="h-4 w-4 mx-auto mb-1" />
                    <p className="text-xs opacity-75">RR</p>
                    <p className="font-semibold text-sm">{patient.vitals.rr.value}</p>
                    <div className="flex justify-center">{getTrendIcon(patient.vitals.rr.trend)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Add Vitals Dialog */}
      <Dialog open={isAddVitalsOpen} onOpenChange={setIsAddVitalsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Vital Signs</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Patient</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name} ({patient.bed})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Blood Pressure (mmHg)</Label>
                <Input placeholder="120/80" />
              </div>
              <div className="space-y-2">
                <Label>Pulse (bpm)</Label>
                <Input type="number" placeholder="72" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Temperature (°F)</Label>
                <Input type="number" step="0.1" placeholder="98.6" />
              </div>
              <div className="space-y-2">
                <Label>SpO2 (%)</Label>
                <Input type="number" placeholder="98" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Respiratory Rate</Label>
                <Input type="number" placeholder="16" />
              </div>
              <div className="space-y-2">
                <Label>Blood Sugar (mg/dL)</Label>
                <Input type="number" placeholder="100" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsAddVitalsOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700">Save Vitals</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Patient Detail Dialog */}
      <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Vitals History - {selectedPatient?.name}</DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium">{selectedPatient.name}</p>
                  <p className="text-sm text-slate-500">
                    {selectedPatient.bed} - {selectedPatient.ward}
                  </p>
                </div>
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                  Record New Vitals
                </Button>
              </div>

              {/* Current Vitals */}
              <div className="grid grid-cols-5 gap-3">
                <Card className={getStatusColor(selectedPatient.vitals.bp.status)}>
                  <CardContent className="p-3 text-center">
                    <Droplets className="h-5 w-5 mx-auto mb-1" />
                    <p className="text-xs opacity-75">Blood Pressure</p>
                    <p className="font-bold">{selectedPatient.vitals.bp.value}</p>
                    <p className="text-xs">mmHg</p>
                  </CardContent>
                </Card>
                <Card className={getStatusColor(selectedPatient.vitals.pulse.status)}>
                  <CardContent className="p-3 text-center">
                    <Heart className="h-5 w-5 mx-auto mb-1" />
                    <p className="text-xs opacity-75">Pulse</p>
                    <p className="font-bold">{selectedPatient.vitals.pulse.value}</p>
                    <p className="text-xs">bpm</p>
                  </CardContent>
                </Card>
                <Card className={getStatusColor(selectedPatient.vitals.temp.status)}>
                  <CardContent className="p-3 text-center">
                    <Thermometer className="h-5 w-5 mx-auto mb-1" />
                    <p className="text-xs opacity-75">Temperature</p>
                    <p className="font-bold">{selectedPatient.vitals.temp.value}</p>
                    <p className="text-xs">°F</p>
                  </CardContent>
                </Card>
                <Card className={getStatusColor(selectedPatient.vitals.spo2.status)}>
                  <CardContent className="p-3 text-center">
                    <Activity className="h-5 w-5 mx-auto mb-1" />
                    <p className="text-xs opacity-75">SpO2</p>
                    <p className="font-bold">{selectedPatient.vitals.spo2.value}</p>
                    <p className="text-xs">%</p>
                  </CardContent>
                </Card>
                <Card className={getStatusColor(selectedPatient.vitals.rr.status)}>
                  <CardContent className="p-3 text-center">
                    <Wind className="h-5 w-5 mx-auto mb-1" />
                    <p className="text-xs opacity-75">Resp Rate</p>
                    <p className="font-bold">{selectedPatient.vitals.rr.value}</p>
                    <p className="text-xs">/min</p>
                  </CardContent>
                </Card>
              </div>

              {/* History Table */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="p-2 text-left">Time</th>
                      <th className="p-2 text-center">BP</th>
                      <th className="p-2 text-center">Pulse</th>
                      <th className="p-2 text-center">Temp</th>
                      <th className="p-2 text-center">SpO2</th>
                      <th className="p-2 text-center">RR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { time: "10:00 AM", bp: "120/80", pulse: 78, temp: 98.6, spo2: 97, rr: 16 },
                      { time: "8:00 AM", bp: "118/78", pulse: 76, temp: 98.4, spo2: 98, rr: 15 },
                      { time: "6:00 AM", bp: "122/82", pulse: 80, temp: 98.8, spo2: 96, rr: 17 },
                      { time: "4:00 AM", bp: "116/76", pulse: 74, temp: 98.2, spo2: 97, rr: 14 },
                    ].map((record, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-2">{record.time}</td>
                        <td className="p-2 text-center">{record.bp}</td>
                        <td className="p-2 text-center">{record.pulse}</td>
                        <td className="p-2 text-center">{record.temp}°F</td>
                        <td className="p-2 text-center">{record.spo2}%</td>
                        <td className="p-2 text-center">{record.rr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
