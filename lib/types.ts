export interface StudentDetails {
  name: string
  college: string
  branch: string
  graduationYear: string
  email: string
}

export interface Subject {
  id: string
  name: string
  credits: number
  strongAreas: string
  weakAreas: string
  confidenceLevel: number
}

export interface StudyPreferences {
  weekdayHours: number
  weekendHours: number
  preferredTime: "morning" | "afternoon" | "evening" | "night"
  targetDate: string
}

export interface FormData {
  studentDetails: StudentDetails
  subjects: Subject[]
  studyPreferences: StudyPreferences
}

export interface StudySession {
  subject: string
  topic: string
  durationMinutes: number
  type: "learning" | "practice" | "revision" | "buffer"
  cognitiveLoad: "high" | "medium" | "low"
}

export interface DaySchedule {
  day: string
  sessions: StudySession[]
}

export interface WeekPlan {
  weekNumber: number
  weekLabel: string
  dailySchedule: DaySchedule[]
  goals: string[]
}

export interface SubjectAllocation {
  subject: string
  totalHours: number
  percentage: number
  justification: string
}

export interface SmartInsight {
  title: string
  description: string
  priority: "high" | "medium" | "low"
}

export interface ConfidenceProjection {
  subject: string
  currentLevel: number
  projectedLevel: number
}

export interface StudyPlan {
  totalWeeks: number
  totalStudyHours: number
  weeklyPlans: WeekPlan[]
  subjectAllocations: SubjectAllocation[]
  nextSevenDaysFocus: {
    day: string
    focus: string
    tasks: string[]
  }[]
  smartInsights: SmartInsight[]
  outcomeSummary: {
    estimatedCompletionDate: string
    totalStudyHours: number
    confidenceProjections: ConfidenceProjection[]
    keyBenefits: string[]
  }
}
