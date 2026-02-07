"use client"

import { ArrowRight, Brain, Calendar, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5">
          <Brain className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium text-muted-foreground">
            AI-Powered Study Planning
          </span>
        </div>

        <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Study Smarter,{" "}
          <span className="gradient-text">Not Harder</span>
        </h1>

        <p className="mb-10 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          StudyForge AI creates personalized, adaptive study schedules tailored for
          engineering students. Analyze subjects, balance cognitive load, meet deadlines,
          and achieve deep conceptual understanding.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button size="lg" onClick={onGetStarted} className="gap-2 px-8">
            Create Your Study Plan
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 px-8 bg-transparent"
            onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
          >
            See How It Works
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            {
              icon: Calendar,
              stat: "Adaptive",
              label: "Smart Scheduling",
            },
            {
              icon: Brain,
              stat: "AI-Driven",
              label: "Cognitive Load Balancing",
            },
            {
              icon: TrendingUp,
              stat: "Personalized",
              label: "Progress Tracking",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm"
            >
              <item.icon className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">
                {item.stat}
              </span>
              <span className="text-sm text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
