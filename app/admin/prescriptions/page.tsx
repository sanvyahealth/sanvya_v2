"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { StatsCard } from "@/components/stats-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Calendar,
  Eye,
  FileText,
  Search,
  Stethoscope,
  User,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";

// --- Demo Data ---

const prescriptionsList = [
  {
    id: "PRS-2024-001",
    patientName: "John Doe",
    patientType: "OPD",
    doctorName: "Dr. Sarah Wilson",
    date: "2024-01-20 10:30 AM",
    diagnosis: "Hypertension",
    medication: "Amlodipine 5mg",
    dosage: "1 tablet daily",
    notes: "Review in 2 weeks",
  },
  {
    id: "PRS-2024-002",
    patientName: "Jane Smith",
    patientType: "IPD",
    doctorName: "Dr. James Chen",
    date: "2024-01-20 11:15 AM",
    diagnosis: "Pneumonia",
    medication: "Azithromycin 500mg",
    dosage: "1 tablet daily for 5 days",
    notes: "Monitor oxygen saturation",
  },
  {
    id: "PRS-2024-003",
    patientName: "Robert Johnson",
    patientType: "OPD",
    doctorName: "Dr. Emily Parker",
    date: "2024-01-21 09:00 AM",
    diagnosis: "Migraine",
    medication: "Sumatriptan 50mg",
    dosage: "As needed for pain",
    notes: "Avoid triggers",
  },
  {
    id: "PRS-2024-004",
    patientName: "Maria Garcia",
    patientType: "OPD",
    doctorName: "Dr. Sarah Wilson",
    date: "2024-01-21 14:20 PM",
    diagnosis: "Type 2 Diabetes",
    medication: "Metformin 500mg",
    dosage: "Twice daily with meals",
    notes: "Dietary consultation scheduled",
  },
  {
    id: "PRS-2024-005",
    patientName: "William Brown",
    patientType: "IPD",
    doctorName: "Dr. Michael Brown",
    date: "2024-01-22 08:30 AM",
    diagnosis: "Post-op Pain",
    medication: "Tramadol 50mg",
    dosage: "Every 6 hours as needed",
    notes: "Assess pain score regularly",
  },
  {
    id: "PRS-2024-006",
    patientName: "Linda Davis",
    patientType: "OPD",
    doctorName: "Dr. James Chen",
    date: "2024-01-22 16:45 PM",
    diagnosis: "Bronchitis",
    medication: "Amoxicillin 500mg",
    dosage: "Three times daily for 7 days",
    notes: "Increase fluid intake",
  },
  {
    id: "PRS-2024-007",
    patientName: "David Wilson",
    patientType: "OPD",
    doctorName: "Dr. Sarah Wilson",
    date: "2024-01-23 11:00 AM",
    diagnosis: "Allergic Rhinitis",
    medication: "Cetirizine 10mg",
    dosage: "One tablet at night",
    notes: "Avoid allergens",
  },
  {
    id: "PRS-2024-008",
    patientName: "Karen Moore",
    patientType: "IPD",
    doctorName: "Dr. Emily Parker",
    date: "2024-01-23 13:15 PM",
    diagnosis: "Stroke Recovery",
    medication: "Atorvastatin 20mg",
    dosage: "One tablet daily",
    notes: "Physical therapy referral",
  },
];

const DOCTOR_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function PrescriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Dynamic Stats Calculation
  const stats = useMemo(() => {
    const totalPrescriptions = prescriptionsList.length;

    const uniqueDoctors = new Set(prescriptionsList.map((p) => p.doctorName))
      .size;
    const uniquePatients = new Set(prescriptionsList.map((p) => p.patientName))
      .size;

    // Chart Data 1: Patient Type (OPD vs IPD)
    const opdCount = prescriptionsList.filter(
      (p) => p.patientType === "OPD",
    ).length;
    const ipdCount = prescriptionsList.filter(
      (p) => p.patientType === "IPD",
    ).length;
    const patientTypeData = [
      { name: "OPD", value: opdCount },
      { name: "IPD", value: ipdCount },
    ];

    // Chart Data 2: Prescription Distribution by Doctor
    const doctorCounts: Record<string, number> = {};
    prescriptionsList.forEach((p) => {
      doctorCounts[p.doctorName] = (doctorCounts[p.doctorName] || 0) + 1;
    });

    const doctorDistributionData = Object.entries(doctorCounts).map(
      ([name, value], index) => ({
        name,
        value,
        fill: DOCTOR_COLORS[index % DOCTOR_COLORS.length],
      }),
    );

    return {
      totalPrescriptions,
      uniqueDoctors,
      uniquePatients,
      patientTypeData,
      doctorDistributionData,
    };
  }, []);

  const filteredList = prescriptionsList.filter(
    (item) =>
      item.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col">
      <Header title="Prescriptions" />

      <main className="flex-1 p-6 space-y-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Prescriptions</h1>
            <p className="text-muted-foreground">
              View and manage patient prescriptions and medication history.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-3">
            <motion.div variants={itemVariants}>
              <StatsCard
                title="Total Prescriptions"
                value={stats.totalPrescriptions}
                change="All time records"
                changeType="neutral"
                icon={FileText}
                iconColor="bg-blue-500"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatsCard
                title="Prescribing Doctors"
                value={stats.uniqueDoctors}
                change="Active prescribers"
                changeType="positive"
                icon={Stethoscope}
                iconColor="bg-green-500"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatsCard
                title="Patients with Prescriptions"
                value={stats.uniquePatients}
                change="Unique patients"
                changeType="neutral"
                icon={User}
                iconColor="bg-purple-500"
              />
            </motion.div>
          </div>

          {/* Charts Section */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Chart 1: Prescriptions by Patient Type */}
            <motion.div variants={itemVariants} className="h-full">
              <Card className="border-border shadow-sm h-full">
                <CardHeader>
                  <CardTitle>Prescriptions by Patient Type</CardTitle>
                  <CardDescription>
                    Distribution between OPD and IPD
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.patientTypeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip
                          cursor={{ fill: "transparent" }}
                          contentStyle={{
                            borderRadius: "8px",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                        <Bar
                          dataKey="value"
                          fill="#3b82f6"
                          radius={[4, 4, 0, 0]}
                          barSize={50}
                          name="Prescriptions"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Chart 2: Doctor Distribution */}
            <motion.div variants={itemVariants} className="h-full">
              <Card className="border-border shadow-sm h-full">
                <CardHeader>
                  <CardTitle>Prescription Distribution by Doctor</CardTitle>
                  <CardDescription>
                    Share of prescriptions issued by each doctor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stats.doctorDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {stats.doctorDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            borderRadius: "8px",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                        <Legend verticalAlign="bottom" height={36} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Table Section */}
          <motion.div variants={itemVariants}>
            <Card className="border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="space-y-1.5">
                  <CardTitle>All Prescriptions</CardTitle>
                  <CardDescription>
                    Detailed list of all issued prescriptions
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search prescriptions by patient, doctor, medication..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-md"
                  />
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Appointment/Admission</TableHead>
                        <TableHead>Medication/Diagnosis</TableHead>
                        <TableHead>Dosage/Notes</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredList.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-mono text-xs">
                            {item.id}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.patientName}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                item.patientType === "OPD"
                                  ? "border-blue-200 bg-blue-50 text-blue-700"
                                  : "border-purple-200 bg-purple-50 text-purple-700"
                              }
                            >
                              {item.patientType}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.doctorName}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {item.date}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {item.medication}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {item.diagnosis}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{item.dosage}</span>
                              <span className="text-xs text-muted-foreground italic">
                                {item.notes}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-gray-500 hover:text-gray-900"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
