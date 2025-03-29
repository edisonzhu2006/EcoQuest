import React from 'react';

const WeeklyChallenges = () => {
  const challenges = [
    "Recycle 6 plastic bottles",
    "Use only public transport all week",
    "Help plant 3 trees",
    "Convince someone to use a reusable water bottle",
  ];

  return (
    <div className="bg-green-100 p-4 rounded-lg shadow w-full mr-4">
      <h2 className="text-lg font-semibold mb-2 text-center">Weekly Challenges</h2>
      <ul className="space-y-2">
        {challenges.map((item, idx) => (
          <li key={idx} className="flex justify-between items-center bg-white p-2 rounded shadow">
            <span>{item}</span>
            <span className="text-green-600 font-bold">✔</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeeklyChallenges;