import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Quiz from './components/Quiz/Quiz';
import Journal from './components/Journal/Journal';
import ChallengeTracker from './components/ChallengeTracker/ChallengeTracker';
import SkillTree from './components/SkillTree/SkillTree';
import Settings from './components/Settings/Settings';

const navItems = [
  { path: '/', label: 'Skill Tree' },
  { path: '/quiz', label: 'Quiz' },
  { path: '/challenges', label: 'Challenges' },
  { path: '/journal', label: 'Journal' },
  { path: '/settings', label: 'Settings' },
];

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-700 text-white flex flex-col">
        <header className="shadow-lg bg-gradient-to-r from-indigo-800 to-purple-800 py-4 px-6 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-wider drop-shadow-lg">InnerQuest: Personality Skill Tree Journal</h1>
          <nav className="flex gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                    isActive ? 'bg-purple-600 text-white shadow' : 'hover:bg-indigo-700 hover:text-yellow-200'
                  }`
                }
                end={item.path === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>
        <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<SkillTree />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/challenges" element={<ChallengeTracker />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <footer className="text-center py-4 text-indigo-200 text-xs opacity-80">
          &copy; {new Date().getFullYear()} InnerQuest RPG. All rights reserved.
        </footer>
      </div>
    </Router>
  );
} 