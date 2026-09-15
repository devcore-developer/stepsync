export interface AssistantAction {
  label: string;
  href: string;
  variant?: 'primary' | 'outline' | 'red' | 'gold';
}

export interface AssistantMetric {
  label: string;
  value: string;
}

export interface AssistantResponse {
  id: string;
  text: string;
  metrics?: AssistantMetric[];
  list?: string[];
  actions?: AssistantAction[];
}

export type AssistantState = 'On Track' | 'Behind Schedule' | 'Insufficient Data' | 'Heavy Review';

export interface AssistantContext {
  state: AssistantState;
  weakestSystem: string;
  weakestAccuracy: number;
  strongestSystem: string;
  strongestAccuracy: number;
  dueCards: number;
  overdueCards: number;
  questionsCompleted: number;
  questionsTotal: number;
  readinessScore: number;
  daysBehind: number;
}

export function generateAssistantResponse(query: string, ctx: AssistantContext): AssistantResponse {
  const q = query.toLowerCase();
  const id = `msg-${Date.now()}`;

  // Intent: What should I study today?
  if (q.includes('study today') || q.includes('do next') || q.includes('what should i do')) {
    return {
      id,
      text: `Based on your current plan, performance, and review workload, I recommend focusing on ${ctx.weakestSystem}. It has below-target accuracy and several due review cards.`,
      metrics: [
        { label: 'Focus System', value: ctx.weakestSystem },
        { label: 'Accuracy', value: `${ctx.weakestAccuracy}%` },
        { label: 'Due Cards', value: `${ctx.dueCards}` }
      ],
      list: [
        `Complete 20 UWorld-style practice questions for ${ctx.weakestSystem}`,
        `Review ${ctx.dueCards} due flashcards`,
        `Complete today's scheduled ${ctx.weakestSystem} study task`
      ],
      actions: [
        { label: 'Start Questions', href: '/questions', variant: 'primary' },
        { label: 'Start Review', href: '/review', variant: 'outline' },
        { label: "Open Today's Plan", href: '/study/today', variant: 'outline' }
      ]
    };
  }

  // Intent: Weak Areas
  if (q.includes('weakest') || q.includes('weak') || q.includes('struggling')) {
    return {
      id,
      text: `Your highest-priority area is ${ctx.weakestSystem}. It has the lowest accuracy among systems you've covered. Your secondary focus should be improving question volume here.`,
      metrics: [
        { label: 'System', value: ctx.weakestSystem },
        { label: 'Accuracy', value: `${ctx.weakestAccuracy}%` },
        { label: 'Questions Completed', value: `${ctx.questionsCompleted}` }
      ],
      actions: [
        { label: `Practice ${ctx.weakestSystem}`, href: '/questions', variant: 'red' },
        { label: 'View Performance', href: '/performance', variant: 'outline' }
      ]
    };
  }

  // Intent: Review vs Questions
  if (q.includes('questions or review') || q.includes('review or questions')) {
    if (ctx.overdueCards > 5 || ctx.dueCards > 30) {
      return {
        id,
        text: `Review first. You have ${ctx.dueCards} cards due today and ${ctx.overdueCards} overdue. Clearing these will strengthen your foundation before tackling new questions.`,
        actions: [
          { label: 'Start Review', href: '/review', variant: 'primary' }
        ]
      };
    }
    return {
      id,
      text: `Practice questions. Your review workload is low (${ctx.dueCards} cards), but your overall question count (${ctx.questionsCompleted}/${ctx.questionsTotal}) needs improvement.`,
      actions: [
        { label: 'Start Question Block', href: '/questions', variant: 'primary' }
      ]
    };
  }

  // Intent: Am I on track?
  if (q.includes('on track') || q.includes('ready') || q.includes('readiness')) {
    return {
      id,
      text: `Your StepSync Readiness Score is ${ctx.readinessScore}% — ${ctx.state}. You are currently ${ctx.daysBehind > 0 ? `${ctx.daysBehind} days behind` : 'on schedule'}.`,
      list: [
        `Strongest area: ${ctx.strongestSystem} (${ctx.strongestAccuracy}%)`,
        `Biggest priority: ${ctx.weakestSystem} (${ctx.weakestAccuracy}%)`,
        `Overdue reviews: ${ctx.overdueCards} cards`
      ],
      actions: [
        { label: 'Open Readiness', href: '/readiness', variant: 'primary' }
      ]
    };
  }

  // Intent: Missed day / Recovery
  if (q.includes('missed') || q.includes('behind') || q.includes('recover')) {
    return {
      id,
      text: `You are ${ctx.daysBehind} study day(s) behind. Do not try to double your workload today. Instead, complete today's plan and distribute the missed work over the next 3 days.`,
      list: [
        'Today: Complete today’s planned work.',
        'Tomorrow: Add 30 minutes for the missed review.',
        'Do not double today’s question volume.'
      ],
      actions: [
        { label: 'Open Recovery Plan', href: '/study/adaptive', variant: 'red' }
      ]
    };
  }

  // Default / Unknown
  return {
    id,
    text: "I can help with your study plan, questions, performance, review, and exam readiness. Try asking 'What should I study today?' or 'Where am I weakest?'",
    actions: [
      { label: "Today's Plan", href: '/study/today', variant: 'outline' },
      { label: 'View Readiness', href: '/readiness', variant: 'outline' }
    ]
  };
}

export function generateSessionPlan(minutes: number, ctx: AssistantContext): AssistantResponse {
  const id = `session-${Date.now()}`;
  if (minutes <= 30) {
    return {
      id,
      text: `Here is a focused ${minutes}-minute session plan.`,
      list: [
        `10 min: Review ${Math.min(10, ctx.dueCards)} due flashcards`,
        `20 min: Practice ${Math.floor(minutes/1.5)} ${ctx.weakestSystem} questions`
      ],
      actions: [{ label: 'Start Session', href: '/questions', variant: 'primary' }]
    };
  }
  return {
    id,
    text: `Here is a balanced ${minutes}-minute session plan.`,
    list: [
      `45 min: Practice 25 ${ctx.weakestSystem} questions`,
      `30 min: Review ${Math.min(20, ctx.dueCards)} due flashcards`,
      `15 min: Review incorrect concepts from today`,
      `${minutes - 90} min: Buffer / Break`
    ],
    actions: [{ label: 'Start Session', href: '/questions', variant: 'primary' }]
  };
}