export enum AnalyticsEvent {
  ACCOUNT_CREATED = 'account_created',
  STUDY_PLAN_CREATED = 'study_plan_created',
  STUDY_SESSION_STARTED = 'study_session_started',
  STUDY_SESSION_COMPLETED = 'study_session_completed',
  QUESTION_BLOCK_STARTED = 'question_block_started',
  QUESTION_BLOCK_COMPLETED = 'question_block_completed',
  FLASHCARD_SESSION_COMPLETED = 'flashcard_session_completed',
  READINESS_VIEWED = 'readiness_viewed',
  SUBSCRIPTION_STARTED = 'subscription_started',
  SUBSCRIPTION_CANCELLED = 'subscription_cancelled',
}

class Analytics {
  track(event: AnalyticsEvent, properties?: Record<string, any>) {
    if (typeof window !== 'undefined') {
      // Send to Google Analytics, Mixpanel, etc.
      // Avoid sending PII or sensitive medical data
      console.debug(`[Analytics] ${event}`, properties);
    }
  }
}

export const analytics = new Analytics();