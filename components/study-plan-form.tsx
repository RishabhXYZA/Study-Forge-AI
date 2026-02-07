"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  User,
  BookOpen,
  Clock,
  Loader2,
  CheckCircle2,
} from "lucide-react"
import type { FormData, Subject } from "@/lib/types"

const STEPS = [
  { title: "Student Details", icon: User },
  { title: "Subjects", icon: BookOpen },
  { title: "Study Preferences", icon: Clock },
  { title: "Review", icon: CheckCircle2 },
]

function createEmptySubject(): Subject {
  return {
    id: crypto.randomUUID(),
    name: "",
    credits: 3,
    strongAreas: "",
    weakAreas: "",
    confidenceLevel: 3,
  }
}

export function StudyPlanForm({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: FormData) => void
  isLoading: boolean
}) {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    studentDetails: {
      name: "",
      college: "",
      branch: "",
      graduationYear: "",
      email: "",
    },
    subjects: [createEmptySubject()],
    studyPreferences: {
      weekdayHours: 3,
      weekendHours: 6,
      preferredTime: "night",
      targetDate: "",
    },
  })

  const updateStudentDetails = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      studentDetails: { ...prev.studentDetails, [field]: value },
    }))
  }

  const addSubject = () => {
    setFormData((prev) => ({
      ...prev,
      subjects: [...prev.subjects, createEmptySubject()],
    }))
  }

  const removeSubject = (id: string) => {
    if (formData.subjects.length <= 1) return
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((s) => s.id !== id),
    }))
  }

  const updateSubject = (id: string, field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      ),
    }))
  }

  const updatePreferences = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      studyPreferences: { ...prev.studyPreferences, [field]: value },
    }))
  }

  const canGoNext = () => {
    if (step === 0) {
      const d = formData.studentDetails
      return d.name && d.college && d.branch && d.graduationYear && d.email
    }
    if (step === 1) {
      return formData.subjects.every((s) => s.name && s.credits > 0)
    }
    if (step === 2) {
      return formData.studyPreferences.targetDate
    }
    return true
  }

  const handleSubmit = () => {
    onSubmit(formData)
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Step indicator */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s.title} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => i < step && setStep(i)}
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                i === step
                  ? "bg-primary text-primary-foreground"
                  : i < step
                    ? "bg-accent/20 text-accent cursor-pointer"
                    : "bg-secondary text-muted-foreground"
              }`}
            >
              <s.icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{s.title}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div
                className={`h-px w-8 ${i < step ? "bg-accent" : "bg-border"}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form content */}
      <div className="rounded-2xl border border-border/50 bg-card p-6 sm:p-8">
        {step === 0 && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Student Details</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Tell us about yourself so we can personalize your plan.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Aman"
                  value={formData.studentDetails.name}
                  onChange={(e) => updateStudentDetails("name", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email ID</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="aman@example.com"
                  value={formData.studentDetails.email}
                  onChange={(e) => updateStudentDetails("email", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="college">College</Label>
                <Input
                  id="college"
                  placeholder="XYZ Institute of Technology"
                  value={formData.studentDetails.college}
                  onChange={(e) => updateStudentDetails("college", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="branch">Branch</Label>
                <Input
                  id="branch"
                  placeholder="Computer Science Engineering"
                  value={formData.studentDetails.branch}
                  onChange={(e) => updateStudentDetails("branch", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2">
                <Label htmlFor="gradYear">Graduation Year</Label>
                <Select
                  value={formData.studentDetails.graduationYear}
                  onValueChange={(v) => updateStudentDetails("graduationYear", v)}
                >
                  <SelectTrigger id="gradYear">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {["2025", "2026", "2027", "2028", "2029"].map((y) => (
                      <SelectItem key={y} value={y}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Subjects & Credits</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add your subjects with credits and self-assess your confidence.
                </p>
              </div>
              <Button size="sm" variant="outline" onClick={addSubject} className="gap-1.5 bg-transparent">
                <Plus className="h-3.5 w-3.5" />
                Add
              </Button>
            </div>

            <div className="flex flex-col gap-6">
              {formData.subjects.map((subject, idx) => (
                <div
                  key={subject.id}
                  className="rounded-xl border border-border/50 bg-secondary/30 p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      Subject {idx + 1}
                    </span>
                    {formData.subjects.length > 1 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeSubject(subject.id)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label>Subject Name</Label>
                      <Input
                        placeholder="e.g. Data Structures"
                        value={subject.name}
                        onChange={(e) =>
                          updateSubject(subject.id, "name", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Credits</Label>
                      <Select
                        value={String(subject.credits)}
                        onValueChange={(v) =>
                          updateSubject(subject.id, "credits", Number(v))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6].map((c) => (
                            <SelectItem key={c} value={String(c)}>
                              {c} {c === 1 ? "Credit" : "Credits"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Strong Areas</Label>
                      <Input
                        placeholder="e.g. Arrays, Linked Lists"
                        value={subject.strongAreas}
                        onChange={(e) =>
                          updateSubject(subject.id, "strongAreas", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Weak Areas</Label>
                      <Input
                        placeholder="e.g. Trees, Graphs"
                        value={subject.weakAreas}
                        onChange={(e) =>
                          updateSubject(subject.id, "weakAreas", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2 sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <Label>Confidence Level</Label>
                        <span className="text-sm font-mono font-medium text-primary">
                          {subject.confidenceLevel}/5
                        </span>
                      </div>
                      <Slider
                        min={1}
                        max={5}
                        step={1}
                        value={[subject.confidenceLevel]}
                        onValueChange={([v]) =>
                          updateSubject(subject.id, "confidenceLevel", v)
                        }
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Very Low</span>
                        <span>Very High</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Study Preferences</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Configure your study schedule and set your target date.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label>Weekday Study Hours</Label>
                  <span className="text-sm font-mono font-medium text-primary">
                    {formData.studyPreferences.weekdayHours}h/day
                  </span>
                </div>
                <Slider
                  min={1}
                  max={10}
                  step={0.5}
                  value={[formData.studyPreferences.weekdayHours]}
                  onValueChange={([v]) => updatePreferences("weekdayHours", v)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label>Weekend Study Hours</Label>
                  <span className="text-sm font-mono font-medium text-primary">
                    {formData.studyPreferences.weekendHours}h/day
                  </span>
                </div>
                <Slider
                  min={1}
                  max={12}
                  step={0.5}
                  value={[formData.studyPreferences.weekendHours]}
                  onValueChange={([v]) => updatePreferences("weekendHours", v)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Preferred Study Time</Label>
                <Select
                  value={formData.studyPreferences.preferredTime}
                  onValueChange={(v) => updatePreferences("preferredTime", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (6AM - 12PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                    <SelectItem value="evening">Evening (5PM - 9PM)</SelectItem>
                    <SelectItem value="night">Night (9PM - 1AM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="targetDate">Target Completion Date</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={formData.studyPreferences.targetDate}
                  onChange={(e) => updatePreferences("targetDate", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Review Your Information</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Double-check everything before generating your study plan.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-xl border border-border/50 bg-secondary/30 p-4">
                <h3 className="mb-3 text-sm font-medium text-primary">Student Details</h3>
                <div className="grid gap-2 text-sm sm:grid-cols-2">
                  <p className="text-muted-foreground">
                    Name: <span className="text-foreground">{formData.studentDetails.name}</span>
                  </p>
                  <p className="text-muted-foreground">
                    Email: <span className="text-foreground">{formData.studentDetails.email}</span>
                  </p>
                  <p className="text-muted-foreground">
                    College: <span className="text-foreground">{formData.studentDetails.college}</span>
                  </p>
                  <p className="text-muted-foreground">
                    Branch: <span className="text-foreground">{formData.studentDetails.branch}</span>
                  </p>
                  <p className="text-muted-foreground">
                    Graduation: <span className="text-foreground">{formData.studentDetails.graduationYear}</span>
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border/50 bg-secondary/30 p-4">
                <h3 className="mb-3 text-sm font-medium text-primary">
                  Subjects ({formData.subjects.length})
                </h3>
                <div className="flex flex-col gap-3">
                  {formData.subjects.map((s) => (
                    <div key={s.id} className="flex flex-col gap-1 text-sm">
                      <p className="font-medium text-foreground">
                        {s.name}{" "}
                        <span className="font-normal text-muted-foreground">
                          ({s.credits} credits, Confidence: {s.confidenceLevel}/5)
                        </span>
                      </p>
                      {(s.strongAreas || s.weakAreas) && (
                        <p className="text-xs text-muted-foreground">
                          {s.strongAreas && <>Strong: {s.strongAreas}</>}
                          {s.strongAreas && s.weakAreas && " | "}
                          {s.weakAreas && <>Weak: {s.weakAreas}</>}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border/50 bg-secondary/30 p-4">
                <h3 className="mb-3 text-sm font-medium text-primary">Study Preferences</h3>
                <div className="grid gap-2 text-sm sm:grid-cols-2">
                  <p className="text-muted-foreground">
                    Weekdays:{" "}
                    <span className="text-foreground">{formData.studyPreferences.weekdayHours}h/day</span>
                  </p>
                  <p className="text-muted-foreground">
                    Weekends:{" "}
                    <span className="text-foreground">{formData.studyPreferences.weekendHours}h/day</span>
                  </p>
                  <p className="text-muted-foreground">
                    Preferred Time:{" "}
                    <span className="capitalize text-foreground">{formData.studyPreferences.preferredTime}</span>
                  </p>
                  <p className="text-muted-foreground">
                    Target Date:{" "}
                    <span className="text-foreground">
                      {new Date(formData.studyPreferences.targetDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setStep((p) => Math.max(0, p - 1))}
            disabled={step === 0}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          {step < 3 ? (
            <Button
              onClick={() => setStep((p) => Math.min(3, p + 1))}
              disabled={!canGoNext()}
              className="gap-2"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isLoading} className="gap-2">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating Plan...
                </>
              ) : (
                <>
                  Generate Study Plan
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
