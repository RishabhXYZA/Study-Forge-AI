"use client"

import {
  Calendar,
  BarChart3,
  Zap,
  ListChecks,
  TrendingUp,
  Clock,
} from "lucide-react"

const features = [
  {
    icon: Calendar,
    title: "Visual Weekly Schedules",
    description:
      "Color-coded daily and weekly calendar views with clear distinction between learning, practice, revision, and buffer time.",
  },
  {
    icon: BarChart3,
    title: "Subject-Wise Focus Breakdown",
    description:
      "Hour-based allocation per subject with AI-generated justifications explaining why certain subjects get more attention.",
  },
  {
    icon: Zap,
    title: "Smart Prioritization Logic",
    description:
      "Weak and prerequisite-heavy topics scheduled earlier, high-focus topics placed during preferred study hours.",
  },
  {
    icon: ListChecks,
    title: "Actionable Next Steps",
    description:
      'Specific daily guidance like "Revise Trees before starting Graphs" instead of generic advice.',
  },
  {
    icon: TrendingUp,
    title: "Confidence Projections",
    description:
      "Track expected confidence improvement per subject and see estimated completion timelines with your current plan.",
  },
  {
    icon: Clock,
    title: "Cognitive Load Balancing",
    description:
      "High-focus tasks during peak hours, lighter tasks like revision and notes placed in low-energy time slots.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-primary">
            Features
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Everything You Need to Study Smarter
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
            StudyForge AI combines intelligent scheduling, cognitive science, and
            personalization to create study plans that actually work.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:glow-border"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
