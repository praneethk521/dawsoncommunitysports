import React, { useEffect, useState } from 'react';
import './index.css';
import logo from '../public/logo.png';
import { AnimatePresence, motion } from 'framer-motion';
import HomeContent from './components/HomeContent';
import EventDetail from './components/EventDetail';
import Leaderboard from './components/Leaderboard';

const App = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'leaderboard' | 'eventDetail'>('home');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches || localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const root = window.document.documentElement;
    darkMode ? root.classList.add('dark') : root.classList.remove('dark');
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    if (activeTab === 'leaderboard') {
      fetchLeaderboard();
    }
  }, [activeTab]);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/pacer-leaderboard');
      const data = await response.json();
      setLeaderboardData(data);
    } catch (err) {
      console.error('Failed to fetch leaderboard data', err);
    }
  };

  useEffect(() => {
    const target = new Date('2025-05-17T13:00:00Z'); // 9 AM EST in UTC
    const interval = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) {
        setCountdown("🏁 It's time!");
        clearInterval(interval);
      } else {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setCountdown(`${d}d ${h}h ${m}m ${s}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderTab = () => {
    if (activeTab === 'home') return <HomeContent setActiveTab={setActiveTab} setSelectedEvent={setSelectedEvent} />;
    if (activeTab === 'leaderboard') return <Leaderboard data={leaderboardData} />;
    if (activeTab === 'eventDetail' && selectedEvent) return <EventDetail event={selectedEvent} />;
    return null;
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="font-sans text-gray-800 dark:text-gray-100 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <nav className="bg-blue-900 dark:bg-gray-900 text-white flex items-center justify-between px-4 py-4 shadow-md">
          <div className="flex gap-8">
            <button onClick={() => setActiveTab('home')} className={`hover:underline ${activeTab === 'home' ? 'font-bold' : ''}`}>Home</button>
            <button onClick={() => setActiveTab('leaderboard')} className={`hover:underline ${activeTab === 'leaderboard' ? 'font-bold' : ''}`}>Cardio Challenge Leaderboard</button>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-yellow-400 text-blue-900 dark:text-gray-800 text-sm font-semibold px-4 py-1 rounded-full shadow-md transition-all duration-300">
              Finals in: {countdown}
            </div>
            <button
              onClick={() => setDarkMode(prev => !prev)}
              className="bg-blue-700 dark:bg-gray-700 px-3 py-1 rounded transition"
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </nav>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>

        <footer className="bg-gray-100 dark:bg-gray-800 mt-16 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; 2025 Dawson Community Sports. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default App;
