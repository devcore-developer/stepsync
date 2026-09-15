import { ReadinessData, SystemReadiness, } from './readiness-engine';

const systemNames = [
  "Pathology", "Biochemistry", "Immunology", "Microbiology", "Neuroscience",
  "Psychiatry", "Musculoskeletal", "Dermatology", "Cardiovascular", "Hematology",
  "Renal", "Endocrine", "Gastrointestinal", "Reproductive", "Respiratory",
  "Ethics", "Biostatistics", "General Pharmacology"
];

function generateSystems(stats: { coverage: number; accuracy: number; questions: number }[]): SystemReadiness[] {
  return systemNames.map((name, i) => {
    const stat = stats[i] || { coverage: 0, accuracy: 0, questions: 0 };
    const readiness = stat.accuracy >= 75 ? 'Strong' : stat.accuracy >= 65 ? 'Needs Attention' : 'At Risk';
    const reviewStatus = stat.coverage === 0 ? 'Not Started' : stat.accuracy >= 75 ? 'Strong' : stat.accuracy >= 65 ? 'Needs Review' : 'Weak';
    return {
      id: name.toLowerCase().replace(/\s/g, '-'),
      name,
      coverage: stat.coverage,
      accuracy: stat.accuracy,
      questions: stat.questions,
      reviewStatus,
      readiness
    };
  });
}

export const readinessScenarios: ReadinessData[] = [
  {
    id: 'on-track',
    name: 'On Track',
    description: 'Solid progress, a few weak spots.',
    examDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    planCompletion: 65, questionAccuracy: 78, systemCoverage: 71, reviewRetention: 84, studyConsistency: 88, uworldProgress: 68,
    systems: generateSystems(Array(18).fill(0).map((_, i) => ({
      coverage: 60 + Math.round(Math.random() * 30),
      accuracy: 70 + Math.round(Math.random() * 20),
      questions: 100 + Math.round(Math.random() * 100)
    }))),
    goals: [
      { id: 'g1', title: 'Complete 3,645 planned questions', progress: 1284, target: 3645, unit: 'questions', status: 'Active' },
      { id: 'g2', title: 'Complete all 18 systems', progress: 11, target: 18, unit: 'systems', status: 'Active' },
      { id: 'g3', title: 'Maintain 7-day study consistency', progress: 12, target: 7, unit: 'days', status: 'Completed' }
    ],
    timeline: [
      { id: 't1', title: 'Finish remaining systems', status: 'Active' },
      { id: 't2', title: 'Complete UWorld target', status: 'Upcoming' },
      { id: 't3', title: 'Review weak systems', status: 'Upcoming' },
      { id: 't4', title: 'Dedicated review period', status: 'Upcoming' },
      { id: 't5', title: 'USMLE Step 1', status: 'Upcoming' }
    ],
    dailyConsistency: [
      { day: 'Mon', hours: '2h 15m' }, { day: 'Tue', hours: '3h 05m' }, { day: 'Wed', hours: '1h 50m' }, { day: 'Thu', hours: '3h 20m' }, { day: 'Fri', hours: '2h 40m' }, { day: 'Sat', hours: '4h 10m' }, { day: 'Sun', hours: '2h 55m' }
    ],
    studyStreak: 12,
    reviewCardsDue: 42,
    reviewOverdue: 6,
    questionsCompleted: 1284,
    questionsTotal: 3645,
    avgDailyQuestions: 32,
    planDaysCompleted: 126,
    planDaysTotal: 240,
    history: [
      { date: 'Sep 15', score: 76, status: 'On Track' },
      { date: 'Sep 1', score: 72, status: 'On Track' },
      { date: 'Aug 15', score: 64, status: 'Needs Attention' },
      { date: 'Aug 1', score: 58, status: 'Needs Attention' }
    ]
  },
  {
    id: 'at-risk',
    name: 'At Risk',
    description: 'Behind schedule and weak performance.',
    examDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    planCompletion: 35, questionAccuracy: 62, systemCoverage: 48, reviewRetention: 70, studyConsistency: 55, uworldProgress: 40,
    systems: generateSystems(Array(18).fill(0).map((_, i) => ({
      coverage: 30 + Math.round(Math.random() * 40),
      accuracy: 55 + Math.round(Math.random() * 15),
      questions: 50 + Math.round(Math.random() * 100)
    }))),
    goals: [
      { id: 'g1', title: 'Complete 3,645 planned questions', progress: 845, target: 3645, unit: 'questions', status: 'Active' },
      { id: 'g2', title: 'Complete all 18 systems', progress: 5, target: 18, unit: 'systems', status: 'Active' }
    ],
    timeline: [
      { id: 't1', title: 'Finish remaining systems', status: 'Active' },
      { id: 't2', title: 'Complete UWorld target', status: 'Upcoming' },
      { id: 't3', title: 'USMLE Step 1', status: 'Upcoming' }
    ],
    dailyConsistency: [
      { day: 'Mon', hours: '0h' }, { day: 'Tue', hours: '1h 05m' }, { day: 'Wed', hours: '0h' }, { day: 'Thu', hours: '2h 20m' }, { day: 'Fri', hours: '0h' }, { day: 'Sat', hours: '1h 10m' }, { day: 'Sun', hours: '0h' }
    ],
    studyStreak: 2,
    reviewCardsDue: 85,
    reviewOverdue: 32,
    questionsCompleted: 845,
    questionsTotal: 3645,
    avgDailyQuestions: 15,
    planDaysCompleted: 84,
    planDaysTotal: 240,
    history: [
      { date: 'Sep 15', score: 48, status: 'At Risk' },
      { date: 'Sep 1', score: 55, status: 'Needs Attention' }
    ]
  },
  {
    id: 'insufficient',
    name: 'Insufficient Data',
    description: 'Just getting started.',
    examDate: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    planCompletion: 2, questionAccuracy: 0, systemCoverage: 5, reviewRetention: 0, studyConsistency: 10, uworldProgress: 1,
    systems: generateSystems(Array(18).fill({ coverage: 0, accuracy: 0, questions: 0 })),
    goals: [
      { id: 'g1', title: 'Complete 3,645 planned questions', progress: 12, target: 3645, unit: 'questions', status: 'Active' }
    ],
    timeline: [
      { id: 't1', title: 'Start studying', status: 'Active' },
      { id: 't2', title: 'USMLE Step 1', status: 'Upcoming' }
    ],
    dailyConsistency: Array(7).fill({ day: '-', hours: '0h' }),
    studyStreak: 1,
    reviewCardsDue: 0,
    reviewOverdue: 0,
    questionsCompleted: 12,
    questionsTotal: 3645,
    avgDailyQuestions: 5,
    planDaysCompleted: 2,
    planDaysTotal: 240,
    history: []
  }
];