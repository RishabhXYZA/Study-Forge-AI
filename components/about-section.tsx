"use client"

import {
  BookOpen,
  Target,
  Lightbulb,
  Users,
} from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-primary">
            About StudyForge AI
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Re-engineering How Students Learn
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
            Engineering students face uniquely demanding academic environments, juggling
            multiple technically intensive subjects with different prerequisites,
            assessment styles, and cognitive demands. Traditional planning tools simply
            {"don't"} adapt. StudyForge AI was built to change that.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-border/50 bg-card p-8">
            <h3 className="mb-6 text-xl font-semibold text-foreground">The Problem</h3>
            <div className="flex flex-col gap-5">
              {[
                {
                  title: "Cognitive Load Imbalance",
                  desc: "Different subjects demand different levels of mental effort, but students lack systems to plan high-focus vs low-focus sessions effectively.",
                },
                {
                  title: "Prerequisite Dependencies",
                  desc: "Courses build heavily on prior concepts, yet students often fail to identify foundational gaps blocking their progress.",
                },
                {
                  title: "Dynamic Prioritization",
                  desc: "Deadlines, exams, and unexpected topic difficulties constantly shift priorities, making manual planning ineffective.",
                },
                {
                  title: "Inefficient Study Patterns",
                  desc: "Cramming, shallow practice, and last-minute studying lead to poor retention and high stress.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-destructive" />
                  <div>
                    <h4 className="mb-1 text-sm font-medium text-foreground">{item.title}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-card p-8 glow-border">
            <h3 className="mb-6 text-xl font-semibold text-foreground">Our Solution</h3>
            <div className="flex flex-col gap-5">
              {[
                {
                  icon: BookOpen,
                  title: "Personalized Schedules",
                  desc: "AI analyzes your subjects, credits, deadlines, and confidence levels to create a study plan tailored just for you.",
                },
                {
                  icon: Target,
                  title: "Smart Prioritization",
                  desc: "Weak and prerequisite-heavy topics are scheduled earlier, with high-focus topics placed during your preferred study hours.",
                },
                {
                  icon: Lightbulb,
                  title: "Actionable Insights",
                  desc: "Instead of generic advice, get specific guidance: what to study, when to study it, and why it matters for your progress.",
                },
                {
                  icon: Users,
                  title: "Adaptive Learning",
                  desc: "Your plan evolves dynamically as priorities, performance, and difficulty change throughout your academic term.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm font-medium text-foreground">{item.title}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-border/50 bg-card/50 p-8 text-center">
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground">
            StudyForge AI is designed with a single mission:{" "}
            <span className="font-medium text-foreground">
              to help engineering students study smarter, not harder
            </span>
            . By combining AI intelligence with your personal academic profile, we
            create study plans that genuinely adapt to your needs, helping you balance
            deep learning with timely completion, reduce last-minute stress, and build
            real confidence across all your subjects.
          </p>
        </div>
      </div>
    </section>
  )
}
