"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export default function PACSViewerPage() {
  const [selectedStudy, setSelectedStudy] = useState<any | null>(null)
  const [brightness, setBrightness] = useState([50])
  const [contrast, setContrast] = useState([50])

  const recentStudies = [
    {
      id: "STD001",
      patient: "Rajesh Kumar",
      patientId: "PT001",
      modality: "CT",
      study: "CT Chest",
      date: "2024-01-15",
      images: 120,
      status: "Unread",
    },
    {
      id: "STD002",
      patient: "Priya Patel",
      patientId: "PT002",
      modality: "MRI",
      study: "MRI Brain",
      date: "2024-01-15",
      images: 85,
      status: "Read",
    },
    {
      id: "STD003",
      patient: "Amit Singh",
      patientId: "PT003",
      modality: "X-Ray",
      study: "X-Ray Chest PA",
      date: "2024-01-15",
      images: 2,
      status: "Unread",
    },
    {
      id: "STD004",
      patient: "Meena Devi",
      patientId: "PT004",
      modality: "USG",
      study: "USG Abdomen",
      date: "2024-01-14",
      images: 24,
      status: "Read",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">PACS Viewer</h1>
          <p className="text-slate-600">Picture Archiving and Communication System</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Study List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Studies</Car\
