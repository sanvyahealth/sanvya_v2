"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Clock, FileText } from "lucide-react"

export default function LabSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Lab Settings</h1>
        <p className="text-slate-600">Configure laboratory module preferences</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="general" className="data-[state=active]:bg-white">
            General
          </TabsTrigger>
          <TabsTrigger value="alerts" className="data-[state=active]:bg-white">
            Alerts
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-white">
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-indigo-600" />
                Turnaround Time Settings
              </CardTitle>
              <CardDescription>Configure expected turnaround times for different test categories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Hematology TAT (hours)</Label>
                  <Input type="number" defaultValue="2" />
                </div>
                <div className="space-y-2">
                  <Label>Biochemistry TAT (hours)</Label>
                  <Input type="number" defaultValue="4" />
                </div>
                <div className="space-y-2">
                  <Label>Microbiology TAT (hours)</Label>
                  <Input type="number" defaultValue="48" />
                </div>
                <div className="space-y-2">
                  <Label>Serology TAT (hours)</Label>
                  <Input type="number" defaultValue="6" />
                </div>
              </div>
              <Button className="bg-indigo-600 hover:bg-indigo-700">Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-indigo-600" />
                Alert Configuration
              </CardTitle>
              <CardDescription>Configure critical value alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Critical Value Alerts</Label>
                    <p className="text-sm text-slate-500">Immediately notify for critical test results</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>TAT Exceeded Alerts</Label>
                    <p className="text-sm text-slate-500">Alert when turnaround time is exceeded</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Sample Collection Reminders</Label>
                    <p className="text-sm text-slate-500">Remind about pending sample collections</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Alert Notification Method</Label>
                <Select defaultValue="both">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email Only</SelectItem>
                    <SelectItem value="sms">SMS Only</SelectItem>
                    <SelectItem value="both">Email & SMS</SelectItem>
                    <SelectItem value="app">In-App Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="bg-indigo-600 hover:bg-indigo-700">Save Alert Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-600" />
                Report Settings
              </CardTitle>
              <CardDescription>Configure lab report format and printing options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Report Header</Label>
                  <Input defaultValue="Sanvya Hospital Laboratory" />
                </div>
                <div className="space-y-2">
                  <Label>Report Footer</Label>
                  <Input defaultValue="This is a computer-generated report" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Include Reference Ranges</Label>
                    <p className="text-sm text-slate-500">Show normal ranges on reports</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Include Previous Results</Label>
                    <p className="text-sm text-slate-500">Show comparison with previous tests</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-send to Doctor</Label>
                    <p className="text-sm text-slate-500">Automatically send verified reports to requesting doctor</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Button className="bg-indigo-600 hover:bg-indigo-700">Save Report Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
