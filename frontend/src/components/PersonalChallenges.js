import React from 'react';

const PersonalChallenges = () => {
  const personal = [
    "Walk to school today",
    "Setup a recycling bin in office",
  ];

  return (
    <div className="bg-green-100 p-4 rounded-lg shadow w-full ml-4">
      <h2 className="text-lg font-semibold mb-2 text-center">Personal Challenges</h2>
      <ul className="space-y-2">
        {personal.map((item, idx) => (
          <li key={idx} className="flex justify-between items-center bg-white p-2 rounded shadow">
            <span>{item}</span>
            <span className="text-green-600 font-bold">✔</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-center">
        <button className="text-xl text-gray-500 hover:text-black">＋</button>
      </div>
    </div>
  );
};

export default PersonalChallenges;