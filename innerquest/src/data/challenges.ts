import { Trait, Challenge } from '../store/userStore';

export const challenges: Challenge[] = [
  // Openness
  {
    id: 1,
    title: 'Write a Poem',
    description: 'Try writing a poem in 10 minutes.',
    trait: 'openness',
    completed: false,
  },
  {
    id: 2,
    title: 'Try New Food',
    description: 'Eat something you’ve never tried before.',
    trait: 'openness',
    completed: false,
  },
  {
    id: 3,
    title: 'Draw from Memory',
    description: 'Draw something from memory.',
    trait: 'openness',
    completed: false,
  },
  // Conscientiousness
  {
    id: 4,
    title: 'Make Your Bed',
    description: 'Make your bed every day for a week.',
    trait: 'conscientiousness',
    completed: false,
  },
  {
    id: 5,
    title: 'Organize Drawer',
    description: 'Organize one drawer or folder.',
    trait: 'conscientiousness',
    completed: false,
  },
  {
    id: 6,
    title: 'Plan 3 Days',
    description: 'Plan your next three days and follow the schedule.',
    trait: 'conscientiousness',
    completed: false,
  },
  // Extraversion
  {
    id: 7,
    title: 'Smile at a Stranger',
    description: 'Smile at a stranger.',
    trait: 'extraversion',
    completed: false,
  },
  {
    id: 8,
    title: 'Call Instead of Text',
    description: 'Call someone instead of texting.',
    trait: 'extraversion',
    completed: false,
  },
  {
    id: 9,
    title: 'Join a Group Conversation',
    description: 'Join a group conversation.',
    trait: 'extraversion',
    completed: false,
  },
  // Agreeableness
  {
    id: 10,
    title: 'Anonymous Kindness',
    description: 'Do something kind anonymously.',
    trait: 'agreeableness',
    completed: false,
  },
  {
    id: 11,
    title: 'Thank You Message',
    description: 'Write a thank-you message to someone.',
    trait: 'agreeableness',
    completed: false,
  },
  {
    id: 12,
    title: 'Let Someone Go Ahead',
    description: 'Let someone go ahead of you in line.',
    trait: 'agreeableness',
    completed: false,
  },
  // Neuroticism (Resilience)
  {
    id: 13,
    title: 'Just Breathe',
    description: 'Sit quietly for 5 minutes and just breathe.',
    trait: 'neuroticism',
    completed: false,
  },
  {
    id: 14,
    title: 'Scream Therapy',
    description: 'Scream into a pillow or into the woods.',
    trait: 'neuroticism',
    completed: false,
  },
  {
    id: 15,
    title: 'Tear Up Worries',
    description: 'Write down your worries, then tear up the paper.',
    trait: 'neuroticism',
    completed: false,
  },
  // Chaos/Mixed
  {
    id: 16,
    title: 'Tomato Experiment',
    description: 'What would I feel like after eating a tomato?',
    trait: 'openness',
    completed: false,
  },
  {
    id: 17,
    title: 'Push-Ups Until Failure',
    description: 'What would happen if I did push-ups until failure?',
    trait: 'conscientiousness',
    completed: false,
  },
  {
    id: 18,
    title: 'Hydration Station',
    description: 'How do I feel after drinking 3 cups of water?',
    trait: 'conscientiousness',
    completed: false,
  },
  {
    id: 19,
    title: 'Primal Scream',
    description: 'How would I feel after going out into the woods and screaming as loud as I can?',
    trait: 'openness',
    completed: false,
  },
  {
    id: 20,
    title: 'Breath & Void',
    description: 'What happens when I hold my breath with my eyes closed for 10 seconds?',
    trait: 'neuroticism',
    completed: false,
  },
  {
    id: 21,
    title: 'Sunrise Warrior',
    description: 'What does it feel like to wake up at sunrise and get sunlight in my eyes?',
    trait: 'conscientiousness',
    completed: false,
  },
]; 