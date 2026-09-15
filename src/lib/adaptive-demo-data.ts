import { ScenarioData } from './adaptive-engine';

export const adaptiveScenarios: ScenarioData[] = [
  {
    id: 'on-track',
    name: 'On Track',
    description: 'Pace matches target perfectly.',
    drift: {
      status: 'On Track',
      daysBehind: 0,
      expectedProgress: 42,
      actualProgress: 42,
      affectedSystems: [],
      projectedCompletionDate: 'Aug 12, 2025',
      originalCompletionDate: 'Aug 12, 2025',
      reason: 'Your current pace matches your target pace.'
    },
    strategies: [],
    insights: [
      "You're completing 100% of scheduled tasks.",
      "Your average study time is exactly on target.",
      "Your current pace is enough to finish on time."
    ]
  },
  {
    id: 'behind-2-days',
    name: '2 Days Behind',
    description: 'Missed a few tasks, slight drift.',
    drift: {
      status: 'Slightly Behind',
      daysBehind: 2,
      expectedProgress: 42,
      actualProgress: 40,
      affectedSystems: ['Microbiology', 'Neuroscience'],
      projectedCompletionDate: 'Aug 14, 2025',
      originalCompletionDate: 'Aug 12, 2025',
      reason: 'You completed 4 of 6 planned tasks yesterday, causing a 2-day drift.'
    },
    strategies: [
      {
        id: 'spread-a',
        name: 'Spread the missed work',
        description: 'Add small amounts to upcoming days.',
        additionalMinutesPerDay: 20,
        recoveryDays: 3,
        newCompletionDate: 'Aug 12, 2025',
        workloadExceedsMax: false,
        pros: 'Maintains current completion date.',
        cons: 'Slightly longer study sessions for 3 days.',
        affectsReviewCheckpoint: false
      },
      {
        id: 'recovery-day-b',
        name: 'Use a recovery day',
        description: 'Use the next scheduled review day to catch up.',
        additionalMinutesPerDay: 0,
        recoveryDays: 2,
        newCompletionDate: 'Aug 12, 2025',
        workloadExceedsMax: false,
        pros: 'No additional daily workload.',
        cons: 'Delays the review checkpoint by 1 day.',
        affectsReviewCheckpoint: true
      }
    ],
    insights: [
      "You're completing 85% of scheduled tasks.",
      "Your average study time is 15 minutes below target.",
      "You have 2 unfinished tasks from previous days."
    ]
  },
  {
    id: 'behind-5-days',
    name: '5 Days Behind',
    description: 'Significant drift, at risk.',
    drift: {
      status: 'At Risk',
      daysBehind: 5,
      expectedProgress: 45,
      actualProgress: 40,
      affectedSystems: ['Cardiovascular', 'Renal', 'Respiratory'],
      projectedCompletionDate: 'Aug 17, 2025',
      originalCompletionDate: 'Aug 12, 2025',
      reason: 'Missing multiple study days has pushed your completion date by 5 days.'
    },
    strategies: [
      {
        id: 'spread-c',
        name: 'Spread the missed work',
        description: 'Add work to upcoming days.',
        additionalMinutesPerDay: 45,
        recoveryDays: 5,
        newCompletionDate: 'Aug 14, 2025',
        workloadExceedsMax: false,
        pros: 'Recovers 3 days of the delay.',
        cons: 'Adds 45 minutes to your daily load for 5 days.',
        affectsReviewCheckpoint: false
      },
      {
        id: 'extend-d',
        name: 'Extend the plan',
        description: 'Keep the daily workload unchanged.',
        additionalMinutesPerDay: 0,
        recoveryDays: 0,
        newCompletionDate: 'Aug 17, 2025',
        workloadExceedsMax: false,
        pros: 'No additional daily workload or stress.',
        cons: 'Plan extends by 5 days past original target.',
        affectsReviewCheckpoint: false
      },
      {
        id: 'intensive-e',
        name: 'Intensive Recovery',
        description: 'Maximize daily load to catch up.',
        additionalMinutesPerDay: 90,
        recoveryDays: 4,
        newCompletionDate: 'Aug 12, 2025',
        workloadExceedsMax: true,
        pros: 'Maintains original completion date.',
        cons: 'Exceeds recommended daily workload (7.5h/day).',
        affectsReviewCheckpoint: false
      }
    ],
    insights: [
      "You're completing 60% of scheduled tasks.",
      "Your current pace may push your completion date by 5 days.",
      "You have 8 unfinished tasks from previous days."
    ]
  },
  {
    id: 'missed-yesterday',
    name: 'Missed Yesterday',
    description: 'Took a break, 1 day behind.',
    drift: {
      status: 'Slightly Behind',
      daysBehind: 1,
      expectedProgress: 41,
      actualProgress: 40,
      affectedSystems: ['Pathology'],
      projectedCompletionDate: 'Aug 13, 2025',
      originalCompletionDate: 'Aug 12, 2025',
      reason: 'Yesterday was a missed study day. 4 tasks were scheduled, 0 completed.'
    },
    strategies: [
       {
        id: 'spread-f',
        name: 'Distribute missed tasks',
        description: 'Add 1 missed task to the next 4 days.',
        additionalMinutesPerDay: 30,
        recoveryDays: 4,
        newCompletionDate: 'Aug 12, 2025',
        workloadExceedsMax: false,
        pros: 'Recovers the delay without overwhelming today.',
        cons: '4 days will be slightly heavier than normal.',
        affectsReviewCheckpoint: false
      },
      {
        id: 'drop-g',
        name: 'Keep original schedule',
        description: 'Let the missed day drift.',
        additionalMinutesPerDay: 0,
        recoveryDays: 0,
        newCompletionDate: 'Aug 13, 2025',
        workloadExceedsMax: false,
        pros: 'No extra work added today.',
        cons: 'Plan completion delayed by 1 day.',
        affectsReviewCheckpoint: false
      }
    ],
    insights: [
      "You missed your study session yesterday.",
      "StepSync can recover this without extending your plan.",
      "You have 4 unfinished tasks from yesterday."
    ]
  },
  {
    id: 'ahead',
    name: 'Ahead of Schedule',
    description: 'Studied extra, ahead of plan.',
    drift: {
      status: 'Ahead',
      daysBehind: -3,
      expectedProgress: 38,
      actualProgress: 41,
      affectedSystems: [],
      projectedCompletionDate: 'Aug 9, 2025',
      originalCompletionDate: 'Aug 12, 2025',
      reason: "You've completed 3 more tasks than expected."
    },
    strategies: [
      {
        id: 'maintain-h',
        name: 'Continue at current pace',
        description: 'Keep going as you are.',
        additionalMinutesPerDay: 0,
        recoveryDays: 0,
        newCompletionDate: 'Aug 9, 2025',
        workloadExceedsMax: false,
        pros: 'Finish 3 days early!',
        cons: 'None.',
        affectsReviewCheckpoint: false
      },
      {
        id: 'slow-i',
        name: 'Slow down',
        description: 'Reduce daily load to original target.',
        additionalMinutesPerDay: -30,
        recoveryDays: 0,
        newCompletionDate: 'Aug 12, 2025',
        workloadExceedsMax: false,
        pros: 'More free time daily, finishes exactly on target.',
        cons: 'Loses the 3-day buffer you built.',
        affectsReviewCheckpoint: false
      }
    ],
    insights: [
      "You're completing 115% of scheduled tasks.",
      "Your average study time is 20 minutes above target.",
      "Your current pace is enough to finish 3 days early."
    ]
  }
];

export const changeHistory = [
  { id: 'ch1', date: 'Today, 10:42 AM', reason: 'Missed study day', adjustment: 'Distributed 3 tasks across the next 4 days', result: 'No change to completion date' },
  { id: 'ch2', date: 'Sep 12, 2024', reason: 'Exam date changed', adjustment: 'Compressed final review period', result: 'Plan updated successfully' }
];