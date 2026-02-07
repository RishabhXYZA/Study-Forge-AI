"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { StudentDetails } from "@/lib/types"
import { User, Building2, GraduationCap, Mail } from "lucide-react"

interface Props {
  data: StudentDetails
  onChange: (data: StudentDetails) => void
}

export function StudentDetailsStep({ data, onChange }: Props) {
  const update = (field: keyof StudentDetails, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-foreground">
          Tell us about yourself
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          We need some basic details to personalize your study plan.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
            <User className="h-4 w-4 text-primary" />
            Full Name
          </Label>
          <Input
            id="name"
            placeholder="e.g., Aman Sharma"
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
            <Mail className="h-4 w-4 text-primary" />
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="e.g., aman@example.com"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="college" className="flex items-center gap-2 text-sm font-medium">
            <Building2 className="h-4 w-4 text-primary" />
            College / University
          </Label>
          <Input
            id="college"
            placeholder="e.g., XYZ Institute of Technology"
            value={data.college}
            onChange={(e) => update("college", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="branch" className="flex items-center gap-2 text-sm font-medium">
            <GraduationCap className="h-4 w-4 text-primary" />
            Branch
          </Label>
          <Input
            id="branch"
            placeholder="e.g., Computer Science Engineering"
            value={data.branch}
            onChange={(e) => update("branch", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="graduationYear" className="text-sm font-medium">
            Graduation Year
          </Label>
          <Select
            value={data.graduationYear}
            onValueChange={(val) => update("graduationYear", val)}
          >
            <SelectTrigger id="graduationYear">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {["2025", "2026", "2027", "2028", "2029", "2030"].map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
