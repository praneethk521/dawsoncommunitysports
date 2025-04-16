// Updated Dawson Community Sports 2025 React App
// This version includes: Homepage, Timeline, Events Section, Contact, Tailwind Styling

import React from 'react';
import './index.css';

const App = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <header className="bg-blue-800 text-white text-center py-6 shadow-md">
        <h1 className="text-4xl font-bold">Dawson Community Sports 2025</h1>
        <p className="mt-2 text-lg">Subdivision Showdown – Community Fitness Challenge 🏆</p>
      </header>

      {/* Welcome Section */}
      <section className="max-w-3xl mx-auto px-4 mt-10 text-center">
        <p className="text-xl">
          Hey Neighbors! Get ready for an exciting, energetic, and engaging Inter-Subdivision Fitness Challenge! Represent your subdivision, compete with spirit, and bring home the glory! 💪🎉
        </p>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto px-4 mt-14">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">📅 Key Dates</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-left">
            <thead className="bg-blue-50">
              <tr>
                <th className="border px-4 py-2">Event</th>
                <th className="border px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Registration Deadline</td>
                <td className="border px-4 py-2">April 18, 2025</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Steps/Miles Logging Window</td>
                <td className="border px-4 py-2">April 21 – May 16</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">In-Person Finals</td>
                <td className="border px-4 py-2">May 17, 2025</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Winner Announcements</td>
                <td className="border px-4 py-2">May 17, 2025 Evening</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Events Overview */}
      <section className="max-w-4xl mx-auto px-4 mt-16">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">🏅 Featured Competitions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <EventCard title="Pushup Challenge" category="Men" type="In-Person" date="May 17" />
          <EventCard title="Pickleball Challenge" category="Men" type="In-Person" date="May 17" />
          <EventCard title="Carroms Challenge" category="Women" type="In-Person" date="May 17" />
          <EventCard title="Plank Challenge" category="Women" type="In-Person" date="May 17" />
          <EventCard title="Walk/Jog Challenge" category="Open" type="Offline" date="April 21 – May 16" />
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-3xl mx-auto px-4 mt-20 text-center">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">📬 Contact Us</h2>
        <p>Email us at: <a href="mailto:ddmsports25@gmail.com" className="text-blue-600 underline">ddmsports25@gmail.com</a></p>
        <p className="mt-2">Event Date: <strong>May 17, 2025</strong></p>
        <p>Location: <em>To Be Decided</em></p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 mt-16 py-4 text-center text-sm text-gray-500">
        &copy; 2025 Dawson Community Sports. All rights reserved.
      </footer>
    </div>
  );
};

const EventCard = ({ title, category, type, date }: { title: string; category: string; type: string; date: string }) => (
  <div className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition">
    <h3 className="text-xl font-bold text-blue-700 mb-1">{title}</h3>
    <p className="text-sm text-gray-600">Category: {category}</p>
    <p className="text-sm text-gray-600">Type: {type}</p>
    <p className="text-sm text-gray-600">Date: {date}</p>
  </div>
);

export default App;
