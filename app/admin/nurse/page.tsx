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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Activity,
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  Users,
  UserPlus,
  Stethoscope,
  Moon,
  Sun,
  Edit,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";

// --- Demo Data ---

const nurseStats = [
  {
    title: "Total Nurses",
    value: "148",
    change: "+12 new this month",
    changeType: "positive",
    icon: Users,
    iconColor: "bg-blue-500",
  },
  {
    title: "Day Shift",
    value: "85",
    change: "Active now",
    changeType: "neutral",
    icon: Sun,
    iconColor: "bg-amber-500",
  },
  {
    title: "Night Shift",
    value: "63",
    change: "Scheduled tonight",
    changeType: "neutral",
    icon: Moon,
    iconColor: "bg-indigo-500",
  },
] as const;

const nursesList = [
  {
    id: "N-1001",
    name: "Sarah Johnson",
    specialization: "Critical Care",
    qualification: "BSc Nursing",
    contact: "+91 98765 43210",
    email: "sarah.j@hospital.com",
    shift: "Day Shift",
    status: "Active",
  },
  {
    id: "N-1002",
    name: "Michael Chen",
    specialization: "Pediatrics",
    qualification: "MSc Nursing",
    contact: "+91 98765 43211",
    email: "m.chen@hospital.com",
    shift: "Night Shift",
    status: "Active",
  },
  {
    id: "N-1003",
    name: "Emily Davis",
    specialization: "Emergency",
    qualification: "Diploma Nursing",
    contact: "+91 98765 43212",
    email: "emily.d@hospital.com",
    shift: "Day Shift",
    status: "On Leave",
  },
  {
    id: "N-1004",
    name: "James Wilson",
    specialization: "Surgical",
    qualification: "BSc Nursing",
    contact: "+91 98765 43213",
    email: "james.w@hospital.com",
    shift: "Night Shift",
    status: "Active",
  },
  {
    id: "N-1005",
    name: "Lisa Anderson",
    specialization: "Cardiology",
    qualification: "MSc Nursing",
    contact: "+91 98765 43214",
    email: "lisa.a@hospital.com",
    shift: "Day Shift",
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

export default function NursePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredNurses = nursesList.filter(
    (nurse) =>
      nurse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nurse.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nurse.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col">
      <Header title="Nurse Management" />

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
              Nurse Management
            </h1>
            <p className="text-muted-foreground">
              Manage nursing staff, schedules, and assignments.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-3">
            {nurseStats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <StatsCard
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  changeType={stat.changeType}
                  icon={stat.icon}
                  iconColor={stat.iconColor}
                />
              </motion.div>
            ))}
          </div>

          {/* Table Section */}
          <motion.div variants={itemVariants}>
            <Card className="border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="space-y-1.5">
                  <CardTitle>All Nurses</CardTitle>
                  <CardDescription>
                    List of all registered nurses and their details
                  </CardDescription>
                </div>
                <Dialog
                  open={isAddDialogOpen}
                  onOpenChange={setIsAddDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <UserPlus className="h-4 w-4" /> Add Nurse
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add New Nurse</DialogTitle>
                      <DialogDescription>
                        Enter the details of the new nurse to add to the system.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="Jane" />
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
                              <SelectItem value="critical">
                                Critical Care
                              </SelectItem>
                              <SelectItem value="pediatrics">
                                Pediatrics
                              </SelectItem>
                              <SelectItem value="emergency">
                                Emergency
                              </SelectItem>
                              <SelectItem value="surgical">Surgical</SelectItem>
                              <SelectItem value="cardiology">
                                Cardiology
                              </SelectItem>
                              <SelectItem value="general">
                                General Ward
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="qualification">Qualification</Label>
                          <Input
                            id="qualification"
                            placeholder="e.g. BSc Nursing"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="jane@hospital.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" placeholder="+91 98765 43210" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="shift">Shift Details</Label>
                        <Select>
                          <SelectTrigger id="shift">
                            <SelectValue placeholder="Select Shift..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="day">
                              Day Shift (8:00 AM - 4:00 PM)
                            </SelectItem>
                            <SelectItem value="evening">
                              Evening Shift (4:00 PM - 12:00 AM)
                            </SelectItem>
                            <SelectItem value="night">
                              Night Shift (12:00 AM - 8:00 AM)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2 rounded-lg border p-4">
                        <Checkbox id="access" />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor="access"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            System Access
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Create a user account for this nurse
                          </p>
                        </div>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsAddDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Add Nurse</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, specialization, email..."
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
                        <TableHead>Shift</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredNurses.map((nurse) => (
                        <TableRow key={nurse.id}>
                          <TableCell className="font-mono text-xs">
                            {nurse.id}
                          </TableCell>
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              <span>{nurse.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {nurse.email}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{nurse.specialization}</TableCell>
                          <TableCell>{nurse.contact}</TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className={
                                nurse.shift === "Day Shift"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-indigo-100 text-indigo-700"
                              }
                            >
                              {nurse.shift}
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
