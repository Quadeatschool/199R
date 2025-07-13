import { create } from 'zustand';

export type Trait = 'openness' | 'conscientiousness' | 'extraversion' | 'agreeableness' | 'neuroticism';

export interface Challenge {
  id: number;
  title: string;
  description: string;
  trait: Trait;
  completed: boolean;
  reflection?: string;
  dateCompleted?: string;
}

export interface JournalEntry {
  id: number;
  challengeId: number;
  reflection: string;
  date: string;
  trait: Trait;
}

export interface UserState {
  traits: Record<Trait, number>;
  completedChallenges: Challenge[];
  journal: JournalEntry[];
  chaosMode: boolean;
  setTrait: (trait: Trait, value: number) => void;
  addCompletedChallenge: (challenge: Challenge) => void;
  addJournalEntry: (entry: JournalEntry) => void;
  toggleChaosMode: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  traits: {
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0,
  },
  completedChallenges: [],
  journal: [],
  chaosMode: false,
  setTrait: (trait, value) => set((state) => ({
    traits: { ...state.traits, [trait]: value },
  })),
  addCompletedChallenge: (challenge) => set((state) => ({
    completedChallenges: [...state.completedChallenges, challenge],
  })),
  addJournalEntry: (entry) => set((state) => ({
    journal: [entry, ...state.journal],
  })),
  toggleChaosMode: () => set((state) => ({ chaosMode: !state.chaosMode })),
})); 