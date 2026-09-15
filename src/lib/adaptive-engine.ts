export type AdaptiveStatus = 'On Track' | 'Ahead' | 'Slightly Behind' | 'At Risk' | 'Critical';

export interface ScheduleDrift {
  status: AdaptiveStatus;
  daysBehind: number; // Negative means ahead
  expectedProgress: number;
  actualProgress: number;
  affectedSystems: string[];
  projectedCompletionDate: string;
  originalCompletionDate: string;
  reason: string;
}

export interface AdaptationStrategy {
  id: string;
  name: string;
  description: string;
  additionalMinutesPerDay: number;
  recoveryDays: number;
  newCompletionDate: string;
  workloadExceedsMax: boolean;
  pros: string;
  cons: string;
  affectsReviewCheckpoint: boolean;
}

export interface ScenarioData {
  id: string;
  name: string;
  description: string;
  drift: ScheduleDrift;
  strategies: AdaptationStrategy[];
  insights: string[];
}

export const MAX_DAILY_MINUTES = 360; // 6 hours

export function calculateAdaptiveState(
  expectedDays: number, 
  actualDays: number, 
  totalDays: number
): { status: AdaptiveStatus; daysBehind: number } {
  const drift = expectedDays - actualDays;
  let status: AdaptiveStatus = 'On Track';

  if (drift < 0) status = 'Ahead';
  else if (drift === 0) status = 'On Track';
  else if (drift <= 2) status = 'Slightly Behind';
  else if (drift <= 5) status = 'At Risk';
  else status = 'Critical';

  return { status, daysBehind: drift };
}