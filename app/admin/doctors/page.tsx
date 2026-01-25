"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { StatsCard } from "@/components/stats-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Stethoscope,
  Clock,
  Briefcase,
  Phone,
  Mail,
  Award,
} from "lucide-react";
import { doctors } from "@/lib/demo-data";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// --- Stats Calculation ---
const totalDoctors = doctors.length;
const experiences = doctors.map((d) => parseInt(d.experience));
const avgExperience =
  experiences.reduce((a, b) => a + b, 0) / experiences.length;
const maxExperience = Math.max(...experiences);
const specializations = new Set(doctors.map((d) => d.specialization)).size;
const withContact = doctors.filter((d) => d.phone).length;
const withEmail = doctors.filter((d) => d.email).length;

// --- Chart Data Preparation ---
const specializationCount: Record<string, number> = {};
doctors.forEach((d) => {
  specializationCount[d.specialization] =
    (specializationCount[d.specialization] || 0) + 1;
});
const specializationData = Object.entries(specializationCount).map(
  ([name, value]) => ({ name, value }),
);

const experienceData = doctors
  .map((d) => ({
    name: d.name,
    experience: parseInt(d.experience),
  }))
  .sort((a, b) => a.experience - b.experience);

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctorList, setDoctorList] = useState(doctors);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialization: "",
    email: "",
    phone: "",
    experience: "",
  });

  const filteredDoctors = doctorList.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddDoctor = () => {
    // Mock Add
    const id = `DOC-${Math.floor(100 + Math.random() * 900)}`;
    const addedDoc = {
      ...doctors[0], // Copy generic fields
      id,
      name: newDoctor.name,
      specialization: newDoctor.specialization,
      email: newDoctor.email,
      phone: newDoctor.phone,
      experience: `${newDoctor.experience} years`,
    };
    setDoctorList([...doctorList, addedDoc]);
    setIsAddOpen(false);
    setNewDoctor({
      name: "",
      specialization: "",
      email: "",
      phone: "",
      experience: "",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <Header title="Doctors Management" />

      <main className="flex-1 space-y-8 p-6">
        {/* 1. Stats Cards (6 items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatsCard
            title="Total Doctors"
            value={totalDoctors}
            icon={Users}
            iconColor="bg-blue-100 text-blue-600"
          />
          <StatsCard
            title="Avg Experience"
            value={`${avgExperience.toFixed(1)} Yrs`}
            icon={Clock}
            iconColor="bg-green-100 text-green-600"
          />
          <StatsCard
            title="Specializations"
            value={specializations}
            icon={Stethoscope}
            iconColor="bg-purple-100 text-purple-600"
          />
          <StatsCard
            title="With Contact"
            value={withContact}
            icon={Phone}
            iconColor="bg-yellow-100 text-yellow-600"
          />
          <StatsCard
            title="With Email"
            value={withEmail}
            icon={Mail}
            iconColor="bg-red-100 text-red-600"
          />
          <StatsCard
            title="Max Experience"
            value={`${maxExperience} Yrs`}
            icon={Award}
            iconColor="bg-indigo-100 text-indigo-600"
          />
        </div>

        {/* 2. Graphs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Specialization Distribution */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Specialization Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={specializationData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {specializationData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Experience Distribution - Line Chart */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Experience Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={experienceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" hide />{" "}
                    {/* Hiding names as they might clutter */}
                    <YAxis
                      label={{
                        value: "Years",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="experience"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Years of Experience"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 3. Doctors Table */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <CardTitle>All Doctors</CardTitle>
                <CardDescription>
                  List of all registered doctors
                </CardDescription>
              </div>
              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add New Doctor
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Doctor</DialogTitle>
                    <DialogDescription>
                      Fill in the details to add a new doctor.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={newDoctor.name}
                          onChange={(e) =>
                            setNewDoctor({ ...newDoctor, name: e.target.value })
                          }
                          placeholder="Dr. John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="spec">Specialization</Label>
                        <Input
                          id="spec"
                          value={newDoctor.specialization}
                          onChange={(e) =>
                            setNewDoctor({
                              ...newDoctor,
                              specialization: e.target.value,
                            })
                          }
                          placeholder="Cardiology"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={newDoctor.email}
                        onChange={(e) =>
                          setNewDoctor({ ...newDoctor, email: e.target.value })
                        }
                        placeholder="doctor@example.com"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={newDoctor.phone}
                          onChange={(e) =>
                            setNewDoctor({
                              ...newDoctor,
                              phone: e.target.value,
                            })
                          }
                          placeholder="+91..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="exp">Experience (Yrs)</Label>
                        <Input
                          id="exp"
                          type="number"
                          value={newDoctor.experience}
                          onChange={(e) =>
                            setNewDoctor({
                              ...newDoctor,
                              experience: e.target.value,
                            })
                          }
                          placeholder="5"
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddDoctor}>Save Doctor</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="relative mt-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or ID..."
                className="pl-8 max-w-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDoctors.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.id}</TableCell>
                    <TableCell>{doc.name}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        {doc.specialization}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col text-xs">
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" /> {doc.phone}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Mail className="h-3 w-3" /> {doc.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{doc.experience}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
