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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Activity,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Edit,
  GraduationCap,
  Microscope,
  Plus,
  Search,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

// --- Demo Data ---

const techniciansList = [
  {
    id: "LT-1001",
    firstName: "Robert",
    lastName: "Fox",
    specialization: "Microbiology",
    contact: "+91 98765 43210",
    email: "robert.fox@hospital.com",
    qualification: "M.Sc MLT",
    experience: 8,
    license: "L12345",
    status: "Active",
  },
  {
    id: "LT-1002",
    firstName: "Kristin",
    lastName: "Watson",
    specialization: "Bio-Chemistry",
    contact: "+91 98765 43211",
    email: "kristin.w@hospital.com",
    qualification: "B.Sc MLT",
    experience: 4,
    license: "L67890",
    status: "Active",
  },
  {
    id: "LT-1003",
    firstName: "Cody",
    lastName: "Fisher",
    specialization: "Pathology",
    contact: "+91 98765 43212",
    email: "cody.f@hospital.com",
    qualification: "DMLT",
    experience: 12,
    license: "L11223",
    status: "Inactive",
  },
  {
    id: "LT-1004",
    firstName: "Esther",
    lastName: "Howard",
    specialization: "Microbiology",
    contact: "+91 98765 43213",
    email: "esther.h@hospital.com",
    qualification: "B.Sc MLT",
    experience: 6,
    license: "L44556",
    status: "Active",
  },
  {
    id: "LT-1005",
    firstName: "Jenny",
    lastName: "Wilson",
    specialization: "Hematology",
    contact: "+91 98765 43214",
    email: "jenny.w@hospital.com",
    qualification: "M.Sc MLT",
    experience: 3,
    license: "L77889",
    status: "Suspended",
  },
  {
    id: "LT-1006",
    firstName: "Guy",
    lastName: "Hawkins",
    specialization: "Pathology",
    contact: "+91 98765 43215",
    email: "guy.h@hospital.com",
    qualification: "B.Sc MLT",
    experience: 5,
    license: "L99001",
    status: "Active",
  },
  {
    id: "LT-1007",
    firstName: "Marvin",
    lastName: "McKinney",
    specialization: "Microbiology",
    contact: "+91 98765 43216",
    email: "marvin.m@hospital.com",
    qualification: "DMLT",
    experience: 2,
    license: "L22334",
    status: "Active",
  },
];

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

export default function LabTechnicianPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Dynamic Stats Calculation
  const stats = useMemo(() => {
    const total = techniciansList.length;
    const active = techniciansList.filter((t) => t.status === "Active").length;
    const totalExp = techniciansList.reduce((sum, t) => sum + t.experience, 0);
    const avgExp = total > 0 ? (totalExp / total).toFixed(1) : "0";
    const seniorExp = techniciansList.filter((t) => t.experience >= 5).length;

    // Calculate Top Specialization
    const specializationCount: Record<string, number> = {};
    techniciansList.forEach((t) => {
      specializationCount[t.specialization] =
        (specializationCount[t.specialization] || 0) + 1;
    });

    // Find the specialization with the highest count
    let topSpec = "N/A";
    let maxCount = 0;

    Object.entries(specializationCount).forEach(([spec, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topSpec = spec;
      }
    });

    return {
      total,
      active,
      avgExp,
      seniorExp,
      topSpec,
    };
  }, []);

  const filteredList = techniciansList.filter(
    (tech) =>
      tech.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.qualification.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col">
      <Header title="Lab Technician" />

      <main className="flex-1 p-6 space-y-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Lab Technicians
            </h1>
            <p className="text-muted-foreground">
              Manage laboratory staff, registrations, and performance.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <motion.div variants={itemVariants}>
              <StatsCard
                title="Total Technicians"
                value={stats.total}
                change="Registered staff"
                changeType="neutral"
                icon={Users}
                iconColor="bg-blue-500"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatsCard
                title="Active Technicians"
                value={stats.active}
                change="Currently active"
                changeType="positive"
                icon={Activity}
                iconColor="bg-green-500"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatsCard
                title="Avg Experience"
                value={`${stats.avgExp} Yrs`}
                change="Across team"
                changeType="neutral"
                icon={BookOpen}
                iconColor="bg-amber-500"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatsCard
                title="Experience (5+)"
                value={stats.seniorExp}
                change="Senior technicians"
                changeType="positive"
                icon={Award}
                iconColor="bg-purple-500"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatsCard
                title="Top Specialization"
                value={stats.topSpec}
                change="Most common"
                changeType="neutral"
                icon={Microscope}
                iconColor="bg-indigo-500"
              />
            </motion.div>
          </div>

          {/* Table Section */}
          <motion.div variants={itemVariants}>
            <Card className="border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="space-y-1.5">
                  <CardTitle>All Lab Technicians</CardTitle>
                  <CardDescription>
                    List of all laboratory technicians and their details
                  </CardDescription>
                </div>
                <Dialog
                  open={isAddDialogOpen}
                  onOpenChange={setIsAddDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" /> Add Technician
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add New Technician</DialogTitle>
                      <DialogDescription>
                        Enter the details of the new lab technician.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="Doe" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="specialization">Specialization</Label>
                          <Select>
                            <SelectTrigger id="specialization">
                              <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="microbiology">
                                Microbiology
                              </SelectItem>
                              <SelectItem value="biochemistry">
                                Bio-Chemistry
                              </SelectItem>
                              <SelectItem value="pathology">
                                Pathology
                              </SelectItem>
                              <SelectItem value="hematology">
                                Hematology
                              </SelectItem>
                              <SelectItem value="immunology">
                                Immunology
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="qualification">Qualification</Label>
                          <Input id="qualification" placeholder="e.g. DMLT" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@lab.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" placeholder="+91 98765 43210" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="experience">Experience (Years)</Label>
                          <Input
                            id="experience"
                            type="number"
                            placeholder="5"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="license">License Number</Label>
                          <Input id="license" placeholder="L-123456" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select defaultValue="active">
                          <SelectTrigger id="status">
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsAddDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Add Lab Technician</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, specialization, qualification..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Specialization</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Qualification</TableHead>
                        <TableHead className="text-right">Experience</TableHead>
                        <TableHead>License</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredList.map((tech) => (
                        <TableRow key={tech.id}>
                          <TableCell className="font-mono text-xs">
                            {tech.id}
                          </TableCell>
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              <span>
                                {tech.firstName} {tech.lastName}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {tech.email}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{tech.specialization}</TableCell>
                          <TableCell>{tech.contact}</TableCell>
                          <TableCell>{tech.qualification}</TableCell>
                          <TableCell className="text-right">
                            {tech.experience} Yrs
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            {tech.license}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className={
                                tech.status === "Active"
                                  ? "bg-green-100 text-green-700"
                                  : tech.status === "Inactive"
                                    ? "bg-gray-100 text-gray-700"
                                    : "bg-red-100 text-red-700"
                              }
                            >
                              {tech.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
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
