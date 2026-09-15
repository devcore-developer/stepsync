export interface Question {
  id: string;
  system: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  stem: string;
  options: string[];
  correctAnswer: number; // index
  explanation: string;
  learningPoints: string[];
}

export interface QuestionBlockResult {
  blockId: string;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredQuestions: number;
  accuracy: number;
  durationSeconds: number;
  systemResults: { system: string; correct: number; total: number }[];
}

export const mockQuestions: Question[] = [
  {
    id: 'q1',
    system: 'Cardiovascular',
    topic: 'Heart Failure',
    difficulty: 'Medium',
    stem: 'A 65-year-old male presents with progressive dyspnea on exertion, orthopnea, and bilateral lower extremity edema. Echocardiography reveals an ejection fraction of 35%. Which of the following pharmacologic agents is most likely to decrease mortality in this patient?',
    options: [
      'Verapamil',
      'Lisinopril',
      'Digoxin',
      'Furosemide',
      'Isosorbide dinitrate'
    ],
    correctAnswer: 1,
    explanation: 'Lisinopril is an ACE inhibitor, which has been shown to decrease mortality in patients with systolic heart failure (HFrEF) by reducing afterload and ventricular remodeling.',
    learningPoints: [
      'ACE inhibitors (Lisinopril) are first-line for HFrEF to reduce mortality.',
      'Beta-blockers and ARNIs also reduce mortality in HFrEF.',
      'Digoxin reduces hospitalizations but does not reduce overall mortality.'
    ]
  },
  {
    id: 'q2',
    system: 'Renal',
    topic: 'Acid-Base Disorders',
    difficulty: 'Hard',
    stem: 'A 45-year-old female with a history of recurrent kidney stones presents with flank pain. Metabolic panel shows Na+ 138, K+ 3.2, Cl- 115, HCO3- 14. Which of the following is the most likely diagnosis?',
    options: [
      'Respiratory acidosis with metabolic compensation',
      'Anion gap metabolic acidosis',
      'Normal anion gap metabolic acidosis',
      'Metabolic alkalosis',
      'Respiratory alkalosis'
    ],
    correctAnswer: 2,
    explanation: 'The patient has a low HCO3- (14) indicating metabolic acidosis. The anion gap is calculated as (Na - (Cl + HCO3)) = 138 - (115 + 14) = 9, which is normal (8-12). This is consistent with a normal anion gap metabolic acidosis, likely distal (Type 1) renal tubular acidosis given the history of kidney stones.',
    learningPoints: [
      'Normal anion gap metabolic acidosis (NAGMA) is caused by GI loss of HCO3- or renal tubular acidosis.',
      'RTA Type 1 (distal) is associated with kidney stones.',
      'Anion Gap = Na - (Cl + HCO3).'
    ]
  },
  {
    id: 'q3',
    system: 'Biochemistry',
    topic: 'Metabolism',
    difficulty: 'Medium',
    stem: 'A researcher is studying a metabolic pathway that occurs exclusively in the mitochondria. Which of the following processes occurs in this organelle?',
    options: [
      'Glycolysis',
      'Fatty acid synthesis',
      'Krebs cycle (TCA)',
      'HMP shunt',
      'Glycogenolysis'
    ],
    correctAnswer: 2,
    explanation: 'The Krebs cycle (TCA cycle) takes place in the mitochondrial matrix, unlike glycolysis, fatty acid synthesis, the HMP shunt, and glycogenolysis, which occur in the cytoplasm.',
    learningPoints: [
      'TCA cycle occurs in the mitochondrial matrix.',
      'Glycolysis occurs in the cytoplasm.',
      'Fatty acid synthesis occurs in the cytoplasm.'
    ]
  },
  {
    id: 'q4',
    system: 'Pathology',
    topic: 'Inflammation',
    difficulty: 'Easy',
    stem: 'Which of the following is the most prominent cell type seen in acute inflammation within the first 24 hours?',
    options: [
      'Lymphocytes',
      'Macrophages',
      'Neutrophils',
      'Eosinophils',
      'Plasma cells'
    ],
    correctAnswer: 2,
    explanation: 'Neutrophils are the predominant cell type in acute inflammation during the first 24-48 hours. They are replaced by macrophages in chronic inflammation.',
    learningPoints: [
      'Acute inflammation (0-48h) is characterized by neutrophils.',
      'Chronic inflammation is characterized by lymphocytes and macrophages.'
    ]
  },
  {
    id: 'q5',
    system: 'Microbiology',
    topic: 'Bacterial Genetics',
    difficulty: 'Medium',
    stem: 'A bacteria acquires a new virulence factor through a bacteriophage. This mechanism of genetic transfer is best described as:',
    options: [
      'Conjugation',
      'Transformation',
      'Transduction',
      'Transposition',
      'Mutation'
    ],
    correctAnswer: 2,
    explanation: 'Transduction is the transfer of DNA from one bacterium to another via a bacteriophage (virus that infects bacteria).',
    learningPoints: [
      'Transduction = Phage-mediated transfer.',
      'Conjugation = Plasmid transfer via sex pili.',
      'Transformation = Uptake of naked DNA from environment.'
    ]
  }
];

export const mockRecentBlocks: QuestionBlockResult[] = [
  {
    blockId: 'b1',
    totalQuestions: 40,
    answeredQuestions: 38,
    correctAnswers: 29,
    incorrectAnswers: 9,
    unansweredQuestions: 2,
    accuracy: 72.5,
    durationSeconds: 3258,
    systemResults: [{ system: 'Pathology', correct: 15, total: 20 }, { system: 'Cardiovascular', correct: 14, total: 20 }]
  },
  {
    blockId: 'b2',
    totalQuestions: 20,
    answeredQuestions: 20,
    correctAnswers: 16,
    incorrectAnswers: 4,
    unansweredQuestions: 0,
    accuracy: 80.0,
    durationSeconds: 1860,
    systemResults: [{ system: 'Biochemistry', correct: 16, total: 20 }]
  }
];

export const questionStats = {
  totalQuestions: 1324,
  completedThisWeek: 280,
  overallAccuracy: 72,
  averageTime: 84,
  marked: 32,
  incorrect: 359,
};

export function calculateAccuracy(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 1000) / 10;
}

export interface QuestionAnswer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
  marked: boolean;
  answeredAt: number;
}
