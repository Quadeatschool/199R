import { Trait } from '../store/userStore';

export interface QuizQuestion {
  id: number;
  text: string;
  trait: Trait;
  reverse?: boolean; // for reverse-scored items
}

export const quizQuestions: QuizQuestion[] = [
  // Openness
  { id: 1, text: 'I have a vivid imagination.', trait: 'openness' },
  { id: 2, text: 'I am quick to understand things.', trait: 'openness' },
  // Conscientiousness
  { id: 3, text: 'I am always prepared.', trait: 'conscientiousness' },
  { id: 4, text: 'I pay attention to details.', trait: 'conscientiousness' },
  // Extraversion
  { id: 5, text: 'I am the life of the party.', trait: 'extraversion' },
  { id: 6, text: 'I feel comfortable around people.', trait: 'extraversion' },
  // Agreeableness
  { id: 7, text: 'I sympathize with others’ feelings.', trait: 'agreeableness' },
  { id: 8, text: 'I have a soft heart.', trait: 'agreeableness' },
  // Neuroticism
  { id: 9, text: 'I get stressed out easily.', trait: 'neuroticism' },
  { id: 10, text: 'I worry about things.', trait: 'neuroticism' },
  // Reverse-scored examples
  { id: 11, text: 'I have difficulty understanding abstract ideas.', trait: 'openness', reverse: true },
  { id: 12, text: 'I make a mess of things.', trait: 'conscientiousness', reverse: true },
  { id: 13, text: 'I don’t talk a lot.', trait: 'extraversion', reverse: true },
  { id: 14, text: 'I am not interested in other people’s problems.', trait: 'agreeableness', reverse: true },
  { id: 15, text: 'I am relaxed most of the time.', trait: 'neuroticism', reverse: true },
]; 