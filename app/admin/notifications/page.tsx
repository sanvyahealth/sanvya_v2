"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Stethoscope,
  Calendar,
  FileText,
  FlaskConical,
  ClipboardList,
  Activity,
  BedDouble,
  Pill,
  FileBarChart,
  User,
  HeartPulse,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Mock Data ---

const opdNotifications = [
  {
    id: 1,
    type: "Recent Prescriptions",
    title: "Prescription #8921",
    patient: "Rajesh Kumar",
    doctor: "Dr. Anil Kapoor",
    medicines: "Paracetamol 500mg, Amoxicillin 250mg",
    time: "10 mins ago",
  },
  {
    id: 2,
    type: "Recent Lab reports",
    title: "Blood Report Ready",
    patient: "Priya Patel",
    doctor: "Dr. Meera Reddy",
    medicines: "-",
    time: "25 mins ago",
  },
  {
    id: 3,
    type: "Recent Appointments",
    title: "New Appointment",
    patient: "Amit Singh",
    doctor: "Dr. Suresh Menon",
    medicines: "-",
    time: "1 hour ago",
  },
  {
    id: 4,
    type: "OPD doctor notifications",
    title: "Doctor Schedule Update",
    patient: "-",
    doctor: "Dr. Kavita Nair",
    medicines: "-",
    time: "2 hours ago",
  },
  {
    id: 5,
    type: "Recent Prescriptions",
    title: "Prescription #8922",
    patient: "Sunita Verma",
    doctor: "Dr. Anil Kapoor",
    medicines: "Ibuprofen 400mg, Vit C",
    time: "3 hours ago",
  },
];

const ipdNotifications = [
  {
    id: 101,
    type: "Recent admissions",
    code: "#IPD202512000001",
    patient: "Rahul Sharma",
    doctor: "Dr. Anil Kapoor",
    ward: "ICU",
    room: "101",
    status: "Admitted",
    diagnosis: "Acute Cardiac Arrest",
    time: "15 mins ago",
  },
  {
    id: 102,
    type: "IPD Prescriptions",
    code: "#IPD202512000002",
    patient: "Sneha Gupta",
    doctor: "Dr. Meera Reddy",
    ward: "Maternity",
    room: "205",
    status: "Active",
    diagnosis: "Severe Anemia",
    time: "45 mins ago",
  },
  {
    id: 103,
    type: "Progress Notes",
    code: "#IPD202512000005",
    patient: "Vikram Singh",
    doctor: "Dr. Suresh Menon",
    ward: "General",
    room: "302",
    status: "Observation",
    diagnosis: "Post-op Recovery",
    time: "2 hours ago",
  },
  {
    id: 104,
    type: "Discharge Summaries",
    code: "#IPD202512000008",
    patient: "Anjali Desai",
    doctor: "Dr. Kavita Nair",
    ward: "General",
    room: "305",
    status: "Discharged",
    diagnosis: "Viral Fever",
    time: "4 hours ago",
  },
];

// --- Components ---

function SmallClickableCard({
  title,
  icon: Icon,
  isActive,
  onClick,
  colorClass,
}: {
  title: string;
  icon: any;
  isActive: boolean;
  onClick: () => void;
  colorClass: string; // e.g., "bg-blue-100 text-blue-600"
}) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "cursor-pointer transition-all hover:shadow-md border-2",
        isActive ? "border-primary bg-primary/5" : "border-transparent bg-card",
      )}
    >
      <CardContent className="p-4 flex flex-col items-center justify-center gap-3 text-center h-full">
        <div className={`p-2 rounded-full ${colorClass}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-xs font-semibold leading-tight">{title}</span>
      </CardContent>
    </Card>
  );
}

function SelectionCard({
  title,
  isActive,
  onClick,
}: {
  title: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-xl border p-4 transition-all",
        isActive
          ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary ring-offset-2"
          : "bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground",
      )}
    >
      <h3 className="font-semibold text-center">{title}</h3>
    </div>
  );
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<"OPD" | "IPD">("OPD");
  const [filter, setFilter] = useState("All");

  const displayedOPD =
    filter === "All"
      ? opdNotifications
      : opdNotifications.filter((n) => n.type === filter);

  const displayedIPD =
    filter === "All"
      ? ipdNotifications
      : ipdNotifications.filter((n) => n.type === filter);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <Header title="Notifications" />

      <main className="flex-1 space-y-6 p-6">
        {/* 1. Top Type Selection */}
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <SelectionCard
            title="OPD Notifications"
            isActive={activeTab === "OPD"}
            onClick={() => {
              setActiveTab("OPD");
              setFilter("All");
            }}
          />
          <SelectionCard
            title="IPD Notification"
            isActive={activeTab === "IPD"}
            onClick={() => {
              setActiveTab("IPD");
              setFilter("All");
            }}
          />
        </div>

        {activeTab === "OPD" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
            {/* OPD Summary Box */}
            <Card className="border-none shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="text-blue-900">
                  OPD Department Summary
                </CardTitle>
                <CardDescription>
                  Overview of all outpatient department activities and alerts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                  {[
                    { label: "Total Notifications", value: 124 },
                    { label: "Doctor Alerts", value: 5 },
                    { label: "Appointments", value: 45 },
                    { label: "Prescriptions", value: 32 },
                    { label: "Lab Reports", value: 18 },
                    { label: "Reports", value: 12 },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/60 p-3 rounded-lg">
                      <p className="text-2xl font-bold text-blue-700">
                        {stat.value}
                      </p>
                      <p className="text-xs text-blue-900/60 font-medium">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* OPD Filter Cards (6) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                {
                  title: "All OPD notifications",
                  type: "All",
                  icon: Bell,
                  color: "bg-gray-100 text-gray-600",
                },
                {
                  title: "OPD doctor notifications",
                  type: "OPD doctor notifications",
                  icon: Stethoscope,
                  color: "bg-blue-100 text-blue-600",
                },
                {
                  title: "Recent Appointments",
                  type: "Recent Appointments",
                  icon: Calendar,
                  color: "bg-green-100 text-green-600",
                },
                {
                  title: "Recent Prescriptions",
                  type: "Recent Prescriptions",
                  icon: FileText,
                  color: "bg-purple-100 text-purple-600",
                },
                {
                  title: "Recent Lab reports",
                  type: "Recent Lab reports",
                  icon: FlaskConical,
                  color: "bg-amber-100 text-amber-600",
                },
                {
                  title: "Recent reports",
                  type: "Recent reports",
                  icon: ClipboardList,
                  color: "bg-pink-100 text-pink-600",
                },
              ].map((card) => (
                <SmallClickableCard
                  key={card.title}
                  title={card.title}
                  icon={card.icon}
                  isActive={filter === card.type}
                  onClick={() => setFilter(card.type)}
                  colorClass={card.color}
                />
              ))}
            </div>

            {/* OPD Notification List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {filter === "All" ? "All Notifications" : filter}
              </h3>
              {displayedOPD.map((notif) => (
                <Card key={notif.id} className="border-none shadow-sm">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="p-3 rounded-full bg-blue-50">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-foreground">
                          {notif.title}
                        </h4>
                        <span className="text-xs text-muted-foreground">
                          {notif.time}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm mt-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Patient:
                          </span>{" "}
                          {notif.patient}
                        </div>
                        <div className="flex items-center gap-2">
                          <Stethoscope className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Doctor:</span>{" "}
                          {notif.doctor}
                        </div>
                        <div className="flex items-center gap-2">
                          <Pill className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Medicines:
                          </span>{" "}
                          {notif.medicines}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "IPD" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
            {/* IPD Summary Card */}
            <Card className="border-none shadow-sm bg-gradient-to-r from-emerald-50 to-teal-50">
              <CardHeader>
                <CardTitle className="text-emerald-900">
                  IPD Department Summary
                </CardTitle>
                <CardDescription>
                  In-patient department status and critical updates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  {[
                    { label: "Recent Admissions", value: 8 },
                    { label: "IPD Prescriptions", value: 42 },
                    { label: "Progress Notes", value: 156 },
                    { label: "Discharge Summaries", value: 3 },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/60 p-3 rounded-lg">
                      <p className="text-2xl font-bold text-emerald-700">
                        {stat.value}
                      </p>
                      <p className="text-xs text-emerald-900/60 font-medium">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* IPD Filter Cards (4) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  title: "Recent Admissions",
                  type: "Recent admissions",
                  icon: BedDouble,
                  color: "bg-blue-100 text-blue-600",
                },
                {
                  title: "IPD Prescriptions",
                  type: "IPD Prescriptions",
                  icon: FileText,
                  color: "bg-green-100 text-green-600",
                },
                {
                  title: "Progress Notes",
                  type: "Progress Notes",
                  icon: Activity,
                  color: "bg-amber-100 text-amber-600",
                },
                {
                  title: "Discharge Summaries",
                  type: "Discharge Summaries",
                  icon: FileBarChart,
                  color: "bg-indigo-100 text-indigo-600",
                },
              ].map((card) => (
                <SmallClickableCard
                  key={card.title}
                  title={card.title}
                  icon={card.icon}
                  isActive={filter === card.type}
                  onClick={() => setFilter(card.type)}
                  colorClass={card.color}
                />
              ))}
            </div>

            {/* IPD Notification List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {filter === "All" ? "All Notifications" : filter}
              </h3>
              {displayedIPD.map((notif) => (
                <Card key={notif.id} className="border-none shadow-sm">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="p-3 rounded-full bg-emerald-50">
                      <HeartPulse className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="font-mono">
                            {notif.code}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className={
                              notif.status === "Admitted"
                                ? "bg-blue-100 text-blue-700"
                                : notif.status === "Active"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-gray-100 text-gray-700"
                            }
                          >
                            {notif.status}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {notif.time}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-4 text-sm mt-3">
                        <div>
                          <span className="text-muted-foreground block text-xs">
                            Patient
                          </span>
                          <span className="font-medium">{notif.patient}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-xs">
                            Doctor
                          </span>
                          <span className="font-medium">{notif.doctor}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-xs">
                            Location
                          </span>
                          <span className="font-medium">
                            {notif.ward} - {notif.room}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-xs">
                            Diagnosis
                          </span>
                          <span className="font-medium">{notif.diagnosis}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
