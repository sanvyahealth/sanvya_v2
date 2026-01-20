"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FlaskConical, Download, Eye, CheckCircle, Clock } from "lucide-react"
import { labTests } from "@/lib/demo-data"

const patientTests = labTests.filter((t) => t.patientId === "SNV-2024-001")

const statusColors = {
  Completed: "bg-green-100 text-green-700",
  "In Progress": "bg-amber-100 text-amber-700",
  Pending: "bg-slate-100 text-slate-700",
}

export default function TestResultsPage() {
  return (
    <div className="flex flex-col">
      <Header title="Test Results" />

      <div className="flex-1 space-y-6 p-6">
        {/* Summary Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border-border">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{patientTests.filter((t) => t.status === "Completed").length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{patientTests.filter((t) => t.status === "In Progress").length}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FlaskConical className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{patientTests.length}</p>
                <p className="text-sm text-muted-foreground">Total Tests</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Tests</TabsTrigger>
            <TabsTrigger value="lab">Lab Tests</TabsTrigger>
            <TabsTrigger value="radiology">Radiology</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Test Results</CardTitle>
                <CardDescription>Your laboratory and radiology results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patientTests.map((test) => (
                    <div key={test.id} className="rounded-lg border border-border bg-card p-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                            <FlaskConical className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold">{test.testName}</p>
                            <p className="text-sm text-muted-foreground">{test.category}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Requested by: {test.requestedBy} • {test.requestDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <Badge
                              variant="secondary"
                              className={statusColors[test.status as keyof typeof statusColors]}
                            >
                              {test.status}
                            </Badge>
                            {test.status === "Completed" && (
                              <p
                                className={`mt-1 text-sm font-medium ${
                                  test.result === "Normal" ? "text-green-600" : "text-amber-600"
                                }`}
                              >
                                {test.result}
                              </p>
                            )}
                          </div>
                          {test.status === "Completed" && (
                            <div className="flex gap-2">
                              <Button variant="outline" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lab" className="mt-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Laboratory Tests</CardTitle>
                <CardDescription>Blood work, biochemistry, and other lab tests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patientTests
                    .filter((t) => t.category !== "Radiology")
                    .map((test) => (
                      <div
                        key={test.id}
                        className="flex items-center justify-between rounded-lg border border-border p-4"
                      >
                        <div>
                          <p className="font-medium">{test.testName}</p>
                          <p className="text-sm text-muted-foreground">{test.requestDate}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className={statusColors[test.status as keyof typeof statusColors]}>
                            {test.status}
                          </Badge>
                          {test.status === "Completed" && (
                            <Button variant="outline" size="sm">
                              <Download className="mr-1 h-4 w-4" />
                              Download
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="radiology" className="mt-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Radiology</CardTitle>
                <CardDescription>X-Ray, CT Scan, MRI, and other imaging</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patientTests
                    .filter((t) => t.category === "Radiology")
                    .map((test) => (
                      <div
                        key={test.id}
                        className="flex items-center justify-between rounded-lg border border-border p-4"
                      >
                        <div>
                          <p className="font-medium">{test.testName}</p>
                          <p className="text-sm text-muted-foreground">{test.requestDate}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className={statusColors[test.status as keyof typeof statusColors]}>
                            {test.status}
                          </Badge>
                          {test.status === "Completed" && (
                            <Button variant="outline" size="sm">
                              <Eye className="mr-1 h-4 w-4" />
                              View
                            </Button>
                          )}
                        </div>
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
