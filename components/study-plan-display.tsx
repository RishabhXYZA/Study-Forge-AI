"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Calendar,
  BarChart3,
  Zap,
  ListChecks,
  TrendingUp,
  Target,
  Clock,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react"
import type { StudyPlan, FormData } from "@/lib/types"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

const SESSION_COLORS: Record<string, string> = {
  learning: "bg-primary/20 text-primary border-primary/30",
  practice: "bg-accent/20 text-accent border-accent/30",
  revision: "bg-chart-3/20 text-[hsl(38,92%,50%)] border-chart-3/30",
  buffer: "bg-secondary text-muted-foreground border-border",
}

const COGNITIVE_BADGE: Record<string, string> = {
  high: "bg-destructive/20 text-destructive border-destructive/30",
  medium: "bg-chart-3/20 text-[hsl(38,92%,50%)] border-chart-3/30",
  low: "bg-accent/20 text-accent border-accent/30",
}

const PIE_COLORS = [
  "hsl(199, 89%, 48%)",
  "hsl(160, 84%, 39%)",
  "hsl(38, 92%, 50%)",
  "hsl(346, 77%, 60%)",
  "hsl(262, 60%, 55%)",
]

export function StudyPlanDisplay({
  plan,
  formData,
  onBack,
}: {
  plan: StudyPlan
  formData: FormData
  onBack: () => void
}) {
  const [selectedWeek, setSelectedWeek] = useState(0)

  const currentWeek = plan.weeklyPlans[selectedWeek]

  const pieData = plan.subjectAllocations.map((a) => ({
    name: a.subject,
    value: a.totalHours,
    percentage: a.percentage,
  }))

  const confidenceData = plan.outcomeSummary.confidenceProjections.map((c) => ({
    subject: c.subject.length > 12 ? `${c.subject.slice(0, 12)}...` : c.subject,
    current: c.currentLevel,
    projected: c.projectedLevel,
  }))

  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-1.5">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {formData.studentDetails.name}{"'s"} Study Plan
            </h1>
            <p className="text-sm text-muted-foreground">
              {plan.totalWeeks} weeks | {plan.totalStudyHours} total hours |{" "}
              {formData.subjects.length} subjects
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: Calendar,
            label: "Total Weeks",
            value: plan.totalWeeks,
            color: "text-primary",
          },
          {
            icon: Clock,
            label: "Total Hours",
            value: plan.totalStudyHours,
            color: "text-accent",
          },
          {
            icon: BookOpen,
            label: "Subjects",
            value: formData.subjects.length,
            color: "text-[hsl(38,92%,50%)]",
          },
          {
            icon: Target,
            label: "Target Date",
            value: new Date(formData.studyPreferences.targetDate).toLocaleDateString(
              "en-US",
              { month: "short", day: "numeric" }
            ),
            color: "text-[hsl(346,77%,60%)]",
          },
        ].map((card) => (
          <div
            key={card.label}
            className="flex items-center gap-4 rounded-xl border border-border/50 bg-card p-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{card.label}</p>
              <p className="text-lg font-semibold text-foreground">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="schedule" className="flex flex-col gap-6">
        <TabsList className="w-full justify-start overflow-x-auto bg-secondary/50">
          <TabsTrigger value="schedule" className="gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="allocation" className="gap-1.5">
            <BarChart3 className="h-3.5 w-3.5" />
            Allocation
          </TabsTrigger>
          <TabsTrigger value="focus" className="gap-1.5">
            <ListChecks className="h-3.5 w-3.5" />
            7-Day Focus
          </TabsTrigger>
          <TabsTrigger value="insights" className="gap-1.5">
            <Zap className="h-3.5 w-3.5" />
            Insights
          </TabsTrigger>
          <TabsTrigger value="outcomes" className="gap-1.5">
            <TrendingUp className="h-3.5 w-3.5" />
            Outcomes
          </TabsTrigger>
        </TabsList>

        {/* Weekly Schedule */}
        <TabsContent value="schedule" className="mt-0">
          <div className="rounded-xl border border-border/50 bg-card">
            <div className="flex items-center justify-between border-b border-border/50 p-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedWeek((w) => Math.max(0, w - 1))}
                disabled={selectedWeek === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">
                  {currentWeek?.weekLabel || `Week ${selectedWeek + 1}`}
                </p>
                <p className="text-xs text-muted-foreground">
                  Week {selectedWeek + 1} of {plan.weeklyPlans.length}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setSelectedWeek((w) =>
                    Math.min(plan.weeklyPlans.length - 1, w + 1)
                  )
                }
                disabled={selectedWeek === plan.weeklyPlans.length - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Week Goals */}
            {currentWeek?.goals && currentWeek.goals.length > 0 && (
              <div className="border-b border-border/50 px-4 py-3">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-primary">
                  Week Goals
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentWeek.goals.map((g) => (
                    <span
                      key={g}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Daily Schedule */}
            <div className="flex flex-col gap-0 divide-y divide-border/30">
              {currentWeek?.dailySchedule.map((day) => (
                <div key={day.day} className="p-4">
                  <p className="mb-3 text-sm font-semibold text-foreground">
                    {day.day}
                  </p>
                  <div className="flex flex-col gap-2">
                    {day.sessions.map((session, si) => (
                      <div
                        key={`${day.day}-${si}`}
                        className={`flex items-center justify-between rounded-lg border px-3 py-2 ${SESSION_COLORS[session.type]}`}
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-medium">
                            {session.subject}
                          </span>
                          <span className="text-xs opacity-75">
                            {session.topic}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${COGNITIVE_BADGE[session.cognitiveLoad]}`}
                          >
                            {session.cognitiveLoad}
                          </span>
                          <span className="text-xs font-mono opacity-75">
                            {session.durationMinutes}m
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Subject Allocation */}
        <TabsContent value="allocation" className="mt-0">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-border/50 bg-card p-6">
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                Hours Distribution
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      innerRadius={50}
                      paddingAngle={4}
                      strokeWidth={0}
                    >
                      {pieData.map((_, i) => (
                        <Cell
                          key={`cell-${pieData[i].name}`}
                          fill={PIE_COLORS[i % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(220, 18%, 7%)",
                        border: "1px solid hsl(220, 16%, 14%)",
                        borderRadius: "8px",
                        color: "hsl(210, 40%, 96%)",
                      }}
                      formatter={(value: number) => [`${value}h`, "Hours"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                {pieData.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: PIE_COLORS[i % PIE_COLORS.length],
                      }}
                    />
                    <span className="text-xs text-muted-foreground">{d.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border/50 bg-card p-6">
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                Allocation Breakdown
              </h3>
              <div className="flex flex-col gap-4">
                {plan.subjectAllocations.map((a, i) => (
                  <div key={a.subject}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {a.subject}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {a.totalHours}h ({a.percentage}%)
                      </span>
                    </div>
                    <Progress
                      value={a.percentage}
                      className="h-2"
                      style={
                        {
                          "--progress-color":
                            PIE_COLORS[i % PIE_COLORS.length],
                        } as React.CSSProperties
                      }
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {a.justification}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* 7-Day Focus */}
        <TabsContent value="focus" className="mt-0">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {plan.nextSevenDaysFocus.map((day, i) => (
              <div
                key={day.day}
                className={`rounded-xl border bg-card p-5 ${i === 0 ? "border-primary/30 glow-border" : "border-border/50"}`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">
                    {day.day}
                  </span>
                  {i === 0 && (
                    <Badge
                      variant="secondary"
                      className="bg-primary/20 text-primary text-xs"
                    >
                      Today
                    </Badge>
                  )}
                </div>
                <p className="mb-3 text-xs font-medium text-primary">
                  {day.focus}
                </p>
                <ul className="flex flex-col gap-1.5">
                  {day.tasks.map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-2 text-xs text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Smart Insights */}
        <TabsContent value="insights" className="mt-0">
          <div className="flex flex-col gap-4">
            {plan.smartInsights.map((insight) => (
              <div
                key={insight.title}
                className={`rounded-xl border bg-card p-5 ${
                  insight.priority === "high"
                    ? "border-destructive/30"
                    : insight.priority === "medium"
                      ? "border-chart-3/30"
                      : "border-border/50"
                }`}
              >
                <div className="mb-2 flex items-center gap-3">
                  <Zap
                    className={`h-4 w-4 ${
                      insight.priority === "high"
                        ? "text-destructive"
                        : insight.priority === "medium"
                          ? "text-[hsl(38,92%,50%)]"
                          : "text-muted-foreground"
                    }`}
                  />
                  <span className="text-sm font-semibold text-foreground">
                    {insight.title}
                  </span>
                  <Badge
                    variant="secondary"
                    className={`ml-auto text-[10px] ${
                      insight.priority === "high"
                        ? "bg-destructive/20 text-destructive"
                        : insight.priority === "medium"
                          ? "bg-chart-3/20 text-[hsl(38,92%,50%)]"
                          : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {insight.priority}
                  </Badge>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {insight.description}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Outcome Summary */}
        <TabsContent value="outcomes" className="mt-0">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-border/50 bg-card p-6">
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                Confidence Projections
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={confidenceData} barGap={4}>
                    <XAxis
                      dataKey="subject"
                      tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }}
                      axisLine={{ stroke: "hsl(220, 16%, 14%)" }}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 5]}
                      tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }}
                      axisLine={{ stroke: "hsl(220, 16%, 14%)" }}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(220, 18%, 7%)",
                        border: "1px solid hsl(220, 16%, 14%)",
                        borderRadius: "8px",
                        color: "hsl(210, 40%, 96%)",
                      }}
                    />
                    <Bar
                      dataKey="current"
                      fill="hsl(215, 20%, 55%)"
                      radius={[4, 4, 0, 0]}
                      name="Current"
                    />
                    <Bar
                      dataKey="projected"
                      fill="hsl(199, 89%, 48%)"
                      radius={[4, 4, 0, 0]}
                      name="Projected"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <span className="text-xs text-muted-foreground">Projected</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-xl border border-primary/20 bg-card p-6 glow-border">
                <h3 className="mb-4 text-sm font-semibold text-foreground">
                  Outcome Summary
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Est. Completion
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {plan.outcomeSummary.estimatedCompletionDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Total Study Hours
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {plan.outcomeSummary.totalStudyHours}h
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border/50 bg-card p-6">
                <h3 className="mb-4 text-sm font-semibold text-foreground">
                  Key Benefits
                </h3>
                <ul className="flex flex-col gap-2">
                  {plan.outcomeSummary.keyBenefits.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-border/50 bg-card p-6">
                <h3 className="mb-4 text-sm font-semibold text-foreground">
                  Per-Subject Projection
                </h3>
                <div className="flex flex-col gap-3">
                  {plan.outcomeSummary.confidenceProjections.map((c) => (
                    <div key={c.subject} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {c.subject}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground">
                          {c.currentLevel}/5
                        </span>
                        <ArrowLeft className="h-3 w-3 rotate-180 text-primary" />
                        <span className="text-xs font-mono font-medium text-primary">
                          {c.projectedLevel}/5
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
