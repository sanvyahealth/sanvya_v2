"use client";

import { Header } from "@/components/header";

export default function NursePage() {
  return (
    <div className="flex flex-col">
      <Header title="Nurse Management" />
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            Nurse Management
          </h2>
        </div>
      </div>
    </div>
  );
}
