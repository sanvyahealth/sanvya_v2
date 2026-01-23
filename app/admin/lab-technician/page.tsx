"use client";

import { Header } from "@/components/header";

export default function LabTechnicianPage() {
  return (
    <div className="flex flex-col">
      <Header title="Lab Technician" />
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Lab Technician</h2>
        </div>
      </div>
    </div>
  );
}
