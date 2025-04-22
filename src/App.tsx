import React, { useEffect, useState } from 'react';
import './index.css';
import logo from '../public/logo.png';
import { AnimatePresence, motion } from 'framer-motion';
import HomeContent from './components/HomeContent';
import EventDetail from './components/EventDetail';
import Subdivisions from './components/Subdivisions';

const App = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'eventDetail' | 'subdivisions' | 'schedules' | 'contacts'>('home');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const savedPref = localStorage.getItem('darkMode');

    if (isMobile) {
      setDarkMode(false);
    } else {
      setDarkMode(savedPref === 'true');
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

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
    switch (activeTab) {
      case 'home':
        return <HomeContent setActiveTab={setActiveTab} setSelectedEvent={setSelectedEvent} />;
      case 'eventDetail':
        return selectedEvent && <EventDetail event={selectedEvent} />;
      case 'subdivisions':
        return <Subdivisions />;
      case 'schedules':
        return (
          <div className="max-w-3xl mx-auto px-4 mt-12 text-center">
            <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-4">📆 Event Schedules</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Coming soon — full schedule of events and timings will be published here!
            </p>
          </div>
        );
      case 'contacts':
        return (
          <div className="max-w-3xl mx-auto px-4 mt-12 text-center">
            <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-4">📞 Contact Information</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              For questions, reach out to your subdivision SPOC or email us at{' '}
              <a href="mailto:support@dawsoncommunitysports.online" className="underline text-blue-700 dark:text-blue-300">
                support@dawsoncommunitysports.online
              </a>.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="font-sans text-gray-900 dark:text-gray-100 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <nav className="bg-blue-900 dark:bg-gray-900 text-white flex items-center justify-between px-4 py-4 shadow-md">
          <div className="flex gap-6 sm:gap-8 flex-wrap">
            <button onClick={() => setActiveTab('home')} className={`hover:underline ${activeTab === 'home' ? 'font-bold' : ''}`}>Home</button>
            <button onClick={() => setActiveTab('schedules')} className={`hover:underline ${activeTab === 'schedules' ? 'font-bold' : ''}`}>Schedules</button>
            <button onClick={() => setActiveTab('contacts')} className={`hover:underline ${activeTab === 'contacts' ? 'font-bold' : ''}`}>Contacts</button>
            <button onClick={() => setActiveTab('subdivisions')} className={`hover:underline ${activeTab === 'subdivisions' ? 'font-bold' : ''}`}>Subdivisions</button>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-yellow-400 text-blue-900 dark:text-gray-900 text-sm font-semibold px-4 py-1 rounded-full shadow-md">
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

        <footer className="bg-gray-100 dark:bg-gray-800 mt-16 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
          &copy; 2025 Dawson Community Sports. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default App;
