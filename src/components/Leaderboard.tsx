import React from 'react';

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

export default Leaderboard;
