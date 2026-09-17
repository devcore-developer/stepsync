"use client";

import { SessionProvider } from "next-auth/react";
import { StudyPlanProvider } from "@/context/study-plan-context";
import { ResourceProvider } from "@/context/resource-context";
import { QuestionProvider } from "@/context/question-context";
import { FlashcardProvider } from "@/context/flashcard-context";
import { AssistantProvider } from "@/context/assistant-context";
import { AccountabilityProvider } from "@/context/accountability-context";
import { NotificationProvider } from "@/context/notification-context";
import { AccountProvider } from "@/context/account-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
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
    </SessionProvider>
  );
}