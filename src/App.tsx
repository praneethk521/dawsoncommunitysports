// Updated Dawson Community Sports 2025 React App with Dark Mode Toggle and Event Detail Pages

import React, { useEffect, useState } from 'react';
import './index.css';
import logo from '../public/logo.png';

const App = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'leaderboard' | 'eventDetail'>('home');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="font-sans text-gray-800 dark:text-gray-100 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <nav className="bg-blue-900 dark:bg-gray-900 text-white flex justify-center gap-8 py-4 shadow-md">
          <button onClick={() => setActiveTab('home')} className={`hover:underline ${activeTab === 'home' ? 'font-bold' : ''}`}>Home</button>
          <button onClick={() => setActiveTab('leaderboard')} className={`hover:underline ${activeTab === 'leaderboard' ? 'font-bold' : ''}`}>Cardio Challenge Leaderboard</button>
          <button onClick={() => setDarkMode(!darkMode)} className="ml-auto mr-4 bg-blue-700 dark:bg-gray-700 px-3 py-1 rounded">{darkMode ? '☀️ Light' : '🌙 Dark'}</button>
        </nav>

        {activeTab === 'home' && <HomeContent setActiveTab={setActiveTab} setSelectedEvent={setSelectedEvent} />}
        {activeTab === 'leaderboard' && <Leaderboard data={leaderboardData} />}
        {activeTab === 'eventDetail' && selectedEvent && <EventDetail event={selectedEvent} />}

        <footer className="bg-gray-100 dark:bg-gray-800 mt-16 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; 2025 Dawson Community Sports. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

const HomeContent = ({ setActiveTab, setSelectedEvent }: any) => {
  const handleCardClick = (event: any) => {
    setSelectedEvent(event);
    setActiveTab('eventDetail');
  };

  const events = [
    { title: "Pushup Challenge", category: "Men", type: "In-Person", date: "May 17", description: "Team pushup showdown between subdivisions." },
    { title: "Pickleball Challenge", category: "Men", type: "In-Person", date: "May 17", description: "Singles or doubles matches for subdivision pride." },
    { title: "Carroms Challenge", category: "Women", type: "In-Person", date: "May 17", description: "Indoor carroms face-off to crown champions." },
    { title: "Plank Challenge", category: "Women", type: "In-Person", date: "May 17", description: "Endurance showdown – who holds the plank longest?" },
    { title: "Walk/Jog Challenge", category: "Open", type: "Offline", date: "April 21 – May 16", description: "Track your mileage over four weeks for glory!" }
  ];

  return (
    <>
      <header className="bg-blue-800 dark:bg-gray-800 text-white text-center py-6 shadow-lg">
        <img src="/logo.png" alt="Dawson Logo" className="mx-auto w-48 mb-4 drop-shadow-md" />
        <h1 className="text-4xl font-bold tracking-wide">Dawson Community Sports 2025</h1>
        <p className="mt-2 text-lg">Subdivision Showdown – Community Fitness Challenge 🏆</p>
      </header>

      <section className="max-w-3xl mx-auto px-4 mt-10 text-center">
        <p className="text-xl">
          Hey Neighbors! Get ready for an exciting, energetic, and engaging Inter-Subdivision Fitness Challenge! Represent your subdivision, compete with spirit, and bring home the glory! 💪🎉
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 mt-14">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-300">📅 Key Dates</h2>
        <table className="w-full border border-gray-300 text-left bg-white dark:bg-gray-700 dark:text-white shadow-sm">
          <thead className="bg-blue-50 dark:bg-gray-600">
            <tr><th className="border px-4 py-2">Event</th><th className="border px-4 py-2">Date</th></tr>
          </thead>
          <tbody>
            <tr><td className="border px-4 py-2">Registration Deadline</td><td className="border px-4 py-2">April 18, 2025</td></tr>
            <tr><td className="border px-4 py-2">Steps/Miles Logging Window</td><td className="border px-4 py-2">April 21 – May 16</td></tr>
            <tr><td className="border px-4 py-2">In-Person Finals</td><td className="border px-4 py-2">May 17, 2025</td></tr>
            <tr><td className="border px-4 py-2">Winner Announcements</td><td className="border px-4 py-2">May 17, 2025 Evening</td></tr>
          </tbody>
        </table>
      </section>

      <section className="max-w-4xl mx-auto px-4 mt-16">
        <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-300 mb-4">🏅 Featured Competitions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((e, i) => <EventCard key={i} {...e} onClick={() => handleCardClick(e)} />)}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 mt-20 text-center">
        <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2">📬 Contact Us</h2>
        <p>Email us at: <a href="mailto:ddmsports25@gmail.com" className="text-blue-600 dark:text-blue-400 underline">ddmsports25@gmail.com</a></p>
        <p className="mt-2">Event Date: <strong>May 17, 2025</strong></p>
        <p>Location: <em>To Be Decided</em></p>
      </section>
    </>
  );
};

const EventCard = ({ title, category, type, date, onClick }: any) => (
  <div onClick={onClick} className="cursor-pointer border rounded-lg p-4 shadow-md bg-white dark:bg-gray-700 dark:text-white hover:shadow-lg transition-all duration-300">
    <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-1">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-300">Category: {category}</p>
    <p className="text-sm text-gray-600 dark:text-gray-300">Type: {type}</p>
    <p className="text-sm text-gray-600 dark:text-gray-300">Date: {date}</p>
  </div>
);

const EventDetail = ({ event }: any) => (
  <section className="max-w-4xl mx-auto px-4 mt-12 text-center">
    <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-4">{event.title}</h2>
    <p className="text-lg text-gray-700 dark:text-gray-200 mb-2">{event.description}</p>
    <p className="text-md text-gray-500 dark:text-gray-300 mb-4">Category: {event.category} | Type: {event.type} | Date: {event.date}</p>
    <p className="text-md text-gray-600 dark:text-gray-300">More info coming soon, including rules, venue details, and gallery!</p>
  </section>
);

const Leaderboard = ({ data }: { data: any[] }) => (
  <section className="max-w-4xl mx-auto px-4 mt-10">
    <h2 className="text-3xl font-bold text-center text-blue-800 dark:text-blue-300 mb-6">🚶 Cardio Challenge Leaderboard</h2>
    {data.length === 0 ? (
      <p className="text-center text-gray-500 dark:text-gray-300">Loading leaderboard...</p>
    ) : (
      <table className="w-full border border-gray-300 bg-white dark:bg-gray-700 dark:text-white shadow-sm">
        <thead className="bg-blue-50 dark:bg-gray-600">
          <tr><th className="border px-4 py-2">Rank</th><th className="border px-4 py-2">Name</th><th className="border px-4 py-2">Steps</th><th className="border px-4 py-2">Distance (mi)</th></tr>
        </thead>
        <tbody>
          {data.map((user, idx) => (
            <tr key={user.id} className="hover:bg-blue-50 dark:hover:bg-gray-600">
              <td className="border px-4 py-2">{idx + 1}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.steps}</td>
              <td className="border px-4 py-2">{user.distance.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </section>
);

export default App;
