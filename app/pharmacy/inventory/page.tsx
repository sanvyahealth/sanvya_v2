"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Trash2 } from "lucide-react"

const inventory = [
  {
    id: "MED-001",
    name: "Paracetamol 500mg",
    category: "Analgesics",
    manufacturer: "Cipla",
    batch: "PCM-2024-001",
    stock: 1200,
    minStock: 500,
    price: 2.5,
    expiry: "Dec 2025",
    location: "Rack A-1",
  },
  {
    id: "MED-002",
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    manufacturer: "Sun Pharma",
    batch: "AMX-2024-015",
    stock: 45,
    minStock: 200,
    price: 8.5,
    expiry: "Aug 2025",
    location: "Rack B-2",
  },
  {
    id: "MED-003",
    name: "Metformin 500mg",
    category: "Antidiabetics",
    manufacturer: "Dr. Reddy's",
    batch: "MET-2024-089",
    stock: 850,
    minStock: 400,
    price: 3.2,
    expiry: "Nov 2025",
    location: "Rack C-1",
  },
  {
    id: "MED-004",
    name: "Atorvastatin 10mg",
    category: "Cardiovascular",
    manufacturer: "Torrent",
    batch: "ATV-2024-045",
    stock: 620,
    minStock: 300,
    price: 12.5,
    expiry: "Oct 2025",
    location: "Rack D-3",
  },
  {
    id: "MED-005",
    name: "Omeprazole 20mg",
    category: "Gastrointestinal",
    manufacturer: "Lupin",
    batch: "OMP-2024-067",
    stock: 85,
    minStock: 300,
    price: 6.8,
    expiry: "Sep 2025",
    location: "Rack A-4",
  },
  {
    id: "MED-006",
    name: "Azithromycin 500mg",
    category: "Antibiotics",
    manufacturer: "Cipla",
    batch: "AZT-2024-023",
    stock: 320,
    minStock: 150,
    price: 45.0,
    expiry: "Jul 2025",
    location: "Rack B-1",
  },
  {
    id: "MED-007",
    name: "Insulin Glargine",
    category: "Antidiabetics",
    manufacturer: "Sanofi",
    batch: "INS-2024-008",
    stock: 8,
    minStock: 30,
    price: 850.0,
    expiry: "Jun 2025",
    location: "Cold Storage",
  },
]

const categories = ["All", "Analgesics", "Antibiotics", "Antidiabetics", "Cardiovascular", "Gastrointestinal"]

export default function InventoryPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) || item.id.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === "All" || item.category === category
    return matchesSearch && matchesCategory
  })

  const getStockStatus = (stock: number, minStock: number) => {
    const ratio = stock / minStock
    if (ratio < 0.25) return { label: "Critical", variant: "destructive" as const }
    if (ratio < 0.5) return { label: "Low", variant: "secondary" as const }
    return { label: "OK", variant: "outline" as const }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground">Manage medicine stock and inventory</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Medicine
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Medicine</DialogTitle>
              <DialogDescription>Add a new medicine to the inventory</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Medicine Name</Label>
                  <Input placeholder="Enter medicine name" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Manufacturer</Label>
                  <Input placeholder="Enter manufacturer" />
                </div>
                <div className="space-y-2">
                  <Label>Batch Number</Label>
                  <Input placeholder="Enter batch number" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>Min Stock</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>Price (₹)</Label>
                  <Input type="number" placeholder="0.00" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Expiry Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Storage Location</Label>
                  <Input placeholder="e.g., Rack A-1" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button>Add Medicine</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search medicines..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Tabs value={category} onValueChange={setCategory}>
              <TabsList>
                {categories.slice(0, 5).map((cat) => (
                  <TabsTrigger key={cat} value={cat} className="text-xs">
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medicine</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => {
                const status = getStockStatus(item.stock, item.minStock)
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.manufacturer}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{item.batch}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.stock}</span>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>₹{item.price.toFixed(2)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{item.expiry}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{item.location}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
