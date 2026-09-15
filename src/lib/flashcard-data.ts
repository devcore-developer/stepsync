export interface Flashcard {
  id: string;
  deckId: string;
  front: string;
  back: string;
  explanation?: string;
  system: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'NEW' | 'LEARNING' | 'REVIEW' | 'MASTERED';
  repetitions: number;
  interval: number; // in days
  ease: number;
  dueDate: string; // ISO string
  lastReviewedAt?: string;
  createdAt: string;
  sourceType?: 'QUESTION' | 'WEAK_AREA' | 'TASK';
  sourceId?: string;
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  system: string;
  color: string;
  tags: string[];
}

export type Rating = 'Again' | 'Hard' | 'Good' | 'Easy';

const today = new Date();
const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString();
};

export const demoDecks: Deck[] = [
  { id: 'deck-1', name: 'USMLE Core Concepts', description: 'General high-yield facts.', system: 'General', color: '#0057A8', tags: ['High Yield'] },
  { id: 'deck-2', name: 'Cardiovascular', description: 'Cardio physiology and pathology.', system: 'Cardiovascular', color: '#E31B2F', tags: ['System'] },
  { id: 'deck-3', name: 'Renal', description: 'Renal system and acid-base.', system: 'Renal', color: '#0057A8', tags: ['System'] },
  { id: 'deck-4', name: 'Microbiology', description: 'Bacteria, viruses, parasites.', system: 'Microbiology', color: '#E5B338', tags: ['System'] },
  { id: 'deck-5', name: 'Pharmacology', description: 'Drug mechanisms and side effects.', system: 'General Pharmacology', color: '#E31B2F', tags: ['System'] },
  { id: 'deck-6', name: 'Biochemistry', description: 'Pathways and genetics.', system: 'Biochemistry', color: '#E5B338', tags: ['System'] },
];

export const demoCards: Flashcard[] = [
  { id: 'c1', deckId: 'deck-1', front: 'What is the rate-limiting enzyme of glycolysis?', back: 'Phosphofructokinase-1 (PFK-1)', explanation: 'PFK-1 is inhibited by ATP and citrate, stimulated by AMP.', system: 'Biochemistry', topic: 'Metabolism', difficulty: 'Medium', status: 'REVIEW', repetitions: 3, interval: 4, ease: 2.5, dueDate: today.toISOString(), createdAt: addDays(today, -10) },
  { id: 'c2', deckId: 'deck-1', front: 'Which antibody isotype is a pentamer?', back: 'IgM', explanation: 'IgM is the first antibody produced in an immune response.', system: 'Immunology', topic: 'Antibodies', difficulty: 'Easy', status: 'MASTERED', repetitions: 5, interval: 30, ease: 2.8, dueDate: addDays(today, 15), createdAt: addDays(today, -20) },
  { id: 'c3', deckId: 'deck-2', front: 'What is the most common cause of right-sided heart failure?', back: 'Left-sided heart failure', explanation: 'Left heart failure increases pulmonary venous pressure, leading to right heart failure.', system: 'Cardiovascular', topic: 'Heart Failure', difficulty: 'Medium', status: 'REVIEW', repetitions: 2, interval: 1, ease: 2.3, dueDate: today.toISOString(), createdAt: addDays(today, -5) },
  { id: 'c4', deckId: 'deck-2', front: 'Which murmur is associated with aortic stenosis?', back: 'Systolic ejection murmur', explanation: 'Crescendo-decrescendo murmur heard best at the right upper sternal border.', system: 'Cardiovascular', topic: 'Valvular Disease', difficulty: 'Hard', status: 'LEARNING', repetitions: 1, interval: 0, ease: 2.0, dueDate: today.toISOString(), createdAt: addDays(today, -2) },
  { id: 'c5', deckId: 'deck-3', front: 'What is the primary site of action of loop diuretics?', back: 'Thick ascending limb of the loop of Henle', explanation: 'They inhibit the Na-K-2Cl cotransporter.', system: 'Renal', topic: 'Pharmacology', difficulty: 'Medium', status: 'NEW', repetitions: 0, interval: 0, ease: 2.5, dueDate: today.toISOString(), createdAt: addDays(today, -1) },
  { id: 'c6', deckId: 'deck-4', front: 'Which organism causes whooping cough?', back: 'Bordetella pertussis', explanation: 'It produces a toxin that increases cAMP, inhibiting phagocytosis.', system: 'Microbiology', topic: 'Bacteriology', difficulty: 'Medium', status: 'NEW', repetitions: 0, interval: 0, ease: 2.5, dueDate: today.toISOString(), createdAt: addDays(today, -1) },
  { id: 'c7', deckId: 'deck-4', front: 'What virus is associated with Burkitt lymphoma?', back: 'Epstein-Barr Virus (EBV)', explanation: 'EBV is also associated with infectious mononucleosis.', system: 'Microbiology', topic: 'Virology', difficulty: 'Easy', status: 'MASTERED', repetitions: 4, interval: 20, ease: 2.6, dueDate: addDays(today, 5), createdAt: addDays(today, -15) },
  { id: 'c8', deckId: 'deck-5', front: 'What is the mechanism of action of statins?', back: 'HMG-CoA reductase inhibition', explanation: 'They decrease cholesterol synthesis, upregulating LDL receptors.', system: 'General Pharmacology', topic: 'Lipid Lowering', difficulty: 'Easy', status: 'REVIEW', repetitions: 2, interval: 3, ease: 2.5, dueDate: addDays(today, -1), createdAt: addDays(today, -8) },
  { id: 'c9', deckId: 'deck-5', front: 'Which drug causes a red man syndrome?', back: 'Vancomycin', explanation: 'Due to histamine release upon rapid infusion.', system: 'General Pharmacology', topic: 'Antibiotics', difficulty: 'Medium', status: 'LEARNING', repetitions: 1, interval: 0, ease: 2.1, dueDate: today.toISOString(), createdAt: addDays(today, -3) },
  { id: 'c10', deckId: 'deck-6', front: 'What is the primary energy source for the brain during fasting?', back: 'Ketone bodies', explanation: 'Ketogenesis occurs in the liver mitochondria.', system: 'Biochemistry', topic: 'Metabolism', difficulty: 'Hard', status: 'NEW', repetitions: 0, interval: 0, ease: 2.5, dueDate: today.toISOString(), createdAt: addDays(today, 0) },
];

export function processCard(card: Flashcard, rating: Rating): Flashcard {
  let { repetitions, interval, ease, status } = card;

  if (rating === 'Again') {
    repetitions = 0;
    interval = 0; // Due later today
    status = 'LEARNING';
    ease = Math.max(1.3, ease - 0.2);
  } else {
    if (rating === 'Hard') {
      interval = repetitions === 0 ? 1 : Math.round(interval * 1.2);
      ease = Math.max(1.3, ease - 0.15);
    } else if (rating === 'Good') {
      interval = repetitions === 0 ? 1 : Math.round(interval * ease);
      ease = Math.max(1.3, ease);
    } else if (rating === 'Easy') {
      interval = repetitions === 0 ? 2 : Math.round(interval * ease * 1.3);
      ease = ease + 0.15;
    }
    repetitions++;
    status = repetitions >= 3 ? 'MASTERED' : 'REVIEW';
  }

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + interval);
  // If interval is 0, set due date to 10 mins from now
  if (interval === 0) dueDate.setMinutes(dueDate.getMinutes() + 10);

  return {
    ...card,
    repetitions,
    interval,
    ease,
    status,
    dueDate: dueDate.toISOString(),
    lastReviewedAt: new Date().toISOString(),
  };
}