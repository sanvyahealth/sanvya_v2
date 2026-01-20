"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Eye, Download, IndianRupee, CreditCard, Building, CheckCircle } from "lucide-react"
import { billing } from "@/lib/demo-data"

const statusColors = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Partial: "bg-blue-100 text-blue-700",
}

export default function BillingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBill, setSelectedBill] = useState<(typeof billing)[0] | null>(null)

  const filteredBilling = billing.filter((bill) => {
    const matchesSearch =
      bill.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || bill.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalRevenue = billing.reduce((sum, b) => sum + b.totalAmount, 0)
  const pendingAmount = billing.filter((b) => b.status !== "Paid").reduce((sum, b) => sum + b.patientPayable, 0)
  const insuranceClaims = billing.reduce((sum, b) => sum + b.insuranceCovered, 0)

  return (
    <div className="flex flex-col">
      <Header title="Billing" />

      <div className="flex-1 space-y-6 p-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border-border">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                <IndianRupee className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">₹{(totalRevenue / 100000).toFixed(2)}L</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                <CreditCard className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Amount</p>
                <p className="text-2xl font-bold">₹{(pendingAmount / 1000).toFixed(1)}K</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Insurance Claims</p>
                <p className="text-2xl font-bold">₹{(insuranceClaims / 100000).toFixed(2)}L</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Billing Records</CardTitle>
            <CardDescription>View and manage patient billing</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by patient or bill ID..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Partial">Partial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bill ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Insurance</TableHead>
                    <TableHead>Patient Payable</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBilling.map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell className="font-mono text-xs">{bill.id}</TableCell>
                      <TableCell className="font-medium">{bill.patientName}</TableCell>
                      <TableCell>₹{bill.totalAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-green-600">₹{bill.insuranceCovered.toLocaleString()}</TableCell>
                      <TableCell className="font-semibold">₹{bill.patientPayable.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={statusColors[bill.status as keyof typeof statusColors]}>
                          {bill.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => setSelectedBill(bill)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-lg">
                              <DialogHeader>
                                <DialogTitle>Bill Details - {bill.id}</DialogTitle>
                                <DialogDescription>Patient: {bill.patientName}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                                  <div className="flex justify-between text-sm">
                                    <span>Room Charges</span>
                                    <span>₹{bill.roomCharges.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span>Doctor Fees</span>
                                    <span>₹{bill.doctorFees.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span>Nursing Charges</span>
                                    <span>₹{bill.nursingCharges.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span>Lab Charges</span>
                                    <span>₹{bill.labCharges.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span>Medicine Charges</span>
                                    <span>₹{bill.medicineCharges.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span>Miscellaneous</span>
                                    <span>₹{bill.miscCharges.toLocaleString()}</span>
                                  </div>
                                  <div className="border-t border-border pt-2">
                                    <div className="flex justify-between font-semibold">
                                      <span>Total</span>
                                      <span>₹{bill.totalAmount.toLocaleString()}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-between rounded-lg bg-green-50 p-3 text-sm">
                                  <span className="text-green-700">Insurance Covered</span>
                                  <span className="font-semibold text-green-700">
                                    -₹{bill.insuranceCovered.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between rounded-lg bg-primary/10 p-3">
                                  <span className="font-semibold">Patient Payable</span>
                                  <span className="text-lg font-bold text-primary">
                                    ₹{bill.patientPayable.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          {bill.status !== "Paid" && (
                            <Button variant="ghost" size="icon">
                              <CheckCircle className="h-4 w-4 text-green-600" />
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
      </div>
    </div>
  )
}
