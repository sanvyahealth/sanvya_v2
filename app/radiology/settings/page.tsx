"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const equipment = [
  { name: "CT Scanner 1", model: "Siemens SOMATOM", status: "active", lastMaintenance: "2024-01-15" },
  { name: "MRI Machine", model: "GE Signa Premier", status: "active", lastMaintenance: "2024-01-10" },
  { name: "X-Ray Room 1", model: "Philips DigitalDiagnost", status: "active", lastMaintenance: "2024-01-20" },
  { name: "X-Ray Room 2", model: "Carestream DRX", status: "maintenance", lastMaintenance: "2024-01-25" },
  { name: "Ultrasound 1", model: "Philips EPIQ Elite", status: "active", lastMaintenance: "2024-01-18" },
]

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Radiology Settings</h1>
        <p className="text-muted-foreground">Configure department preferences and equipment</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Information</CardTitle>
              <CardDescription>Basic radiology department details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Department Name</Label>
                  <Input defaultValue="Radiology & Imaging" />
                </div>
                <div className="space-y-2">
                  <Label>Department Head</Label>
                  <Input defaultValue="Dr. Anil Verma" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Contact Extension</Label>
                  <Input defaultValue="Ext. 2456" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="radiology@sanvya.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Operating Hours</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input defaultValue="08:00 AM" />
                  <Input defaultValue="08:00 PM" />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>PACS Configuration</CardTitle>
              <CardDescription>Picture Archiving and Communication System settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>PACS Server</Label>
                  <Input defaultValue="pacs.sanvya.local" />
                </div>
                <div className="space-y-2">
                  <Label>Port</Label>
                  <Input defaultValue="4242" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-archive Images</p>
                  <p className="text-sm text-muted-foreground">Automatically archive images after report submission</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable DICOM Worklist</p>
                  <p className="text-sm text-muted-foreground">Sync scheduled exams with modalities</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipment" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Equipment Management</CardTitle>
              <CardDescription>Manage imaging equipment and maintenance schedules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {equipment.map((eq) => (
                <div key={eq.name} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{eq.name}</p>
                      <Badge variant={eq.status === "active" ? "default" : "secondary"}>{eq.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{eq.model}</p>
                    <p className="text-xs text-muted-foreground">Last maintenance: {eq.lastMaintenance}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      Schedule Maintenance
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline">Add Equipment</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Settings</CardTitle>
              <CardDescription>Configure report and scheduling workflows</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Report TAT (hours)</Label>
                <Select defaultValue="4">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 hours</SelectItem>
                    <SelectItem value="4">4 hours</SelectItem>
                    <SelectItem value="6">6 hours</SelectItem>
                    <SelectItem value="24">24 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-assign Reports</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically assign reports to available radiologists
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Urgent Scan Alerts</p>
                  <p className="text-sm text-muted-foreground">Send alerts for urgent scan requests</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Report Review Required</p>
                  <p className="text-sm text-muted-foreground">Require senior review before finalizing reports</p>
                </div>
                <Switch />
              </div>
              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Staff</CardTitle>
              <CardDescription>Manage radiology department users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dr. Anil Verma</p>
                    <p className="text-sm text-muted-foreground">Chief Radiologist</p>
                  </div>
                  <Badge>Admin</Badge>
                </div>
              </div>
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dr. Priya Sharma</p>
                    <p className="text-sm text-muted-foreground">Consultant Radiologist</p>
                  </div>
                  <Badge variant="secondary">Radiologist</Badge>
                </div>
              </div>
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Ramesh Kumar</p>
                    <p className="text-sm text-muted-foreground">Senior Technician</p>
                  </div>
                  <Badge variant="secondary">Technician</Badge>
                </div>
              </div>
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Priya Singh</p>
                    <p className="text-sm text-muted-foreground">MRI Technician</p>
                  </div>
                  <Badge variant="secondary">Technician</Badge>
                </div>
              </div>
              <Button variant="outline">Add User</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
