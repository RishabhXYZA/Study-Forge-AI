"use client"

import { useState, useRef } from "react"
import { toast } from "sonner"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { Footer } from "@/components/footer"
import { StudyPlanForm } from "@/components/study-plan-form"
import { StudyPlanDisplay } from "@/components/study-plan-display"
import type { FormData, StudyPlan } from "@/lib/types"

type AppView = "landing" | "form" | "plan"

export default function Page() {
  const [view, setView] = useState<AppView>("landing")
  const [isLoading, setIsLoading] = useState(false)
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null)
  const [formDataState, setFormDataState] = useState<FormData | null>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const handleGetStarted = () => {
    setView("form")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    setFormDataState(formData)

    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate study plan")
      }

      const data = await response.json()

      if (data.studyPlan) {
        setStudyPlan(data.studyPlan)
        setView("plan")
        window.scrollTo({ top: 0, behavior: "smooth" })
        toast.success("Your personalized study plan is ready!")
      } else {
        throw new Error("No study plan generated")
      }
    } catch {
      toast.error("Failed to generate study plan. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (view === "plan" && studyPlan && formDataState) {
    return (
      <main className="min-h-screen bg-background py-8">
        <StudyPlanDisplay
          plan={studyPlan}
          formData={formDataState}
          onBack={() => setView("form")}
        />
      </main>
    )
  }

  if (view === "form") {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-8 text-center">
            <button
              type="button"
              onClick={() => setView("landing")}
              className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Home
            </button>
            <h1 className="text-3xl font-bold text-foreground">
              Create Your <span className="gradient-text">Study Plan</span>
            </h1>
            <p className="mt-2 text-muted-foreground">
              Fill in your details and let AI create a personalized schedule for you.
            </p>
          </div>
          <div ref={formRef}>
            <StudyPlanForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar onGetStarted={handleGetStarted} />
      <HeroSection onGetStarted={handleGetStarted} />
      <FeaturesSection />
      <AboutSection />
      <HowItWorksSection onGetStarted={handleGetStarted} />
      <Footer />
    </main>
  )
}
