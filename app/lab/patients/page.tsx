"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, User, FileText, History, FlaskConical } from "lucide-react"
import { demoPatients } from "@/lib/demo-data"

export default function LabPatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null)

  const patientLabHistory = [
    { date: "2024-01-15", test: "Troponin I", result: "0.8 ng/mL", status: "Critical" },
    { date: "2024-01-15", test: "CK-MB", result: "45 U/L", status: "High" },
    { date: "2024-01-10", test: "CBC", result: "Normal", status: "Normal" },
    { date: "2024-01-05", test: "LFT", result: "Normal", status: "Normal" },
    { date: "2023-12-20", test: "Lipid Profile", result: "Cholesterol High", status: "Abnormal" },
  ]

  const filteredPatients = demoPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patient Lab Records</h1>
          <p className="text-slate-600">View patient laboratory history and reports</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by patient name or ID..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age / Gender</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Last Test</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>
                    {patient.age}Y / {patient.gender}
                  </TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>Jan 15, 2024</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" onClick={() => setSelectedPatient(patient)}>
                      View History
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Patient Detail Dialog */}
      <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-indigo-600" />
              Patient Lab History
            </DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <div className="space-y-6 py-4">
              {/* Patient Info */}
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
                  <User className="h-8 w-8 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedPatient.name}</h3>
                  <p className="text-sm text-slate-500">
                    {selectedPatient.id} | {selectedPatient.age}Y | {selectedPatient.gender}
                  </p>
                  <p className="text-sm text-slate-500">{selectedPatient.phone}</p>
                </div>
              </div>

              <Tabs defaultValue="history">
                <TabsList className="bg-slate-100">
                  <TabsTrigger value="history" className="data-[state=active]:bg-white">
                    <History className="h-4 w-4 mr-2" />
                    Test History
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="data-[state=active]:bg-white">
                    <FileText className="h-4 w-4 mr-2" />
                    Reports
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="history" className="mt-4">
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="p-3 text-left text-sm font-medium text-slate-600">Date</th>
                          <th className="p-3 text-left text-sm font-medium text-slate-600">Test</th>
                          <th className="p-3 text-left text-sm font-medium text-slate-600">Result</th>
                          <th className="p-3 text-left text-sm font-medium text-slate-600">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patientLabHistory.map((record, index) => (
                          <tr key={index} className="border-t">
                            <td className="p-3">{record.date}</td>
                            <td className="p-3 font-medium">{record.test}</td>
                            <td className="p-3">{record.result}</td>
                            <td className="p-3">
                              <Badge
                                className={
                                  record.status === "Critical"
                                    ? "bg-red-100 text-red-700"
                                    : record.status === "High" || record.status === "Abnormal"
                                      ? "bg-amber-100 text-amber-700"
                                      : "bg-teal-100 text-teal-700"
                                }
                              >
                                {record.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="reports" className="mt-4">
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-indigo-600" />
                          <div>
                            <p className="font-medium">Lab Report - Jan {20 - i * 5}, 2024</p>
                            <p className="text-sm text-slate-500">CBC, LFT, RFT</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Report
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline">
                  <FlaskConical className="h-4 w-4 mr-2" />
                  New Test Request
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
