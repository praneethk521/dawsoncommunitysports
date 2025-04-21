// src/components/Leaderboard.tsx
import React from 'react';

interface LeaderboardEntry {
  id: string;
  name: string;
  steps: number;
  distance: number;
}

interface ChallengeData {
  challenge_id: string;
  challenge_name: string;
  leaderboard: LeaderboardEntry[];
}

const Leaderboard = ({ data }: { data: ChallengeData[] }) => (
  <section className="max-w-5xl mx-auto px-4 mt-10 mb-12">
    <h2 className="text-4xl font-bold text-center text-blue-800 dark:text-blue-300 mb-8">
      🏆 Cardio Challenge Leaderboards
    </h2>

    {data.length === 0 ? (
      <p className="text-center text-gray-500 dark:text-gray-300">Loading leaderboard...</p>
    ) : (
      data.map((challenge) => (
        <div key={challenge.challenge_id} className="mb-10">
          <h3 className="text-2xl font-semibold text-left mb-3 text-gray-800 dark:text-white">
            📍 {challenge.challenge_name}
          </h3>
          <div className="overflow-x-auto rounded shadow">
            <table className="w-full border border-gray-300 bg-white dark:bg-gray-700 dark:text-white">
              <thead className="bg-blue-50 dark:bg-gray-600 text-left">
                <tr>
                  <th className="border px-4 py-2">Rank</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Steps</th>
                  <th className="border px-4 py-2">Distance (mi)</th>
                </tr>
              </thead>
              <tbody>
                {challenge.leaderboard.map((user, idx) => (
                  <tr key={user.id} className="hover:bg-blue-50 dark:hover:bg-gray-600">
                    <td className="border px-4 py-2">{idx + 1}</td>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.steps.toLocaleString()}</td>
                    <td className="border px-4 py-2">{user.distance.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))
    )}
  </section>
);

export default Leaderboard;
