# StudyForge AI

**Smart Study Planner for Engineering Students**

StudyForge AI is an AI-powered study planning application designed specifically for engineering students. It generates personalized, adaptive study schedules by analyzing your subjects, academic strengths and weaknesses, available study hours, and target deadlines — producing actionable, week-by-week plans that balance cognitive load, prioritize weak areas, and help you study smarter.

---

## Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vercel_AI_SDK-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel AI SDK" />
  <img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radixui&logoColor=white" alt="Radix UI" />
  <img src="https://img.shields.io/badge/Recharts-22B5BF?style=for-the-badge&logo=recharts&logoColor=white" alt="Recharts" />
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />
  <img src="https://img.shields.io/badge/Lucide-F56565?style=for-the-badge&logo=lucide&logoColor=white" alt="Lucide Icons" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

---

## The Problem

Engineering students face uniquely demanding academic environments:

- **Cognitive Load Imbalance** — Different subjects demand different levels of mental effort, but students lack systems to plan high-focus vs low-focus sessions effectively.
- **Prerequisite Dependencies** — Courses build heavily on prior concepts, yet students often fail to identify foundational gaps blocking their progress.
- **Dynamic Prioritization** — Deadlines, exams, and unexpected topic difficulties constantly shift priorities, making manual planning ineffective.
- **Inefficient Study Patterns** — Cramming, shallow practice, and last-minute studying lead to poor retention and high stress.

## The Solution

StudyForge AI combines artificial intelligence with your personal academic profile to create study plans that genuinely adapt to your needs:

- **Personalized Schedules** — AI analyzes your subjects, credits, deadlines, and confidence levels to create a study plan tailored just for you.
- **Smart Prioritization** — Weak and prerequisite-heavy topics are scheduled earlier, with high-focus topics placed during your preferred study hours.
- **Actionable Insights** — Instead of generic advice, get specific guidance: what to study, when to study it, and why it matters for your progress.
- **Adaptive Learning** — Your plan evolves dynamically as priorities, performance, and difficulty change throughout your academic term.

---

## Features

### Multi-Step Input Wizard
A guided 4-step form collects all the information needed to generate your personalized plan:

1. **Student Details** — Name, college, branch, graduation year, and email.
2. **Subjects & Credits** — Add your subjects with credit weights, mark strong/weak areas, and set a confidence level (1-5) for each.
3. **Study Preferences** — Weekday and weekend study hours, preferred study time (morning/afternoon/evening/night), and target completion date.
4. **Review & Submit** — Verify all your inputs before generating your AI-powered plan.

### AI-Generated Study Plan Dashboard
Once generated, your study plan is presented in a rich, interactive dashboard with five distinct views:

| View | Description |
|------|-------------|
| **Weekly Schedule** | Color-coded daily sessions organized by type (learning, practice, revision, buffer) with cognitive load badges and duration indicators. Navigate between weeks with pagination controls. |
| **Subject Allocation** | Pie chart visualization of hour distribution across subjects, plus per-subject progress bars with AI-generated justifications explaining the allocation rationale. |
| **7-Day Focus** | Actionable daily task lists for the upcoming week, with today highlighted. Each day includes a focus topic and specific tasks to complete. |
| **Smart Insights** | Prioritized recommendations (high/medium/low) covering prerequisite gap warnings, rebalancing suggestions, and strategic study tips. |
| **Outcomes** | Confidence projection bar charts comparing current vs. projected confidence levels per subject, estimated completion date, total study hours, and key benefits summary. |

### Key Capabilities

- **Visual Weekly Schedules** — Color-coded calendar views with clear distinction between session types.
- **Subject-Wise Focus Breakdown** — Hour-based allocation per subject with AI-generated justifications.
- **Smart Prioritization Logic** — Weak topics scheduled earlier; high-focus topics placed during peak hours.
- **Actionable Next Steps** — Specific daily guidance like "Revise Trees before starting Graphs" instead of generic advice.
- **Confidence Projections** — Track expected confidence improvement per subject with visual charts.
- **Cognitive Load Balancing** — High-focus tasks during peak hours, lighter tasks in low-energy time slots.

---

## How It Works

1. **Enter Your Details** — Provide your academic profile, subjects, and study preferences through the guided form wizard.
2. **AI Analyzes Your Profile** — The AI engine processes your inputs, factoring in credit weights, confidence levels, weak areas, preferred study times, and available hours.
3. **Plan is Generated** — A comprehensive, multi-week study plan is created with daily sessions, subject allocations, insights, and confidence projections.
4. **Study Smarter** — Follow your personalized schedule, review daily focus tasks, and use smart insights to stay on track.

---

## Project Structure

```
app/
  page.tsx                    # Main application page (landing, form, plan views)
  api/
    generate-plan/
      route.ts                # AI study plan generation endpoint
components/
  navbar.tsx                  # Navigation bar
  hero-section.tsx            # Landing page hero section
  about-section.tsx           # About StudyForge AI section
  features-section.tsx        # Features grid
  how-it-works-section.tsx    # Step-by-step how it works
  footer.tsx                  # Footer
  study-plan-form.tsx         # Multi-step form wizard
  study-plan-display.tsx      # Study plan dashboard with tabs
lib/
  types.ts                    # TypeScript type definitions
```

---

## Getting Started

### Prerequisites

- Node.js 18+ installed
- An OpenAI API key (or access via Vercel AI Gateway)

### Installation

```bash
# Clone the repository
git clone https://github.com/RishabhXYZA/Study-Forge-AI.git
cd Study-Forge-AI

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

If running outside of Vercel, you may need to set:

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Your OpenAI API key for study plan generation |

---

## Deployment

The easiest way to deploy StudyForge AI is through [Vercel](https://vercel.com):

1. Push your code to GitHub.
2. Import the repository on Vercel.
3. Environment variables are automatically configured if using the Vercel AI Gateway.
4. Deploy.

---

## TRY it LIVE
https://v0-study-forge-ai-app.vercel.app/

## 🎥 Demo Video

👉 [Watch Demo Video](""[https://drive.google.com/drive/u/0/home](https://drive.google.com/file/d/1__H4PqiBmj9IbxYJjvoNIMbLTUQcEJt3/view?usp=sharing)"")


## LICENSE
This project is licensed under the MIT License.
