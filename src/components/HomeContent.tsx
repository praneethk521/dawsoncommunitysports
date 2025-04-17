// src/components/HomeContent.tsx
import React from 'react';
import EventCard from './EventCard';

const events = [
  { title: "Pushup Challenge", category: "Men", type: "In-Person", date: "May 17", description: "Team pushup showdown between subdivisions." },
  { title: "Pickleball Competition", category: "Men", type: "In-Person", date: "May 17", description: "Singles or doubles matches for subdivision pride." },
  { title: "Table Tennis Competition", category: "Men", type: "In-Person", date: "May 17", description: "Smash your way to victory on the ping pong table." },
  { title: "Tennis Competition", category: "Men", type: "In-Person", date: "May 17", description: "Doubles or singles—serve it up for glory." },
  { title: "Cardio/Distance Tracking (Walk)", category: "Men", type: "Offline", date: "April 19 – May 15", description: "Track your walking miles for your team!" },
  { title: "Cardio/Distance Tracking (Jog)", category: "Men", type: "Offline", date: "April 19 – May 15", description: "Compete to see who jogs the farthest!" },
  { title: "Carroms Challenge", category: "Women", type: "In-Person", date: "May 17", description: "Indoor carroms face-off to crown champions." },
  { title: "Plank Challenge", category: "Women", type: "In-Person", date: "May 17", description: "Endurance showdown – who holds the plank longest?" },
  { title: "Badminton Competition", category: "Women", type: "In-Person", date: "May 17", description: "Singles or doubles – badminton court battles!" },
  { title: "Cardio/Distance Tracking (Walk)", category: "Women", type: "Offline", date: "April 19 – May 15", description: "Track your walking miles for your team!" }
];

const HomeContent = ({ setActiveTab, setSelectedEvent }: any) => {
  const handleCardClick = (event: any) => {
    setSelectedEvent(event);
    setActiveTab('eventDetail');
  };

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

      <section className="max-w-3xl mx-auto px-6 mt-12 mb-8 text-center">
  <div className="bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 dark:from-yellow-900 dark:via-yellow-800 dark:to-yellow-900 rounded-xl shadow-md py-6 px-4 sm:px-8">
    <h2 className="text-2xl font-bold text-yellow-900 dark:text-yellow-100 mb-2">📝 Registration Now Open</h2>
    <p className="text-sm sm:text-base text-gray-700 dark:text-yellow-200 mb-4">
      All participants must register by <strong>April 18, 2025</strong> to be eligible to compete in Dawson Community Sports 2025.
    </p>
    <a
      href="https://forms.gle/F8fY4Fo2xgohKJYB9"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-sm sm:text-base font-semibold px-6 py-2 rounded-full transition duration-300"
    >
      Register Here
    </a>
  </div>
</section>
  
      <section className="max-w-4xl mx-auto px-4 mt-14">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-300">📅 Key Dates</h2>
        <table className="w-full border border-gray-300 text-left bg-white dark:bg-gray-700 dark:text-white shadow-sm">
          <thead className="bg-blue-50 dark:bg-gray-600">
            <tr><th className="border px-4 py-2">Event</th><th className="border px-4 py-2">Date</th></tr>
          </thead>
          <tbody>
            <tr><td className="border px-4 py-2">Registration Deadline</td><td className="border px-4 py-2">April 18, 2025</td></tr>
            <tr><td className="border px-4 py-2">Steps/Miles Logging Window</td><td className="border px-4 py-2">April 19 – May 15</td></tr>
            <tr><td className="border px-4 py-2">In-Person Finals</td><td className="border px-4 py-2">May 17, 2025</td></tr>
            <tr><td className="border px-4 py-2">Winner Announcements</td><td className="border px-4 py-2">May 17, 2025 Evening</td></tr>
          </tbody>
        </table>
      </section>

      <section className="max-w-4xl mx-auto px-4 mt-16">
        <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-300 mb-4">🏅 Featured Competitions</h2>
        <p className="text-md text-center text-gray-600 dark:text-gray-300 mb-6">Click any of the challenges below to learn more about the rules, dates, and format.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((e, i) => <EventCard key={i} {...e} onClick={() => handleCardClick(e)} />)}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 mt-20 text-center">
        <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2">📬 Contact Us</h2>
        <p>Email us at: <a href="mailto:tbd@gmail.com" className="text-blue-600 dark:text-blue-400 underline">tbd@gmail.com</a></p>
        <p className="mt-2">Event Date: <strong>May 17, 2025</strong></p>
        <p>Location: <em>To Be Decided</em></p>
      </section>
    </>
  );
};

export default HomeContent;