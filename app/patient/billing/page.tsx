"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, Download, IndianRupee, Building, Receipt, CheckCircle } from "lucide-react"
import { billing } from "@/lib/demo-data"

const patientBilling = billing.find((b) => b.patientId === "SNV-2024-001")!

const paymentHistory = [
  { date: "Jan 20, 2024", amount: 10000, method: "UPI", status: "Success" },
  { date: "Jan 18, 2024", amount: 5000, method: "Card", status: "Success" },
]

export default function PatientBillingPage() {
  return (
    <div className="flex flex-col">
      <Header title="Billing" />

      <div className="flex-1 space-y-6 p-6">
        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border-border">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <IndianRupee className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Bill</p>
                <p className="text-2xl font-bold">₹{patientBilling.totalAmount.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                <Building className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Insurance Covered</p>
                <p className="text-2xl font-bold text-green-600">₹{patientBilling.insuranceCovered.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                <CreditCard className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Your Payable</p>
                <p className="text-2xl font-bold text-amber-600">₹{patientBilling.patientPayable.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Bill Breakdown */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-primary" />
                Bill Breakdown
              </CardTitle>
              <CardDescription>Detailed charges for your stay</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between rounded-lg bg-muted/50 p-3">
                  <span className="text-muted-foreground">Room Charges</span>
                  <span className="font-medium">₹{patientBilling.roomCharges.toLocaleString()}</span>
                </div>
                <div className="flex justify-between rounded-lg bg-muted/50 p-3">
                  <span className="text-muted-foreground">Doctor Fees</span>
                  <span className="font-medium">₹{patientBilling.doctorFees.toLocaleString()}</span>
                </div>
                <div className="flex justify-between rounded-lg bg-muted/50 p-3">
                  <span className="text-muted-foreground">Nursing Charges</span>
                  <span className="font-medium">₹{patientBilling.nursingCharges.toLocaleString()}</span>
                </div>
                <div className="flex justify-between rounded-lg bg-muted/50 p-3">
                  <span className="text-muted-foreground">Lab Charges</span>
                  <span className="font-medium">₹{patientBilling.labCharges.toLocaleString()}</span>
                </div>
                <div className="flex justify-between rounded-lg bg-muted/50 p-3">
                  <span className="text-muted-foreground">Medicine Charges</span>
                  <span className="font-medium">₹{patientBilling.medicineCharges.toLocaleString()}</span>
                </div>
                <div className="flex justify-between rounded-lg bg-muted/50 p-3">
                  <span className="text-muted-foreground">Miscellaneous</span>
                  <span className="font-medium">₹{patientBilling.miscCharges.toLocaleString()}</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{patientBilling.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-secondary" />
                Payment Summary
              </CardTitle>
              <CardDescription>Insurance coverage and payment status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-green-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-900">Insurance Coverage</span>
                  </div>
                  <span className="font-bold text-green-600">₹{patientBilling.insuranceCovered.toLocaleString()}</span>
                </div>
                <div className="mt-2">
                  <Progress value={75} className="h-2" />
                  <p className="mt-1 text-xs text-green-700">75% of bill covered by Star Health</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Bill</span>
                  <span className="font-medium">₹{patientBilling.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Insurance Covered</span>
                  <span>-₹{patientBilling.insuranceCovered.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-blue-600">
                  <span>Paid</span>
                  <span>-₹15,000</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Balance Due</span>
                    <span className="font-bold text-amber-600">₹2,200</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1">Pay Now</Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Bill
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment History */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Your previous payments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Receipt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.map((payment, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell className="font-medium">₹{payment.amount.toLocaleString()}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Download className="mr-1 h-4 w-4" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
