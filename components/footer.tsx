"use client"

import { BookOpen } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/50 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <BookOpen className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-semibold text-foreground">
            StudyForge <span className="text-primary">AI</span>
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Built to help engineering students study smarter, not harder.
        </p>
      </div>
    </footer>
  )
}
