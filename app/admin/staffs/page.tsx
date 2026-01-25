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
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Search, Plus, Eye, Edit, Users } from "lucide-react";
import { staffs } from "@/lib/demo-data";

const statusColors = {
  Admitted: "bg-blue-100 text-blue-700",
  Discharged: "bg-green-100 text-green-700",
};

export default function StaffPage() {
  const [staffList, setStaffList] = useState(staffs);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedStaff, setSelectedStaff] = useState<(typeof staffs)[0] | null>(
    null,
  );

  // Add Staff Form State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    shift: "",
  });

  const handleAddStaff = () => {
    const id = `STF-${Math.floor(100 + Math.random() * 900)}`; // Simple mock ID
    const addedStaff = {
      id,
      name: `${newStaff.firstName} ${newStaff.lastName}`,
      role: "Staff", // Default role
      department: "General", // Default department
      phone: newStaff.phone,
      email: newStaff.email,
      shift: newStaff.shift || "Morning",
      joinDate: new Date().toISOString().split("T")[0],
      status: "Active",
    };

    setStaffList([...staffList, addedStaff]);
    setIsAddOpen(false);
    setNewStaff({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      shift: "",
    });
  };

  const filteredStaffs = staffList.filter((staff: (typeof staffs)[0]) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = roleFilter === "all" || staff.role === roleFilter;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="flex flex-col">
      <Header title="Staff Members" />

      <div className="flex-1 space-y-6 p-6">
        {/* Summary Card */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Staff"
            value={staffList.length}
            icon={Users}
            iconColor="bg-blue-500 text-white"
            change="Active staff members"
            changeType="neutral"
          />
        </div>

        <Card className="border-border">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="">
                <CardTitle>All Staff Members</CardTitle>
                <CardDescription>
                  Manage staff records and roles
                </CardDescription>
              </div>
              {/* Add Staff Button */}
              {/* Add Staff Button */}
              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Staff
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Staff</DialogTitle>
                    <DialogDescription>
                      Enter the details of the new staff member here. Click save
                      when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={newStaff.firstName}
                          onChange={(e) =>
                            setNewStaff({
                              ...newStaff,
                              firstName: e.target.value,
                            })
                          }
                          placeholder="John"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={newStaff.lastName}
                          onChange={(e) =>
                            setNewStaff({
                              ...newStaff,
                              lastName: e.target.value,
                            })
                          }
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newStaff.email}
                        onChange={(e) =>
                          setNewStaff({ ...newStaff, email: e.target.value })
                        }
                        placeholder="john.doe@example.com"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={newStaff.phone}
                        onChange={(e) =>
                          setNewStaff({ ...newStaff, phone: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="shift">Shift</Label>
                      <Input
                        id="shift"
                        value={newStaff.shift}
                        onChange={(e) =>
                          setNewStaff({ ...newStaff, shift: e.target.value })
                        }
                        placeholder="Morning shift, 9-AM to 5PM"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddStaff}>Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex sm:flex-row flex-col gap-3 sm:gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2" />
                <Input
                  placeholder="Search by name or ID..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Role</SelectItem>
                  {staffList.map((staff) => (
                    <SelectItem key={staff.id} value={staff.role}>
                      {staff.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Shift</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaffs.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-mono text-xs">
                        {staff.id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {staff.name}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {staff.role}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {staff.phone}
                        <p className="font-mono text-xs">{staff.email}</p>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {staff.shift}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSelectedStaff(staff)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[95vw] sm:max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>
                                  Staff Details - {staff.name}
                                </DialogTitle>
                                <DialogDescription>
                                  Sanvya ID: {staff.id}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="gap-4 grid sm:grid-cols-2 py-4">
                                <div className="space-y-1">
                                  <Label className="text-muted-foreground">
                                    Role
                                  </Label>
                                  <p className="font-medium">{staff.role}</p>
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-muted-foreground">
                                    Department
                                  </Label>
                                  <p className="font-medium">
                                    {staff.department}
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-muted-foreground">
                                    Contact
                                  </Label>
                                  <p className="font-medium">{staff.phone}</p>
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-muted-foreground">
                                    Email
                                  </Label>
                                  <p className="font-medium">{staff.email}</p>
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-muted-foreground">
                                    Shift
                                  </Label>
                                  <p className="font-medium">{staff.shift}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
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
      </div>
    </div>
  );
}
