import React, { useState, useEffect } from 'react';
import { User, BookOpen, Target, Award, Sparkles, Zap, Heart, Brain, Shield, Sun } from 'lucide-react';

const PersonalityRPG = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [userStats, setUserStats] = useState({
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0,
    level: 1,
    xp: 0,
    completedChallenges: []
  });

  const [journalEntries, setJournalEntries] = useState([]);

  const challenges = [
    {
      id: 1,
      title: "The Tomato Experiment",
      description: "Mindfully eat a tomato and observe every sensation",
      trait: "openness",
      xp: 15,
      icon: Sun,
      completed: false
    },
    {
      id: 2,
      title: "Push-Up Challenge",
      description: "Do push-ups until failure and note your mental state",
      trait: "conscientiousness",
      xp: 20,
      icon: Target,
      completed: false
    },
    {
      id: 3,
      title: "Sunrise Warrior",
      description: "Wake up at sunrise and get sunlight in your eyes",
      trait: "conscientiousness",
      xp: 25,
      icon: Sun,
      completed: false
    },
    {
      id: 4,
      title: "Stranger's Smile",
      description: "Smile at a stranger and observe the interaction",
      trait: "extraversion",
      xp: 15,
      icon: Heart,
      completed: false
    },
    {
      id: 5,
      title: "Hydration Station",
      description: "Drink 3 cups of water and track how you feel",
      trait: "conscientiousness",
      xp: 10,
      icon: Zap,
      completed: false
    },
    {
      id: 6,
      title: "Primal Scream",
      description: "Go to the woods and scream as loud as you can",
      trait: "openness",
      xp: 30,
      icon: Sparkles,
      completed: false
    },
    {
      id: 7,
      title: "Breath & Void",
      description: "Close eyes, hold breath for 10 seconds, observe thoughts",
      trait: "neuroticism",
      xp: 15,
      icon: Brain,
      completed: false
    }
  ];

  const traitColors = {
    openness: "bg-purple-500",
    conscientiousness: "bg-blue-500",
    extraversion: "bg-orange-500",
    agreeableness: "bg-green-500",
    neuroticism: "bg-red-500"
  };

  const traitNames = {
    openness: "Intelligence",
    conscientiousness: "Lawful",
    extraversion: "+Energy",
    agreeableness: "Karma",
    neuroticism: "-Energy"
  };

  const completeChallenge = (challengeId) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge && !userStats.completedChallenges.includes(challengeId)) {
      setUserStats(prev => ({
        ...prev,
        [challenge.trait]: prev[challenge.trait] + 1,
        xp: prev.xp + challenge.xp,
        level: Math.floor((prev.xp + challenge.xp) / 100) + 1,
        completedChallenges: [...prev.completedChallenges, challengeId]
      }));
    }
  };

  const addJournalEntry = (challengeId, reflection) => {
    const challenge = challenges.find(c => c.id === challengeId);
    const entry = {
      id: Date.now(),
      challengeTitle: challenge.title,
      reflection,
      date: new Date().toLocaleDateString(),
      trait: challenge.trait
    };
    setJournalEntries(prev => [entry, ...prev]);
  };

  const ChallengeCard = ({ challenge }) => {
    const [showReflection, setShowReflection] = useState(false);
    const [reflection, setReflection] = useState('');
    const isCompleted = userStats.completedChallenges.includes(challenge.id);
    const Icon = challenge.icon;

    const handleComplete = () => {
      if (reflection.trim()) {
        completeChallenge(challenge.id);
        addJournalEntry(challenge.id, reflection);
        setShowReflection(false);
        setReflection('');
      }
    };

    return (
      <div className={`p-4 rounded-lg border-2 transition-all ${
        isCompleted ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-gray-300'
      }`}>
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-full ${traitColors[challenge.trait]}`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-gray-800">{challenge.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${traitColors[challenge.trait]} text-white`}>
                {traitNames[challenge.trait]}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">+{challenge.xp} XP</span>
              {isCompleted ? (
                <span className="text-green-600 font-medium">✓ Completed</span>
              ) : (
                <button
                  onClick={() => setShowReflection(!showReflection)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Start Challenge
                </button>
              )}
            </div>
          </div>
        </div>
        
        {showReflection && !isCompleted && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How did this challenge make you feel? What did you learn?
            </label>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              className="w-full p-2 border rounded-lg resize-none h-20"
              placeholder="Reflect on your experience..."
            />
            <button
              onClick={handleComplete}
              disabled={!reflection.trim()}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Complete & Reflect
            </button>
          </div>
        )}
      </div>
    );
  };

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Level {userStats.level} Explorer</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-32 h-2 bg-white bg-opacity-20 rounded-full">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-300"
                  style={{ width: `${(userStats.xp % 100)}%` }}
                />
              </div>
              <span className="text-sm">{userStats.xp % 100}/100 XP</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(traitNames).map(([trait, name]) => (
          <div key={trait} className="bg-white p-4 rounded-lg border text-center">
            <div className={`w-12 h-12 mx-auto mb-2 rounded-full ${traitColors[trait]} flex items-center justify-center text-white font-bold text-lg`}>
              {userStats[trait]}
            </div>
            <p className="text-sm font-medium text-gray-700">{name}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg border">
        <h3 className="font-semibold text-gray-800 mb-2">Recent Achievements</h3>
        {userStats.completedChallenges.length === 0 ? (
          <p className="text-gray-500 text-sm">Complete your first challenge to unlock achievements!</p>
        ) : (
          <div className="space-y-2">
            {userStats.completedChallenges.slice(-3).map(challengeId => {
              const challenge = challenges.find(c => c.id === challengeId);
              return (
                <div key={challengeId} className="flex items-center gap-2 text-sm">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span>Completed: {challenge?.title}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  const ChallengesView = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Personality Challenges</h2>
      <p className="text-gray-600">Complete these real-world experiments to discover more about yourself!</p>
      <div className="grid gap-4">
        {challenges.map(challenge => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  );

  const JournalView = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Reflection Journal</h2>
      <p className="text-gray-600">Your personal insights and discoveries</p>
      {journalEntries.length === 0 ? (
        <div className="text-center py-8">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Complete challenges to start building your reflection journal!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {journalEntries.map(entry => (
            <div key={entry.id} className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${traitColors[entry.trait]} text-white`}>
                  {traitNames[entry.trait]}
                </span>
                <span className="text-sm text-gray-500">{entry.date}</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{entry.challengeTitle}</h3>
              <p className="text-gray-600">{entry.reflection}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Personality RPG</h1>
          <p className="text-gray-600">Discover yourself through experiential challenges</p>
        </header>

        <nav className="flex gap-2 mb-6">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: User },
            { id: 'challenges', label: 'Challenges', icon: Target },
            { id: 'journal', label: 'Journal', icon: BookOpen }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setCurrentView(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        <main>
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'challenges' && <ChallengesView />}
          {currentView === 'journal' && <JournalView />}
        </main>
      </div>
    </div>
  );
};

export default PersonalityRPG;