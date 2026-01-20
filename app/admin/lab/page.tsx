"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, FlaskConical, FileUp, Eye, Download } from "lucide-react"
import { labTests } from "@/lib/demo-data"

const statusColors = {
  Completed: "bg-green-100 text-green-700",
  "In Progress": "bg-amber-100 text-amber-700",
  Pending: "bg-slate-100 text-slate-700",
}

const resultColors = {
  Normal: "text-green-600",
  Pending: "text-muted-foreground",
  "Elevated LDL": "text-amber-600",
  "Osteoarthritis Grade II": "text-amber-600",
}

export default function LabPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredTests = labTests.filter((test) => {
    const matchesSearch =
      test.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.testName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || test.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const categories = [...new Set(labTests.map((t) => t.category))]

  return (
    <div className="flex flex-col">
      <Header title="Lab & Radiology" />

      <div className="flex-1 space-y-6 p-6">
        <Tabs defaultValue="tests" className="w-full">
          <TabsList>
            <TabsTrigger value="tests">Lab Tests</TabsTrigger>
            <TabsTrigger value="radiology">Radiology</TabsTrigger>
          </TabsList>

          <TabsContent value="tests" className="mt-6">
            <Card className="border-border">
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Lab Test Management</CardTitle>
                    <CardDescription>Manage lab tests and reports</CardDescription>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline">
                      <FileUp className="mr-2 h-4 w-4" />
                      Upload Report
                    </Button>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      New Test
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search tests or patients..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Test ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Test Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Requested By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Result</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTests.map((test) => (
                        <TableRow key={test.id}>
                          <TableCell className="font-mono text-xs">{test.id}</TableCell>
                          <TableCell className="font-medium">{test.patientName}</TableCell>
                          <TableCell>{test.testName}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{test.category}</Badge>
                          </TableCell>
                          <TableCell>{test.requestedBy}</TableCell>
                          <TableCell>{test.requestDate}</TableCell>
                          <TableCell>
                            <span
                              className={resultColors[test.result as keyof typeof resultColors] || "text-foreground"}
                            >
                              {test.result}
                            </span>
                          </TableCell>
                          <TableCell>₹{test.cost}</TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className={statusColors[test.status as keyof typeof statusColors]}
                            >
                              {test.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              {test.status === "Completed" && (
                                <Button variant="ghost" size="icon">
                                  <Download className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="radiology" className="mt-6">
            <Card className="border-border">
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Radiology Services</CardTitle>
                    <CardDescription>X-Ray, CT Scan, MRI, and Ultrasound management</CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Scan
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {["X-Ray", "CT Scan", "MRI", "Ultrasound"].map((type) => (
                    <Card key={type} className="border-border">
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                          <FlaskConical className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <p className="font-medium">{type}</p>
                          <p className="text-sm text-muted-foreground">{Math.floor(Math.random() * 20) + 5} pending</p>
                        </div>
                      </CardContent>
                    </Card>
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
