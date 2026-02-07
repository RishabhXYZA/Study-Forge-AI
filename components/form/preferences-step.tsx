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
import type { StudyPreferences } from "@/lib/types"
import { Clock, Calendar, Sun, Sunset, Moon, Sunrise } from "lucide-react"

interface Props {
  data: StudyPreferences
  onChange: (data: StudyPreferences) => void
}

const timeOptions = [
  { value: "morning", label: "Morning (6AM - 12PM)", icon: Sunrise },
  { value: "afternoon", label: "Afternoon (12PM - 5PM)", icon: Sun },
  { value: "evening", label: "Evening (5PM - 9PM)", icon: Sunset },
  { value: "night", label: "Night (9PM - 2AM)", icon: Moon },
] as const

export function PreferencesStep({ data, onChange }: Props) {
  const update = (field: keyof StudyPreferences, value: string | number) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-foreground">
          Study Preferences
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Help us understand your schedule so we can create an optimal plan.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="weekdayHours"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Clock className="h-4 w-4 text-primary" />
            Weekday Study Hours (per day)
          </Label>
          <Input
            id="weekdayHours"
            type="number"
            min={1}
            max={12}
            value={data.weekdayHours}
            onChange={(e) =>
              update("weekdayHours", Number.parseInt(e.target.value) || 1)
            }
          />
          <p className="text-xs text-muted-foreground">
            Monday through Friday
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="weekendHours"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Clock className="h-4 w-4 text-primary" />
            Weekend Study Hours (per day)
          </Label>
          <Input
            id="weekendHours"
            type="number"
            min={1}
            max={16}
            value={data.weekendHours}
            onChange={(e) =>
              update("weekendHours", Number.parseInt(e.target.value) || 1)
            }
          />
          <p className="text-xs text-muted-foreground">Saturday and Sunday</p>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Sun className="h-4 w-4 text-primary" />
            Preferred Study Time
          </Label>
          <Select
            value={data.preferredTime}
            onValueChange={(val) => update("preferredTime", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select preferred time" />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  <span className="flex items-center gap-2">
                    <opt.icon className="h-4 w-4" />
                    {opt.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="targetDate"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Calendar className="h-4 w-4 text-primary" />
            Target Completion Date
          </Label>
          <Input
            id="targetDate"
            type="date"
            value={data.targetDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => update("targetDate", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            When all subjects should be completed
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/50 p-4">
        <p className="text-sm font-medium text-foreground mb-1">
          Weekly study hours estimate
        </p>
        <p className="text-2xl font-bold text-primary">
          {data.weekdayHours * 5 + data.weekendHours * 2} hours/week
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {data.weekdayHours}h x 5 weekdays + {data.weekendHours}h x 2 weekend
          days
        </p>
      </div>
    </div>
  )
}
