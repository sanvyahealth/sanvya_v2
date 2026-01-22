"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Shield, Users, Building2, ArrowRight, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

export default function HomePage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gradient-blue">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center">
              <Image
                src="/color.png"
                alt="Sanvya Logo"
                width={50}
                height={50}
                className="h-50 w-50 object-contain"
              />
            </div>
            <span className="text-lg sm:text-xl font-semibold text-foreground">Sanvya</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href="/auth">Sign In</Link>
            </Button>
            <Button asChild size="sm" className="sm:size-default">
              <Link href="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="text-balance text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
            Modern Hospital Management for <span className="text-primary">Healthcare Excellence</span>
          </h1>
          <p className="mt-6 text-pretty text-lg text-muted-foreground">
            Sanvya v2 is a comprehensive hospital management platform designed to streamline patient care, optimize
            operations, and enhance clinical outcomes across your healthcare facility.
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button size="lg" asChild>
              <Link href="/auth">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth">View Demo</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold text-primary">Everything You Need</h2>
            <p className="mt-4 text-muted-foreground">
              Comprehensive modules designed for modern healthcare facilities
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <motion.div variants={item}>
              <Card className="h-full border-border bg-card">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="mt-4">Patient Management</CardTitle>
                  <CardDescription>Complete patient lifecycle management from registration to discharge</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {["KYC with unique Sanvya ID", "Health records", "Appointment booking"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-secondary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="h-full border-border bg-card">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="mt-4">IPD Module</CardTitle>
                  <CardDescription>Comprehensive inpatient department management</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {["Ward & room management", "Surgery scheduling", "Bed transfers"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-secondary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="h-full border-border bg-card">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="mt-4">Billing & Insurance</CardTitle>
                  <CardDescription>Streamlined billing with insurance integration</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {["Itemized billing", "Insurance claims", "Payment tracking"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-secondary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Portal Access */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold text-primary">Access Your Portal</h2>
            <p className="mt-4 text-muted-foreground">Choose your role to access the appropriate dashboard</p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-12 grid gap-6 md:grid-cols-3"
          >
            <motion.div variants={item}>
              <Link href="/auth" className="group">
                <Card className="h-full border-border bg-card transition-all hover:border-primary hover:shadow-lg">
                  <CardHeader className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                      <Shield className="h-8 w-8 text-primary transition-colors group-hover:text-primary-foreground" />
                    </div>
                    <CardTitle className="mt-4">Admin Portal</CardTitle>
                    <CardDescription>Manage hospital operations, staff, and analytics</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>

            <motion.div variants={item}>
              <Link href="/auth" className="group">
                <Card className="h-full border-border bg-card transition-all hover:border-primary hover:shadow-lg">
                  <CardHeader className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                      <Activity className="h-8 w-8 text-primary transition-colors group-hover:text-primary-foreground" />
                    </div>
                    <CardTitle className="mt-4">Doctor Portal</CardTitle>
                    <CardDescription>Access appointments, patient records, and schedules</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>

            <motion.div variants={item}>
              <Link href="/auth" className="group">
                <Card className="h-full border-border bg-card transition-all hover:border-primary hover:shadow-lg">
                  <CardHeader className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                      <Users className="h-8 w-8 text-primary transition-colors group-hover:text-primary-foreground" />
                    </div>
                    <CardTitle className="mt-4">Patient Portal</CardTitle>
                    <CardDescription>Book appointments, view records, and manage billing</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-muted-foreground">© 2025 Sanvya Healthcare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

