"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const steps = [
  {
    step: "01",
    title: "Enter Your Details",
    description:
      "Provide your student info, subjects with credits, study time availability, and target completion date.",
  },
  {
    step: "02",
    title: "Rate Your Confidence",
    description:
      "For each subject, share your strong areas, weak areas, and self-rated confidence level (1-5).",
  },
  {
    step: "03",
    title: "AI Generates Your Plan",
    description:
      "Our AI analyzes everything - cognitive load, prerequisites, deadlines - and creates your personalized study schedule.",
  },
  {
    step: "04",
    title: "Study with Clarity",
    description:
      "Follow your color-coded weekly plan with actionable daily tasks, smart prioritization, and progress tracking.",
  },
]

export function HowItWorksSection({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section id="how-it-works" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-primary">
            How It Works
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Your Study Plan in 4 Simple Steps
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
            From input to insight in under 2 minutes. No complex setup, no learning
            curve.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, i) => (
            <div key={item.step} className="relative flex flex-col">
              {i < steps.length - 1 && (
                <div className="absolute top-8 left-full hidden h-px w-full bg-border/50 lg:block" />
              )}
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/5">
                <span className="text-lg font-bold text-primary font-mono">
                  {item.step}
                </span>
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" onClick={onGetStarted} className="gap-2 px-8">
            Start Planning Now
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
