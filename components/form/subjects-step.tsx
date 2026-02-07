"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import type { Subject } from "@/lib/types"
import { Plus, Trash2, BookOpen } from "lucide-react"

interface Props {
  subjects: Subject[]
  onChange: (subjects: Subject[]) => void
}

export function SubjectsStep({ subjects, onChange }: Props) {
  const addSubject = () => {
    onChange([
      ...subjects,
      {
        id: crypto.randomUUID(),
        name: "",
        credits: 3,
        strongAreas: "",
        weakAreas: "",
        confidenceLevel: 3,
      },
    ])
  }

  const removeSubject = (id: string) => {
    if (subjects.length <= 1) return
    onChange(subjects.filter((s) => s.id !== id))
  }

  const updateSubject = (id: string, field: keyof Subject, value: string | number) => {
    onChange(
      subjects.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    )
  }

  const confidenceLabels = ["Very Low", "Low", "Medium", "High", "Very High"]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-foreground">
          Your Subjects
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Add the subjects you need to study. Include strong/weak areas for a more tailored plan.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {subjects.map((subject, index) => (
          <Card key={subject.id} className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">
                  Subject {index + 1}
                </span>
              </div>
              {subjects.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSubject(subject.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium">Subject Name</Label>
                <Input
                  placeholder="e.g., Data Structures"
                  value={subject.name}
                  onChange={(e) =>
                    updateSubject(subject.id, "name", e.target.value)
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium">Credits</Label>
                <Input
                  type="number"
                  min={1}
                  max={6}
                  value={subject.credits}
                  onChange={(e) =>
                    updateSubject(
                      subject.id,
                      "credits",
                      Number.parseInt(e.target.value) || 1
                    )
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium">Strong Areas</Label>
                <Textarea
                  placeholder="e.g., Arrays, Linked Lists"
                  value={subject.strongAreas}
                  onChange={(e) =>
                    updateSubject(subject.id, "strongAreas", e.target.value)
                  }
                  rows={2}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium">Weak Areas</Label>
                <Textarea
                  placeholder="e.g., Trees, Graphs"
                  value={subject.weakAreas}
                  onChange={(e) =>
                    updateSubject(subject.id, "weakAreas", e.target.value)
                  }
                  rows={2}
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    Confidence Level
                  </Label>
                  <span className="text-sm font-medium text-primary">
                    {subject.confidenceLevel}/5 -{" "}
                    {confidenceLabels[subject.confidenceLevel - 1]}
                  </span>
                </div>
                <Slider
                  value={[subject.confidenceLevel]}
                  min={1}
                  max={5}
                  step={1}
                  onValueChange={([val]) =>
                    updateSubject(subject.id, "confidenceLevel", val)
                  }
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 - Very Low</span>
                  <span>5 - Very High</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Button variant="outline" onClick={addSubject} className="w-fit bg-transparent">
        <Plus className="h-4 w-4 mr-2" />
        Add Another Subject
      </Button>
    </div>
  )
}
