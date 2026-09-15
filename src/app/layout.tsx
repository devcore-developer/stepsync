import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StudyPlanProvider } from "@/context/study-plan-context";
import { ResourceProvider } from "@/context/resource-context";
import { QuestionProvider } from "@/context/question-context";
import { FlashcardProvider } from "@/context/flashcard-context";
import { AssistantProvider } from "@/context/assistant-context";
import { AccountabilityProvider } from "@/context/accountability-context";
import { NotificationProvider } from "@/context/notification-context";
import { AccountProvider } from "@/context/account-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "StepSync — USMLE Step 1 Study Platform",
    template: "%s | StepSync",
  },
  description:
    "Plan smarter. Study consistently. Prepare with confidence. StepSync is the ultimate free USMLE Step 1 study planning, execution, and accountability platform.",
  keywords: ["USMLE", "Step 1", "Medical School", "Study Planner", "Question Bank", "Flashcards"],
  authors: [{ name: "StepSync" }],
  openGraph: {
    title: "StepSync — USMLE Step 1 Study Platform",
    description: "Plan smarter. Study consistently. Prepare with confidence.",
    type: "website",
    url: "https://stepsync.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "StepSync — USMLE Step 1 Study Platform",
    description: "Plan smarter. Study consistently. Prepare with confidence.",
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#003366',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <AccountProvider>
          <StudyPlanProvider>
            <ResourceProvider>
              <QuestionProvider>
                <FlashcardProvider>
                  <AssistantProvider>
                    <AccountabilityProvider>
                      <NotificationProvider>
                        {children}
                      </NotificationProvider>
                    </AccountabilityProvider>
                  </AssistantProvider>
                </FlashcardProvider>
              </QuestionProvider>
            </ResourceProvider>
          </StudyPlanProvider>
        </AccountProvider>
      </body>
    </html>
  );
}