import React, { useState } from 'react';
import { quizQuestions } from '../../data/quizQuestions';
import { useUserStore } from '../../store/userStore';

const scale = [1, 2, 3, 4, 5]; // 1 = Strongly Disagree, 5 = Strongly Agree
const scaleLabels = [
  'Strongly Disagree',
  'Disagree',
  'Neutral',
  'Agree',
  'Strongly Agree',
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(quizQuestions.length).fill(3));
  const [finished, setFinished] = useState(false);
  const setTrait = useUserStore((s) => s.setTrait);

  const handleAnswer = (value: number) => {
    const updated = [...answers];
    updated[current] = value;
    setAnswers(updated);
    if (current < quizQuestions.length - 1) {
      setCurrent(current + 1);
    } else {
      // Calculate and save trait scores
      const traitScores: Record<string, number[]> = {};
      quizQuestions.forEach((q, i) => {
        const score = q.reverse ? 6 - updated[i] : updated[i];
        if (!traitScores[q.trait]) traitScores[q.trait] = [];
        traitScores[q.trait].push(score);
      });
      (Object.keys(traitScores) as Array<keyof typeof traitScores>).forEach((trait) => {
        const avg = Math.round(
          traitScores[trait].reduce((a, b) => a + b, 0) / traitScores[trait].length
        );
        setTrait(trait as any, avg);
      });
      setFinished(true);
    }
  };

  if (finished) {
    const traits = useUserStore((s) => s.traits);
    const traitLabels: Record<string, string> = {
      openness: 'Openness',
      conscientiousness: 'Conscientiousness',
      extraversion: 'Extraversion',
      agreeableness: 'Agreeableness',
      neuroticism: 'Neuroticism',
    };
    const feedback: Record<string, string> = {
      openness: 'Curious, creative, open to new experiences.',
      conscientiousness: 'Organized, reliable, self-disciplined.',
      extraversion: 'Outgoing, energetic, enjoys socializing.',
      agreeableness: 'Compassionate, cooperative, trusting.',
      neuroticism: 'Sensitive, prone to stress, emotionally aware.',
    };
    return (
      <div className="max-w-xl mx-auto p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
        <p className="mb-6">Your baseline personality scores:</p>
        <div className="space-y-4 mb-8">
          {Object.entries(traits).map(([trait, score]) => (
            <div key={trait} className="text-left">
              <div className="flex justify-between mb-1">
                <span className="font-semibold capitalize">{traitLabels[trait]}</span>
                <span className="font-mono">{score}/5</span>
              </div>
              <div className="w-full bg-gray-700 rounded h-4 mb-1">
                <div
                  className={`h-4 rounded ${trait === 'neuroticism' ? 'bg-pink-400' : 'bg-purple-500'}`}
                  style={{ width: `${(score / 5) * 100}%` }}
                />
              </div>
              <div className="text-xs text-gray-300 italic mb-2">{feedback[trait]}</div>
            </div>
          ))}
        </div>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold shadow"
          onClick={() => {
            setAnswers(Array(quizQuestions.length).fill(3));
            setCurrent(0);
            setFinished(false);
          }}
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  const q = quizQuestions[current];

  return (
    <div className="max-w-xl mx-auto p-8 text-center">
      <h2 className="text-3xl font-bold mb-4">Personality Quiz</h2>
      <div className="mb-6">
        <div className="text-lg font-semibold mb-2">Question {current + 1} of {quizQuestions.length}</div>
        <div className="text-xl mb-4">{q.text}</div>
        <div className="flex flex-col gap-2 items-center">
          {scale.map((val, idx) => (
            <button
              key={val}
              className={`w-full py-2 rounded-lg border-2 transition-colors font-medium ${answers[current] === val ? 'bg-purple-600 text-white border-purple-700' : 'bg-white text-gray-900 border-gray-300 hover:bg-purple-100'}`}
              onClick={() => handleAnswer(val)}
            >
              {val} - {scaleLabels[idx]}
            </button>
          ))}
        </div>
      </div>
      <div className="text-sm text-gray-300 mt-8">Trait: <span className="font-bold capitalize">{q.trait}</span>{q.reverse ? ' (reverse scored)' : ''}</div>
    </div>
  );
} 