"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Microscope, Clock, CheckCircle2, AlertTriangle, Play, Pause, RotateCcw } from "lucide-react"

export default function ProcessingPage() {
  const [selectedTest, setSelectedTest] = useState<any | null>(null)

  const inProcessing = [
    {
      id: "PROC-001",
      sampleId: "SMP-003",
      patient: "Suresh Reddy",
      test: "Troponin I",
      analyzer: "Cobas e411",
      startTime: "09:15 AM",
      estimatedTime: "30 mins",
      progress: 65,
      priority: "Critical",
    },
    {
      id: "PROC-002",
      sampleId: "SMP-003",
      patient: "Suresh Reddy",
      test: "CK-MB",
      analyzer: "Cobas e411",
      startTime: "09:15 AM",
      estimatedTime: "30 mins",
      progress: 65,
      priority: "Critical",
    },
    {
      id: "PROC-003",
      sampleId: "SMP-004",
      patient: "Amit Singh",
      test: "Blood Sugar (Fasting)",
      analyzer: "Cobas c311",
      startTime: "09:00 AM",
      estimatedTime: "15 mins",
      progress: 90,
      priority: "Normal",
    },
    {
      id: "PROC-004",
      sampleId: "SMP-005",
      patient: "Meena Devi",
      test: "TSH",
      analyzer: "Cobas e411",
      startTime: "08:45 AM",
      estimatedTime: "45 mins",
      progress: 80,
      priority: "Normal",
    },
  ]

  const queuedTests = [
    {
      id: "Q-001",
      sampleId: "SMP-006",
      patient: "Lakshmi Nair",
      test: "Complete Blood Count",
      analyzer: "Sysmex XN-1000",
      priority: "Normal",
    },
    {
      id: "Q-002",
      sampleId: "SMP-007",
      patient: "Vijay Malhotra",
      test: "ESR",
      analyzer: "ESR Analyzer",
      priority: "Normal",
    },
    {
      id: "Q-003",
      sampleId: "SMP-008",
      patient: "Ramesh Yadav",
      test: "Lipid Profile",
      analyzer: "Cobas c311",
      priority: "Urgent",
    },
  ]

  const completedToday = [
    { id: "COMP-001", patient: "Anita Sharma", test: "CBC", completedAt: "08:30 AM", result: "Normal" },
    { id: "COMP-002", patient: "Ravi Kumar", test: "LFT", completedAt: "08:15 AM", result: "Abnormal" },
    { id: "COMP-003", patient: "Sunita Devi", test: "RFT", completedAt: "07:45 AM", result: "Normal" },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-700"
      case "Urgent":
        return "bg-amber-100 text-amber-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Test Processing</h1>
          <p className="text-slate-600">Monitor and manage test processing workflow</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-indigo-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-600">In Processing</p>
                <p className="text-2xl font-bold text-indigo-700">{inProcessing.length}</p>
              </div>
              <Microscope className="h-8 w-8 text-indigo-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">In Queue</p>
                <p className="text-2xl font-bold text-amber-700">{queuedTests.length}</p>
              </div>
              <Clock className="h-8 w-8 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-teal-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-600">Completed Today</p>
                <p className="text-2xl font-bold text-teal-700">{completedToday.length}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-teal-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">Critical Priority</p>
                <p className="text-2xl font-bold text-red-700">
                  {inProcessing.filter((t) => t.priority === "Critical").length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="processing">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="processing" className="data-[state=active]:bg-white">
            In Processing
          </TabsTrigger>
          <TabsTrigger value="queue" className="data-[state=active]:bg-white">
            Queue
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-white">
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="processing" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inProcessing.map((test) => (
              <Card
                key={test.id}
                className={`cursor-pointer hover:shadow-md transition-all ${
                  test.priority === "Critical" ? "border-red-200" : ""
                }`}
                onClick={() => setSelectedTest(test)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-slate-900">{test.test}</p>
                        <Badge className={getPriorityColor(test.priority)}>{test.priority}</Badge>
                      </div>
                      <p className="text-sm text-slate-500">{test.patient}</p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="text-slate-600">{test.analyzer}</p>
                      <p className="text-slate-400">Started: {test.startTime}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Progress</span>
                      <span className="font-medium">{test.progress}%</span>
                    </div>
                    <Progress value={test.progress} className="h-2" />
                    <p className="text-xs text-slate-400">Estimated: {test.estimatedTime}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="queue" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                {queuedTests.map((test, index) => (
                  <div key={test.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-slate-700">{test.test}</p>
                        <p className="text-sm text-slate-500">{test.patient}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getPriorityColor(test.priority)}>{test.priority}</Badge>
                      <span className="text-sm text-slate-500">{test.analyzer}</span>
                      <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                        <Play className="h-3 w-3 mr-1" /> Start
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                {completedToday.map((test) => (
                  <div key={test.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-teal-500" />
                      <div>
                        <p className="font-medium text-slate-700">{test.test}</p>
                        <p className="text-sm text-slate-500">{test.patient}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={
                          test.result === "Normal" ? "bg-teal-100 text-teal-700" : "bg-amber-100 text-amber-700"
                        }
                      >
                        {test.result}
                      </Badge>
                      <span className="text-sm text-slate-500">{test.completedAt}</span>
                      <Button variant="outline" size="sm">
                        View Result
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Test Detail Dialog */}
      <Dialog open={!!selectedTest} onOpenChange={() => setSelectedTest(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Processing Details</DialogTitle>
          </DialogHeader>
          {selectedTest && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold">{selectedTest.test}</p>
                  <Badge className={getPriorityColor(selectedTest.priority)}>{selectedTest.priority}</Badge>
                </div>
                <p className="text-sm text-slate-500">{selectedTest.patient}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Sample ID</p>
                  <p className="font-medium">{selectedTest.sampleId}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Analyzer</p>
                  <p className="font-medium">{selectedTest.analyzer}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Start Time</p>
                  <p className="font-medium">{selectedTest.startTime}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Estimated Time</p>
                  <p className="font-medium">{selectedTest.estimatedTime}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Progress</span>
                  <span className="font-medium">{selectedTest.progress}%</span>
                </div>
                <Progress value={selectedTest.progress} className="h-3" />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline">
                  <Pause className="h-4 w-4 mr-2" /> Pause
                </Button>
                <Button variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" /> Rerun
                </Button>
                <Button className="bg-teal-600 hover:bg-teal-700">Mark Complete</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
