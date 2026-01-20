"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Heart, Pill, AlertCircle, Calendar } from "lucide-react"
import { patients } from "@/lib/demo-data"

const currentPatient = patients[0]

const medicalHistory = [
  { condition: "Hypertension", status: "Controlled", since: "2019", medication: "Amlodipine 5mg" },
  { condition: "Type 2 Diabetes", status: "On Medication", since: "2020", medication: "Metformin 500mg" },
]

const allergies = [{ allergen: "Penicillin", severity: "Severe", reaction: "Skin rash, difficulty breathing" }]

const medications = [
  { name: "Amlodipine", dosage: "5mg", frequency: "Once daily", duration: "Ongoing" },
  { name: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "Ongoing" },
  { name: "Aspirin", dosage: "75mg", frequency: "Once daily", duration: "As prescribed" },
]

const visitHistory = [
  { date: "Jan 15, 2024", type: "Admission", doctor: "Dr. Anil Kapoor", notes: "Admitted for cardiac evaluation" },
  { date: "Dec 28, 2023", type: "OPD Visit", doctor: "Dr. Anil Kapoor", notes: "Routine checkup, vitals normal" },
  { date: "Nov 10, 2023", type: "Emergency", doctor: "Dr. Kavita Nair", notes: "Chest pain complaint, ECG normal" },
]

export default function HealthRecordsPage() {
  return (
    <div className="flex flex-col">
      <Header title="Health Records" />

      <div className="flex-1 space-y-6 p-6">
        {/* Patient Summary */}
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Patient Name</p>
                <p className="font-medium">{currentPatient.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Sanvya ID</p>
                <p className="font-mono text-sm">{currentPatient.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Blood Group</p>
                <Badge variant="outline">{currentPatient.bloodGroup}</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Age / Gender</p>
                <p className="font-medium">
                  {currentPatient.age} years / {currentPatient.gender}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="history">Medical History</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="visits">Visit History</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="mt-6 space-y-6">
            {/* Conditions */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Medical Conditions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medicalHistory.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div>
                        <p className="font-medium">{item.condition}</p>
                        <p className="text-sm text-muted-foreground">Since {item.since}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          {item.status}
                        </Badge>
                        <p className="mt-1 text-xs text-muted-foreground">{item.medication}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Allergies */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  Allergies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allergies.map((allergy, idx) => (
                    <div key={idx} className="rounded-lg border border-red-200 bg-red-50 p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-red-900">{allergy.allergen}</p>
                        <Badge variant="destructive">{allergy.severity}</Badge>
                      </div>
                      <p className="mt-2 text-sm text-red-800">{allergy.reaction}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medications" className="mt-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-primary" />
                  Current Medications
                </CardTitle>
                <CardDescription>Your prescribed medications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medications.map((med, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Pill className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{med.name}</p>
                          <p className="text-sm text-muted-foreground">{med.dosage}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{med.frequency}</p>
                        <p className="text-xs text-muted-foreground">{med.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visits" className="mt-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-secondary" />
                  Visit History
                </CardTitle>
                <CardDescription>Your hospital visits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {visitHistory.map((visit, idx) => (
                    <div key={idx} className="rounded-lg border border-border p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{visit.type}</p>
                          <p className="text-sm text-muted-foreground">{visit.doctor}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{visit.date}</p>
                      </div>
                      <p className="mt-2 text-sm">{visit.notes}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-amber-500" />
                  Medical Documents
                </CardTitle>
                <CardDescription>Your uploaded documents and reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Discharge Summary - Jan 2024", date: "Jan 20, 2024", type: "PDF" },
                    { name: "ECG Report", date: "Jan 16, 2024", type: "PDF" },
                    { name: "Blood Test Results", date: "Jan 15, 2024", type: "PDF" },
                  ].map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                          <FileText className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.date}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
