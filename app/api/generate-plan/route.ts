import { generateText, Output } from "ai"
import { z } from "zod"

const studySessionSchema = z.object({
  subject: z.string(),
  topic: z.string(),
  durationMinutes: z.number(),
  type: z.enum(["learning", "practice", "revision", "buffer"]),
  cognitiveLoad: z.enum(["high", "medium", "low"]),
})

const dayScheduleSchema = z.object({
  day: z.string(),
  sessions: z.array(studySessionSchema),
})

const weekPlanSchema = z.object({
  weekNumber: z.number(),
  weekLabel: z.string(),
  dailySchedule: z.array(dayScheduleSchema),
  goals: z.array(z.string()),
})

const studyPlanSchema = z.object({
  totalWeeks: z.number(),
  totalStudyHours: z.number(),
  weeklyPlans: z.array(weekPlanSchema),
  subjectAllocations: z.array(
    z.object({
      subject: z.string(),
      totalHours: z.number(),
      percentage: z.number(),
      justification: z.string(),
    })
  ),
  nextSevenDaysFocus: z.array(
    z.object({
      day: z.string(),
      focus: z.string(),
      tasks: z.array(z.string()),
    })
  ),
  smartInsights: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      priority: z.enum(["high", "medium", "low"]),
    })
  ),
  outcomeSummary: z.object({
    estimatedCompletionDate: z.string(),
    totalStudyHours: z.number(),
    confidenceProjections: z.array(
      z.object({
        subject: z.string(),
        currentLevel: z.number(),
        projectedLevel: z.number(),
      })
    ),
    keyBenefits: z.array(z.string()),
  }),
})

export async function POST(req: Request) {
  const { formData } = await req.json()
  const { studentDetails, subjects, studyPreferences } = formData

  const today = new Date()
  const targetDate = new Date(studyPreferences.targetDate)
  const diffTime = targetDate.getTime() - today.getTime()
  const totalDays = Math.max(7, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))
  const totalWeeks = Math.ceil(totalDays / 7)

  const weeklyHours =
    studyPreferences.weekdayHours * 5 + studyPreferences.weekendHours * 2

  const subjectsList = subjects
    .map(
      (s: { name: string; credits: number; strongAreas: string; weakAreas: string; confidenceLevel: number }) =>
        `- ${s.name} (${s.credits} credits): Strong in [${s.strongAreas || "none specified"}], Weak in [${s.weakAreas || "none specified"}], Confidence: ${s.confidenceLevel}/5`
    )
    .join("\n")

  const prompt = `You are an expert AI study planner for engineering students. Create a detailed, personalized study plan.

STUDENT PROFILE:
- Name: ${studentDetails.name}
- College: ${studentDetails.college}
- Branch: ${studentDetails.branch}
- Graduation Year: ${studentDetails.graduationYear}

SUBJECTS:
${subjectsList}

STUDY PREFERENCES:
- Weekday study hours: ${studyPreferences.weekdayHours} hours/day
- Weekend study hours: ${studyPreferences.weekendHours} hours/day
- Preferred study time: ${studyPreferences.preferredTime}
- Total available weeks: ${totalWeeks}
- Weekly study hours: ${weeklyHours}
- Target completion date: ${studyPreferences.targetDate}

PLANNING RULES:
1. Allocate more time to subjects with lower confidence and higher credits.
2. Schedule weak/prerequisite-heavy topics EARLIER in the plan.
3. Place high-cognitive-load topics during preferred study time (${studyPreferences.preferredTime}).
4. Place lighter tasks (revision, notes) in non-preferred hours.
5. Include buffer time for spillovers.
6. Each session type should be one of: learning, practice, revision, buffer.
7. Cognitive load per session: high, medium, or low.
8. Generate exactly ${Math.min(totalWeeks, 4)} weeks of detailed weekly plans (with 7 days each).
9. Generate exactly 7 entries for nextSevenDaysFocus.
10. Provide smart insights with prerequisite gap warnings and rebalancing suggestions.
11. Project confidence improvement for each subject.
12. Session durations should be realistic (30-90 minutes each).
13. Total daily session minutes should roughly match the available hours for that day type.

Create a comprehensive, actionable, and motivating study plan.`

  const { output } = await generateText({
    model: "openai/gpt-4o-mini",
    output: Output.object({
      schema: studyPlanSchema,
    }),
    prompt,
    maxOutputTokens: 8000,
    temperature: 0.7,
  })

  return Response.json({ studyPlan: output })
}
