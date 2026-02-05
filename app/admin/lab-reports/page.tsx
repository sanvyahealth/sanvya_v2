"use client";

import { Header } from "@/components/header";
import { StatsCard } from "@/components/stats-card";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { FilePlus } from "lucide-react";
import { ClipboardCheck } from "lucide-react";

export default function LabReportsPage() {

  const [searchQuery, setSearchQuery] = useState("");

  const reports = [
    {
      id: 1,
      patient: "John Doe",
      doctor: "Dr. Jane Smith",
      patientName: "John Doe",
      testDate: "2025-11-20 10:30:00",
      status: "Pending",
      priority: "High",
      report: "Report Pending",
      abnormalFlag: "N/A",  
    },
    {
      id: 2,
      patient: "Jupin Vaghasiya",
      doctor: "Dr. Bishesh Kasera",
      patientName: "Jupin Vaghasiya",
      testDate: "2025-11-25 17:02:51",
      status: "Completed",
      priority: "Normal",
      report: "Report Available",
      abnormalFlag: "N/A",
    },
    {
      id: 3,
      patient: "Alice Johnson",
      doctor: "Dr. Robert Brown",
      patientName: "Alice Johnson",
      testDate: "2025-11-22 14:15:00",
      status: "In Progress",
      priority: "Low",
      report: "Report In Progress",
      abnormalFlag: "N/A",
    }
  ]

  const filteredReports = reports.filter((report: (typeof reports)[0]) => {
    const matchesSearch =
      report.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.testDate.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="flex flex-col">
      <Header title="Lab Reports" />

      <div className="flex-1 space-y-6 p-6">
        {/* Summary Cards */}
        <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          <StatsCard
            title="Total Reports"
            value={reports.length}
            icon={FilePlus}
            iconColor="bg-blue-500 text-white"
            changeType="neutral"
          />
          <Card className="bg-card hover:shadow-sm hover:shadow-zinc-400 border hover:border-primary duration-300 ease-in-out animation">
            <CardTitle className="flex justify-between items-center p-6">
              <span className="font-medium text-2xl">Status Breakdown</span>
              <div
                className={cn(
                  "flex justify-center items-center rounded-xl w-12 h-12", "bg-green-500",
                )}
              >
                <ClipboardCheck
                  className={cn(
                    "w-6 h-6", "text-primary-foreground",
                  )}
                />
              </div>
            </CardTitle>

            <CardContent>
              <div className="space-y-3 divide-y divide-gray-300">
                <div className="flex justify-between">
                  <span className="font-medium text-sm">Pending</span>
                  <span className="text-sm">{reports.filter(report => report.status === 'Pending').length}</span>
                </div>
                {/* <hr className="border-gray-300"></hr> */}
                <div className="flex justify-between">
                  <span className="font-medium text-sm">In Progress</span>
                  <span className="text-sm">{reports.filter(report => report.status === 'In Progress').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-sm">Completed</span>
                  <span className="text-sm">{reports.filter(report => report.status === 'Completed').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-sm">Validated</span>
                  <span className="float-right text-sm">{reports.filter(report => report.status === 'Validated').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-sm">Released</span>
                  <span className="float-right text-sm">{reports.filter(report => report.status === 'Released').length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="">
                <CardTitle>All Lab Reports</CardTitle>
                <CardDescription>
                  View and manage all laboratory test reports
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex sm:flex-row flex-col gap-3 sm:gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2" />
                <Input
                  placeholder="Search by patient, doctor, test type..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            {/* Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Patient </TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Test Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Report</TableHead>
                    <TableHead>Abnormal Flag</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.id}</TableCell>
                      <TableCell>{report.patient}</TableCell>
                      <TableCell>{report.doctor}</TableCell>
                      <TableCell>{report.patientName}</TableCell>
                      <TableCell>{report.testDate}</TableCell>
                      <TableCell>{report.priority}</TableCell>
                      <TableCell>{report.report}</TableCell>
                      <TableCell>{report.abnormalFlag ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

    </div >
  );
}
