"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, User, Pill, Printer, CheckCircle2 } from "lucide-react"

const samplePrescription = {
  id: "RX-2024-001",
  patientName: "Rajesh Kumar Sharma",
  patientId: "SNV-2024-001",
  age: 45,
  gender: "Male",
  doctor: "Dr. Anil Kapoor",
  department: "Cardiology",
  date: "2024-01-28",
  medicines: [
    { id: 1, name: "Atorvastatin 10mg", qty: 30, dosage: "1 tablet at night", price: 12.5, available: true },
    { id: 2, name: "Aspirin 75mg", qty: 30, dosage: "1 tablet after breakfast", price: 3.2, available: true },
    { id: 3, name: "Metoprolol 25mg", qty: 60, dosage: "1 tablet twice daily", price: 8.5, available: true },
    { id: 4, name: "Clopidogrel 75mg", qty: 30, dosage: "1 tablet at night", price: 18.0, available: false },
  ],
}

export default function DispensePage() {
  const [rxId, setRxId] = useState("")
  const [prescription, setPrescription] = useState<typeof samplePrescription | null>(null)
  const [selectedMeds, setSelectedMeds] = useState<number[]>([])

  const handleSearch = () => {
    // Demo: always show sample prescription
    setPrescription(samplePrescription)
    setSelectedMeds(samplePrescription.medicines.filter((m) => m.available).map((m) => m.id))
  }

  const toggleMedicine = (id: number) => {
    setSelectedMeds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const calculateTotal = () => {
    if (!prescription) return 0
    return prescription.medicines
      .filter((m) => selectedMeds.includes(m.id))
      .reduce((sum, m) => sum + m.price * m.qty, 0)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Dispense Medicine</h1>
        <p className="text-muted-foreground">Search prescription and dispense medicines</p>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Prescription</CardTitle>
          <CardDescription>Enter prescription ID or patient Sanvya ID</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Enter Rx ID (e.g., RX-2024-001) or Patient ID"
                value={rxId}
                onChange={(e) => setRxId(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </CardContent>
      </Card>

      {prescription && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Patient & Prescription Info */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Prescription: {prescription.id}</CardTitle>
                  <CardDescription>Date: {prescription.date}</CardDescription>
                </div>
                <Badge variant="secondary">Pending</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Patient Info */}
              <div className="flex items-center gap-4 rounded-lg bg-muted/50 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{prescription.patientName}</p>
                  <p className="text-sm text-muted-foreground">
                    {prescription.patientId} • {prescription.age} yrs • {prescription.gender}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Prescribed by</p>
                  <p className="font-medium">{prescription.doctor}</p>
                </div>
              </div>

              {/* Medicines List */}
              <div>
                <h4 className="mb-3 font-medium">Prescribed Medicines</h4>
                <div className="space-y-3">
                  {prescription.medicines.map((med) => (
                    <div
                      key={med.id}
                      className={`flex items-center gap-4 rounded-lg border p-4 ${
                        !med.available ? "border-red-200 bg-red-50" : "border-border"
                      }`}
                    >
                      <Checkbox
                        checked={selectedMeds.includes(med.id)}
                        onCheckedChange={() => toggleMedicine(med.id)}
                        disabled={!med.available}
                      />
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Pill className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{med.name}</p>
                          {!med.available && (
                            <Badge variant="destructive" className="text-xs">
                              Out of Stock
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{med.dosage}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{(med.price * med.qty).toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {med.qty} × ₹{med.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Billing Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {prescription.medicines
                  .filter((m) => selectedMeds.includes(m.id))
                  .map((med) => (
                    <div key={med.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{med.name}</span>
                      <span>₹{(med.price * med.qty).toFixed(2)}</span>
                    </div>
                  ))}
              </div>
              <div className="border-t border-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">GST (12%)</span>
                  <span>₹{(calculateTotal() * 0.12).toFixed(2)}</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-border pt-2 text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{(calculateTotal() * 1.12).toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Payment Method</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="text-xs bg-transparent">
                    Cash
                  </Button>
                  <Button variant="outline" className="text-xs bg-transparent">
                    Card
                  </Button>
                  <Button variant="outline" className="text-xs bg-transparent">
                    UPI
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Dispense & Generate Bill
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Prescription
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
