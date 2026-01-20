"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Activity, ArrowLeft, Users, Building2, UserPlus, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function AuthPage() {
  const router = useRouter()
  const [hospitalCode, setHospitalCode] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleHospitalLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Mock validation
    if (hospitalCode === "HOSP123" && password === "admin") {
      setIsOpen(false)
      router.push("/auth/hospital-login")
    } else {
      setError("Invalid Hospital Code or Password")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-blue px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center">
              <Image
                src="/color.png"
                alt="Sanvya Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            </div>
            <span className="text-2xl font-semibold text-foreground">Sanvya</span>
          </div>
          <p className="mt-4 text-muted-foreground">Choose how you want to continue</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {/* Patient Registration */}
          <Link href="/auth/patient-register" className="group">
            <Card className="h-full border-border bg-card transition-all hover:border-primary hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                  <UserPlus className="h-7 w-7 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>
                <CardTitle className="mt-4 text-lg">Patient Registration</CardTitle>
                <CardDescription className="text-sm">
                  New patient? Register here with KYC to get your Sanvya ID
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* Patient Login */}
          <Link href="/auth/patient-login" className="group">
            <Card className="h-full border-border bg-card transition-all hover:border-secondary hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                  <Users className="h-7 w-7 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>
                <CardTitle className="mt-4 text-lg">Patient Login</CardTitle>
                <CardDescription className="text-sm">
                  Existing patient? Login with your Sanvya ID or email
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* Hospital Login */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <div className="group cursor-pointer">
                <Card className="h-full border-border bg-card transition-all hover:border-primary hover:shadow-lg">
                  <CardHeader className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                      <Building2 className="h-7 w-7 text-primary transition-colors group-hover:text-primary-foreground" />
                    </div>
                    <CardTitle className="mt-4 text-lg">Hospital Login</CardTitle>
                    <CardDescription className="text-sm">
                      Admin, Doctor, or Staff? Access your hospital portal here
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Hospital Access</DialogTitle>
                <DialogDescription>
                  Enter your hospital code and password to access the login portal.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleHospitalLogin} className="space-y-4 py-4">
                {error && (
                  <div className="flex items-center gap-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="hospitalCode">Hospital Code</Label>
                  <Input
                    id="hospitalCode"
                    placeholder="Enter hospital code"
                    value={hospitalCode}
                    onChange={(e) => setHospitalCode(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Verify & Continue</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          By continuing, you agree to our{" "}
          <Link href="#" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
