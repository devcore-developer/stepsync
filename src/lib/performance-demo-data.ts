import { PerformanceScenario, SystemPerformance, getPerformanceStatus } from './performance-engine';

// Helper to generate the 18 systems
function generateSystems(stats: Partial<SystemPerformance>[]): SystemPerformance[] {
  const names = [
    "Pathology", "Biochemistry", "Immunology", "Microbiology", "Neuroscience",
    "Psychiatry", "Musculoskeletal", "Dermatology", "Cardiovascular", "Hematology",
    "Renal", "Endocrine", "Gastrointestinal", "Reproductive", "Respiratory",
    "Ethics", "Biostatistics", "General Pharmacology"
  ];
  
  return names.map((name, i) => {
    const stat = stats[i] || {};
    const questionsCompleted = stat.questionsCompleted || 0;
    const questionsCorrect = stat.questionsCorrect || 0;
    const accuracy = stat.accuracy || (questionsCompleted > 0 ? Math.round((questionsCorrect / questionsCompleted) * 100) : 0);
    const completion = stat.completion || 0;
    const trend = stat.trend || 0;
    
    return {
      id: name.toLowerCase().replace(/\s/g, '-'),
      name,
      questionsCompleted,
      questionsCorrect,
      accuracy,
      completion,
      trend,
      status: getPerformanceStatus(accuracy, completion),
      topics: stat.topics || []
    };
  });
}

export const performanceScenarios: PerformanceScenario[] = [
  {
    id: 'average',
    name: 'Average Student',
    description: 'Steady progress, some weak spots.',
    summary: { planCompletion: 35, uworldCompletion: 35, questionAccuracy: 72, studyConsistency: 88, avgDailyStudyTime: '4h 32m', currentStreak: 12 },
    uworld: { completed: 1284, total: 3645, correct: 925, incorrect: 359, avgPerDay: 42 },
    weeklyAccuracy: [
      { week: 'W1', accuracy: 66 }, { week: 'W2', accuracy: 68 }, { week: 'W3', accuracy: 70 }, { week: 'W4', accuracy: 72 }, { week: 'W5', accuracy: 71 }, { week: 'W6', accuracy: 74 }
    ],
    weeklyVolume: [
      { week: 'W1', questions: 180 }, { week: 'W2', questions: 220 }, { week: 'W3', questions: 245 }, { week: 'W4', questions: 280 }, { week: 'W5', questions: 265 }, { week: 'W6', questions: 300 }
    ],
    systems: generateSystems([
      { questionsCompleted: 240, questionsCorrect: 187, accuracy: 78, completion: 62, trend: 2, topics: [{ name: 'Cell Injury', questions: 40, accuracy: 84, trend: 2 }, { name: 'Inflammation', questions: 50, accuracy: 76, trend: 1 }] },
      { questionsCompleted: 180, questionsCorrect: 115, accuracy: 64, completion: 48, trend: -2, topics: [{ name: 'Metabolism', questions: 60, accuracy: 62, trend: -3 }] },
      { questionsCompleted: 90, questionsCorrect: 67, accuracy: 74, completion: 40, trend: 1 },
      { questionsCompleted: 120, questionsCorrect: 79, accuracy: 66, completion: 35, trend: -1 },
      { questionsCompleted: 110, questionsCorrect: 82, accuracy: 75, completion: 30, trend: 3 },
      { questionsCompleted: 60, questionsCorrect: 45, accuracy: 75, completion: 45, trend: 0 },
      { questionsCompleted: 40, questionsCorrect: 28, accuracy: 70, completion: 20, trend: 1 },
      { questionsCompleted: 20, questionsCorrect: 15, accuracy: 75, completion: 15, trend: 0 },
      { questionsCompleted: 220, questionsCorrect: 163, accuracy: 74, completion: 51, trend: 2, topics: [{ name: 'Heart Failure', questions: 50, accuracy: 80, trend: 3 }] },
      { questionsCompleted: 80, questionsCorrect: 52, accuracy: 65, completion: 38, trend: -1 },
      { questionsCompleted: 95, questionsCorrect: 61, accuracy: 64, completion: 42, trend: -2, topics: [{ name: 'Acid-Base', questions: 30, accuracy: 60, trend: -4 }] },
      { questionsCompleted: 85, questionsCorrect: 60, accuracy: 70, completion: 35, trend: 1 },
      { questionsCompleted: 130, questionsCorrect: 91, accuracy: 70, completion: 40, trend: 0 },
      { questionsCompleted: 50, questionsCorrect: 35, accuracy: 70, completion: 25, trend: 1 },
      { questionsCompleted: 100, questionsCorrect: 70, accuracy: 70, completion: 38, trend: 0 },
      { questionsCompleted: 30, questionsCorrect: 24, accuracy: 80, completion: 50, trend: 2 },
      { questionsCompleted: 40, questionsCorrect: 28, accuracy: 70, completion: 45, trend: 0 },
      { questionsCompleted: 34, questionsCorrect: 22, accuracy: 65, completion: 30, trend: -1 }
    ]),
    insights: [
      "Your accuracy has improved by 6% over the last 30 days.",
      "Your question volume increased by 18% this month.",
      "Renal is currently your weakest completed system.",
      "You perform best when completing 40–60 questions per day."
    ]
  },
  {
    id: 'new',
    name: 'New Student',
    description: 'Just getting started.',
    summary: { planCompletion: 2, uworldCompletion: 1, questionAccuracy: 0, studyConsistency: 10, avgDailyStudyTime: '1h 15m', currentStreak: 1 },
    uworld: { completed: 12, total: 3645, correct: 8, incorrect: 4, avgPerDay: 12 },
    weeklyAccuracy: [{ week: 'W1', accuracy: 66 }],
    weeklyVolume: [{ week: 'W1', questions: 12 }],
    systems: generateSystems(Array(18).fill({ questionsCompleted: 0, questionsCorrect: 0, accuracy: 0, completion: 0, trend: 0 })),
    insights: [
      "You're just getting started.",
      "Complete at least 50 questions to unlock more meaningful performance insights."
    ]
  },
  {
    id: 'strong',
    name: 'Strong / On Track',
    description: 'High accuracy, excellent consistency.',
    summary: { planCompletion: 65, uworldCompletion: 68, questionAccuracy: 82, studyConsistency: 95, avgDailyStudyTime: '5h 45m', currentStreak: 24 },
    uworld: { completed: 2480, total: 3645, correct: 2034, incorrect: 446, avgPerDay: 55 },
    weeklyAccuracy: [{ week: 'W1', accuracy: 78 }, { week: 'W2', accuracy: 80 }, { week: 'W3', accuracy: 81 }, { week: 'W4', accuracy: 82 }, { week: 'W5', accuracy: 83 }, { week: 'W6', accuracy: 82 }],
    weeklyVolume: [{ week: 'W1', questions: 300 }, { week: 'W2', questions: 320 }, { week: 'W3', questions: 350 }, { week: 'W4', questions: 380 }, { week: 'W5', questions: 360 }, { week: 'W6', questions: 400 }],
    systems: generateSystems(Array(18).fill({ questionsCompleted: 150, questionsCorrect: 125, accuracy: 83, completion: 65, trend: 2 })),
    insights: [
      "Your accuracy is consistently above 80%.",
      "You are on track to finish your plan 5 days early.",
      "Cardiovascular and Pathology are your strongest systems."
    ]
  }
];