
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  KAIZEN = 'KAIZEN',
  IKIGAI = 'IKIGAI',
  SHINRIN_YOKU = 'SHINRIN_YOKU',
  HARAHACHIBU = 'HARAHACHIBU',
  NEMAWASHI = 'NEMAWASHI',
  POMODORO = 'POMODORO'
}

export interface KaizenEntry {
  id: string;
  timestamp: number;
  description: string;
  category: string;
}

export interface IkigaiData {
  love: string[];
  goodAt: string[];
  worldNeeds: string[];
  paidFor: string[];
}

export interface NemawashiStep {
  id: string;
  stakeholder: string;
  objective: string;
  status: 'pending' | 'completed';
}
