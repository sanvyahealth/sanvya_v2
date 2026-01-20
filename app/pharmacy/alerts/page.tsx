"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Clock, Package, TrendingDown, ShoppingCart } from "lucide-react"

const lowStockAlerts = [
  {
    id: 1,
    name: "Insulin Glargine",
    current: 8,
    minimum: 30,
    unit: "vials",
    category: "Antidiabetics",
    critical: true,
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    current: 45,
    minimum: 200,
    unit: "capsules",
    category: "Antibiotics",
    critical: true,
  },
  {
    id: 3,
    name: "Omeprazole 20mg",
    current: 85,
    minimum: 300,
    unit: "capsules",
    category: "Gastrointestinal",
    critical: false,
  },
  {
    id: 4,
    name: "Paracetamol 500mg",
    current: 120,
    minimum: 500,
    unit: "tablets",
    category: "Analgesics",
    critical: false,
  },
  {
    id: 5,
    name: "Metformin 500mg",
    current: 150,
    minimum: 400,
    unit: "tablets",
    category: "Antidiabetics",
    critical: false,
  },
]

const expiryAlerts = [
  { id: 1, name: "Azithromycin 500mg", batch: "AZ-2024-001", expiry: "Feb 2025", quantity: 150, daysLeft: 30 },
  { id: 2, name: "Cetirizine 10mg", batch: "CT-2023-089", expiry: "Mar 2025", quantity: 200, daysLeft: 60 },
  { id: 3, name: "Diclofenac Gel", batch: "DG-2024-015", expiry: "Apr 2025", quantity: 45, daysLeft: 90 },
  { id: 4, name: "Ranitidine 150mg", batch: "RN-2024-008", expiry: "May 2025", quantity: 80, daysLeft: 120 },
]

const overStockAlerts = [
  { id: 1, name: "Vitamin C 500mg", current: 2500, maximum: 1000, unit: "tablets", value: 12500 },
  { id: 2, name: "Multivitamin Tablets", current: 1800, maximum: 800, unit: "tablets", value: 9000 },
  { id: 3, name: "Calcium Carbonate", current: 1200, maximum: 600, unit: "tablets", value: 4800 },
]

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Stock Alerts</h1>
        <p className="text-muted-foreground">Monitor inventory alerts and take action</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{lowStockAlerts.length}</p>
              <p className="text-sm text-red-700">Low Stock Items</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-600">{expiryAlerts.length}</p>
              <p className="text-sm text-amber-700">Expiring Soon</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{overStockAlerts.length}</p>
              <p className="text-sm text-blue-700">Overstocked Items</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="low-stock">
        <TabsList>
          <TabsTrigger value="low-stock" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Low Stock
          </TabsTrigger>
          <TabsTrigger value="expiry" className="gap-2">
            <Clock className="h-4 w-4" />
            Expiring Soon
          </TabsTrigger>
          <TabsTrigger value="overstock" className="gap-2">
            <Package className="h-4 w-4" />
            Overstock
          </TabsTrigger>
        </TabsList>

        <TabsContent value="low-stock" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Low Stock Alerts</CardTitle>
                <CardDescription>Items below minimum stock level</CardDescription>
              </div>
              <Button>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Create Purchase Order
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockAlerts.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between rounded-lg border p-4 ${
                      item.critical ? "border-red-200 bg-red-50" : "border-amber-200 bg-amber-50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          item.critical ? "bg-red-100" : "bg-amber-100"
                        }`}
                      >
                        <AlertTriangle className={`h-5 w-5 ${item.critical ? "text-red-600" : "text-amber-600"}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{item.name}</p>
                          {item.critical && (
                            <Badge variant="destructive" className="text-xs">
                              Critical
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          {item.current} {item.unit}
                        </p>
                        <p className="text-sm text-muted-foreground">Min: {item.minimum}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Reorder
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expiry" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Expiring Soon</CardTitle>
              <CardDescription>Medicines expiring in next 120 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expiryAlerts.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between rounded-lg border p-4 ${
                      item.daysLeft <= 30 ? "border-red-200 bg-red-50" : "border-amber-200 bg-amber-50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          item.daysLeft <= 30 ? "bg-red-100" : "bg-amber-100"
                        }`}
                      >
                        <Clock className={`h-5 w-5 ${item.daysLeft <= 30 ? "text-red-600" : "text-amber-600"}`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Batch: {item.batch}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-semibold text-foreground">Exp: {item.expiry}</p>
                        <p className="text-sm text-muted-foreground">{item.daysLeft} days left</p>
                      </div>
                      <Badge variant="outline">{item.quantity} units</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overstock" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Overstocked Items</CardTitle>
              <CardDescription>Items exceeding maximum stock level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {overStockAlerts.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <Package className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Max recommended: {item.maximum}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          {item.current} {item.unit}
                        </p>
                        <p className="text-sm text-muted-foreground">Value: ₹{item.value.toLocaleString()}</p>
                      </div>
                      <Badge variant="secondary">
                        +{Math.round(((item.current - item.maximum) / item.maximum) * 100)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
