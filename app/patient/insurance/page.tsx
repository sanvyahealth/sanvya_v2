"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, CheckCircle, FileText, Upload, AlertCircle } from "lucide-react"
import { patients } from "@/lib/demo-data"

const currentPatient = patients[0]

const insuranceDetails = {
  provider: currentPatient.insurance,
  policyNumber: currentPatient.policyNumber,
  policyType: "Family Floater",
  sumInsured: 500000,
  claimed: 50000,
  available: 450000,
  validTill: "Dec 31, 2024",
  status: "Active",
}

const claims = [
  {
    id: "CLM-2024-001",
    date: "Jan 20, 2024",
    amount: 50000,
    status: "Approved",
    description: "Hospitalization - Cardiac Care",
  },
  { id: "CLM-2023-045", date: "Nov 15, 2023", amount: 15000, status: "Approved", description: "OPD Treatment" },
]

export default function InsurancePage() {
  return (
    <div className="flex flex-col">
      <Header title="Insurance" />

      <div className="flex-1 space-y-6 p-6">
        {/* Insurance Card */}
        <Card className="border-border bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary">
                  <Shield className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{insuranceDetails.provider}</h2>
                  <p className="text-muted-foreground">Policy No: {insuranceDetails.policyNumber}</p>
                  <Badge variant="secondary" className="mt-2 bg-green-100 text-green-700">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    {insuranceDetails.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                <div className="rounded-lg bg-card p-3 text-center shadow-sm">
                  <p className="text-2xl font-bold text-primary">
                    ₹{(insuranceDetails.sumInsured / 100000).toFixed(1)}L
                  </p>
                  <p className="text-xs text-muted-foreground">Sum Insured</p>
                </div>
                <div className="rounded-lg bg-card p-3 text-center shadow-sm">
                  <p className="text-2xl font-bold text-green-600">
                    ₹{(insuranceDetails.available / 100000).toFixed(1)}L
                  </p>
                  <p className="text-xs text-muted-foreground">Available</p>
                </div>
                <div className="rounded-lg bg-card p-3 text-center shadow-sm">
                  <p className="text-sm font-semibold">{insuranceDetails.validTill}</p>
                  <p className="text-xs text-muted-foreground">Valid Till</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Coverage Details */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Coverage Details</CardTitle>
              <CardDescription>Your insurance coverage breakdown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Coverage Used</span>
                  <span className="font-medium">10%</span>
                </div>
                <Progress value={10} className="h-3" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹{insuranceDetails.claimed.toLocaleString()} claimed</span>
                  <span>₹{insuranceDetails.available.toLocaleString()} available</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between rounded-lg bg-muted/50 p-3">
                  <span className="text-muted-foreground">Policy Type</span>
                  <span className="font-medium">{insuranceDetails.policyType}</span>
                </div>
                <div className="flex justify-between rounded-lg bg-muted/50 p-3">
                  <span className="text-muted-foreground">Room Category</span>
                  <span className="font-medium">Private AC</span>
                </div>
                <div className="flex justify-between rounded-lg bg-muted/50 p-3">
                  <span className="text-muted-foreground">Network Hospital</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Yes
                  </Badge>
                </div>
                <div className="flex justify-between rounded-lg bg-muted/50 p-3">
                  <span className="text-muted-foreground">Cashless Facility</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Available
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your insurance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Download Policy Document
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Documents
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <AlertCircle className="mr-2 h-4 w-4" />
                File New Claim
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Shield className="mr-2 h-4 w-4" />
                Request Pre-Authorization
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Claims History */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Claims History</CardTitle>
            <CardDescription>Your previous insurance claims</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {claims.map((claim) => (
                <div
                  key={claim.id}
                  className="flex flex-col gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{claim.description}</p>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {claim.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {claim.id} • {claim.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-lg font-semibold text-primary">₹{claim.amount.toLocaleString()}</p>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
