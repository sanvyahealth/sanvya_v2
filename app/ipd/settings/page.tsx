"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Clock, FileText } from "lucide-react"

export default function IPDSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">IPD Settings</h1>
        <p className="text-slate-600">Configure IPD module preferences and alerts</p>
      </div>

      <Tabs defaultValue="alerts">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="alerts" className="data-[state=active]:bg-white">
            Alerts
          </TabsTrigger>
          <TabsTrigger value="schedules" className="data-[state=active]:bg-white">
            Schedules
          </TabsTrigger>
          <TabsTrigger value="protocols" className="data-[state=active]:bg-white">
            Protocols
          </TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-indigo-600" />
                Alert Configuration
              </CardTitle>
              <CardDescription>Configure vital sign thresholds and notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium text-slate-900">Vital Sign Alerts</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>SpO2 Critical Threshold (%)</Label>
                    <Input type="number" defaultValue="90" />
                  </div>
                  <div className="space-y-2">
                    <Label>SpO2 Warning Threshold (%)</Label>
                    <Input type="number" defaultValue="94" />
                  </div>
                  <div className="space-y-2">
                    <Label>Systolic BP High (mmHg)</Label>
                    <Input type="number" defaultValue="140" />
                  </div>
                  <div className="space-y-2">
                    <Label>Systolic BP Low (mmHg)</Label>
                    <Input type="number" defaultValue="90" />
                  </div>
                  <div className="space-y-2">
                    <Label>Temperature High (°F)</Label>
                    <Input type="number" defaultValue="100.4" />
                  </div>
                  <div className="space-y-2">
                    <Label>Pulse High (bpm)</Label>
                    <Input type="number" defaultValue="100" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-slate-900">Notification Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Critical Alert Sound</Label>
                      <p className="text-sm text-slate-500">Play sound for critical vital alerts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Medication Reminders</Label>
                      <p className="text-sm text-slate-500">Notify before medication due time</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Shift Handoff Reminder</Label>
                      <p className="text-sm text-slate-500">Remind to complete handoff notes before shift end</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Button className="bg-indigo-600 hover:bg-indigo-700">Save Alert Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedules" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-indigo-600" />
                Schedule Configuration
              </CardTitle>
              <CardDescription>Configure ward rounds and medication schedules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium text-slate-900">Ward Round Schedule</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Morning Round Time</Label>
                    <Input type="time" defaultValue="08:00" />
                  </div>
                  <div className="space-y-2">
                    <Label>Evening Round Time</Label>
                    <Input type="time" defaultValue="17:00" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-slate-900">Vitals Recording Schedule</h3>
                <div className="space-y-2">
                  <Label>Recording Frequency</Label>
                  <Select defaultValue="4">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Every 1 hour (ICU)</SelectItem>
                      <SelectItem value="2">Every 2 hours</SelectItem>
                      <SelectItem value="4">Every 4 hours</SelectItem>
                      <SelectItem value="6">Every 6 hours</SelectItem>
                      <SelectItem value="8">Every 8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-slate-900">Shift Timings</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Morning Shift</Label>
                    <Input defaultValue="6:00 AM - 2:00 PM" />
                  </div>
                  <div className="space-y-2">
                    <Label>Evening Shift</Label>
                    <Input defaultValue="2:00 PM - 10:00 PM" />
                  </div>
                  <div className="space-y-2">
                    <Label>Night Shift</Label>
                    <Input defaultValue="10:00 PM - 6:00 AM" />
                  </div>
                </div>
              </div>

              <Button className="bg-indigo-600 hover:bg-indigo-700">Save Schedule Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="protocols" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-600" />
                Clinical Protocols
              </CardTitle>
              <CardDescription>Configure standard operating procedures and protocols</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium text-slate-900">Admission Protocols</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Mandatory Vitals on Admission</Label>
                      <p className="text-sm text-slate-500">Require vitals recording within 30 mins of admission</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Fall Risk Assessment</Label>
                      <p className="text-sm text-slate-500">Require fall risk assessment for all admissions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-slate-900">Discharge Protocols</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Mandatory Discharge Summary</Label>
                      <p className="text-sm text-slate-500">Require discharge summary before patient release</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Follow-up Appointment Required</Label>
                      <p className="text-sm text-slate-500">Schedule follow-up before discharge</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Button className="bg-indigo-600 hover:bg-indigo-700">Save Protocol Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
