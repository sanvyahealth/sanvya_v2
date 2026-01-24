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
  Edit,
  FlaskConical,
  Lock,
  Plus,
  Search,
  Shield,
  Stethoscope,
  Trash2,
  User,
  UserCog,
  UserPlus,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

// --- Demo Data ---

const usersList = [
  {
    id: "U-001",
    username: "admin_super",
    role: "Admin",
    linkedTo: "Admin System",
    details: "Kapil (Super Admin)",
    status: "Active",
  },
  {
    id: "U-002",
    username: "dr_sarah",
    role: "Doctor",
    linkedTo: "DOC-001",
    details: "Dr. Sarah Wilson",
    status: "Active",
  },
  {
    id: "U-003",
    username: "nurse_jane",
    role: "Nurse",
    linkedTo: "N-1001",
    details: "Jane Doe",
    status: "Active",
  },
  {
    id: "U-004",
    username: "tech_bob",
    role: "Lab Technician",
    linkedTo: "LT-1001",
    details: "Bob Smith",
    status: "Active",
  },
  {
    id: "U-005",
    username: "pharm_alice",
    role: "Pharmacist",
    linkedTo: "PH-1001",
    details: "Alice Freeman",
    status: "Active",
  },
  {
    id: "U-006",
    username: "staff_mike",
    role: "Staff",
    linkedTo: "ST-001",
    details: "Mike Johnson",
    status: "Inactive",
  },
  {
    id: "U-007",
    username: "dr_james",
    role: "Doctor",
    linkedTo: "DOC-002",
    details: "Dr. James Chen",
    status: "Active",
  },
  {
    id: "U-008",
    username: "nurse_emily",
    role: "Nurse",
    linkedTo: "N-1003",
    details: "Emily Davis",
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

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Dynamic Stats Calculation
  const stats = useMemo(() => {
    return {
      admin: usersList.filter((u) => u.role === "Admin").length,
      doctor: usersList.filter((u) => u.role === "Doctor").length,
      staff: usersList.filter((u) => u.role === "Staff").length,
      nurse: usersList.filter((u) => u.role === "Nurse").length,
      labTech: usersList.filter((u) => u.role === "Lab Technician").length,
      pharmacist: usersList.filter((u) => u.role === "Pharmacist").length,
    };
  }, []);

  const filteredList = usersList.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.details.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col">
      <Header title="User Management" />

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
              User Management
            </h1>
            <p className="text-muted-foreground">
              Manage system access and user accounts across all departments.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <motion.div variants={itemVariants}>
              <StatsCard
                title="Admin Users"
                value={stats.admin}
                icon={Shield}
                iconColor="bg-slate-500"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatsCard
                title="Doctor Users"
                value={stats.doctor}
                icon={Stethoscope}
                iconColor="bg-blue-500"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatsCard
                title="Staff Users"
                value={stats.staff}
                icon={UserCog}
                iconColor="bg-gray-500"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatsCard
                title="Nurse Users"
                value={stats.nurse}
                icon={User}
                iconColor="bg-pink-500"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatsCard
                title="Lab Tech Users"
                value={stats.labTech}
                icon={FlaskConical}
                iconColor="bg-purple-500"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatsCard
                title="Pharmacy Users"
                value={stats.pharmacist}
                icon={Activity}
                iconColor="bg-green-500"
              />
            </motion.div>
          </div>

          {/* Table Section */}
          <motion.div variants={itemVariants}>
            <Card className="border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="space-y-1.5">
                  <CardTitle>User List</CardTitle>
                  <CardDescription>
                    All registered system users and their roles
                  </CardDescription>
                </div>
                <Dialog
                  open={isAddDialogOpen}
                  onOpenChange={setIsAddDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <UserPlus className="h-4 w-4" /> Add New User
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                      <DialogDescription>
                        Create a new user account and assign a role.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" placeholder="jdoe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select>
                          <SelectTrigger id="role">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="doctor">Doctor</SelectItem>
                            <SelectItem value="nurse">Nurse</SelectItem>
                            <SelectItem value="staff">Staff</SelectItem>
                            <SelectItem value="lab_technician">
                              Lab Technician
                            </SelectItem>
                            <SelectItem value="pharmacist">
                              Pharmacist
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkTo">Link to Lab Technician</Label>
                        <Select>
                          <SelectTrigger id="linkTo">
                            <SelectValue placeholder="Select technician..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bob">Bob Smith</SelectItem>
                            <SelectItem value="john">John Doe</SelectItem>
                            <SelectItem value="alice">Alice Freeman</SelectItem>
                            <SelectItem value="mike">Mike Johnson</SelectItem>
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
                      <Button type="submit">Create User</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by username, role..."
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
                        <TableHead>Username</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Linked To</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredList.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-mono text-xs">
                            {user.id}
                          </TableCell>
                          <TableCell className="font-medium">
                            {user.username}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                user.role === "Admin"
                                  ? "border-slate-500 text-slate-700 font-bold"
                                  : user.role === "Doctor"
                                    ? "border-blue-500 text-blue-700"
                                    : "border-gray-400 text-gray-700"
                              }
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            {user.linkedTo}
                          </TableCell>
                          <TableCell>{user.details}</TableCell>
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
