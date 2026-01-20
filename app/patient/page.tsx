"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Calendar,
  FileText,
  CreditCard,
  Heart,
  Thermometer,
  Droplets,
  Activity,
  Stethoscope,
  BedDouble,
  Shield,
} from "lucide-react"
import { patients, appointments, billing, labTests } from "@/lib/demo-data"
import Link from "next/link"

// Get current patient data
const currentPatient = patients[0]
const patientAppointments = appointments.filter((apt) => apt.patientId === currentPatient.id)
const patientBilling = billing.find((b) => b.patientId === currentPatient.id)
const patientTests = labTests.filter((t) => t.patientId === currentPatient.id)

export default function PatientDashboard() {
  return (
    <div className="flex flex-col">
      <Header title="Patient Dashboard" />

      <div className="flex-1 space-y-6 p-6">
        {/* Patient Info Card */}
        <Card className="border-border bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    {currentPatient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{currentPatient.name}</h2>
                  <p className="text-muted-foreground">Sanvya ID: {currentPatient.id}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {currentPatient.status}
                    </Badge>
                    <Badge variant="outline">{currentPatient.bloodGroup}</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-lg bg-card p-3 text-center shadow-sm">
                  <BedDouble className="mx-auto h-5 w-5 text-primary" />
                  <p className="mt-1 text-sm font-medium">{currentPatient.ward}</p>
                  <p className="text-xs text-muted-foreground">Ward</p>
                </div>
                <div className="rounded-lg bg-card p-3 text-center shadow-sm">
                  <Stethoscope className="mx-auto h-5 w-5 text-secondary" />
                  <p className="mt-1 text-sm font-medium">{currentPatient.room}</p>
                  <p className="text-xs text-muted-foreground">Room</p>
                </div>
                <div className="rounded-lg bg-card p-3 text-center shadow-sm">
                  <Calendar className="mx-auto h-5 w-5 text-amber-500" />
                  <p className="mt-1 text-sm font-medium">{currentPatient.admissionDate}</p>
                  <p className="text-xs text-muted-foreground">Admitted</p>
                </div>
                <div className="rounded-lg bg-card p-3 text-center shadow-sm">
                  <Shield className="mx-auto h-5 w-5 text-green-500" />
                  <p className="mt-1 text-sm font-medium">{currentPatient.insurance}</p>
                  <p className="text-xs text-muted-foreground">Insurance</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
                <Heart className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">72</p>
                <p className="text-sm text-muted-foreground">Heart Rate (bpm)</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                <Activity className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">120/80</p>
                <p className="text-sm text-muted-foreground">Blood Pressure</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                <Thermometer className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">98.6°F</p>
                <p className="text-sm text-muted-foreground">Temperature</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <Droplets className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">98%</p>
                <p className="text-sm text-muted-foreground">SpO2 Level</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upcoming Appointments */}
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Appointments
                </CardTitle>
                <CardDescription>Your scheduled consultations</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/patient/appointments">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patientAppointments.length > 0 ? (
                  patientAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-primary/10">
                          <span className="text-sm font-bold text-primary">{apt.date.split("-")[2]}</span>
                          <span className="text-xs text-primary">Jan</span>
                        </div>
                        <div>
                          <p className="font-medium">{apt.doctorName}</p>
                          <p className="text-sm text-muted-foreground">
                            {apt.time} • {apt.type}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {apt.status}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">No upcoming appointments</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Billing Summary */}
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-secondary" />
                  Billing Summary
                </CardTitle>
                <CardDescription>Current admission charges</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/patient/billing">View Details</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {patientBilling && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Amount</span>
                      <span className="font-medium">₹{patientBilling.totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Insurance Covered</span>
                      <span className="font-medium text-green-600">
                        -₹{patientBilling.insuranceCovered.toLocaleString()}
                      </span>
                    </div>
                    <div className="border-t border-border pt-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">Your Payable</span>
                        <span className="text-lg font-bold text-primary">
                          ₹{patientBilling.patientPayable.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Payment Status</span>
                      <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                        {patientBilling.status}
                      </Badge>
                    </div>
                    <Progress value={70} className="h-2" />
                    <p className="text-xs text-muted-foreground">70% coverage by insurance</p>
                  </div>

                  <Button className="w-full">Pay Now</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Test Results */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-amber-500" />
                Recent Test Results
              </CardTitle>
              <CardDescription>Your latest lab reports</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/patient/tests">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {patientTests.map((test) => (
                <div key={test.id} className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{test.testName}</p>
                      <p className="text-xs text-muted-foreground">{test.category}</p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={
                        test.status === "Completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                      }
                    >
                      {test.status}
                    </Badge>
                  </div>
                  <div className="mt-3 space-y-1">
                    <p className="text-sm">
                      Result:{" "}
                      <span
                        className={
                          test.result === "Normal"
                            ? "font-medium text-green-600"
                            : test.result === "Pending"
                              ? "text-muted-foreground"
                              : "font-medium text-amber-600"
                        }
                      >
                        {test.result}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">{test.requestDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Doctor Info */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Your Attending Doctor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-secondary/10 text-secondary">AK</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{currentPatient.doctor}</p>
                  <p className="text-sm text-muted-foreground">Cardiologist</p>
                  <p className="text-xs text-muted-foreground">MD, DM (Cardiology), FACC</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline">View Profile</Button>
                <Button>Request Consultation</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
