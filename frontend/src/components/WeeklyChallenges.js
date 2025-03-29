import React, { useState, useEffect } from 'react';
import "./css/WeeklyChallenges.css";
import { ReactComponent as CheckIcon } from '../assets/otherAssets/checkmark.svg'; // assuming you put the svg here

const WeeklyChallenges = () => {
  // Placeholder: in the future, fetch from backend
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    // Simulate fetching from backend
    const fetchChallenges = async () => {
      const fetched = [
        "Recycle 6 plastic bottles",
        "Use only public transport all week",
        "Help plant 3 trees",
        "Convince someone to use a reusable water bottle",
        "Convince someone to use a reusable water bottle",
      ];
      setChallenges(fetched);
    };

    fetchChallenges();
  }, []);

  const handleComplete = (challenge) => {
    // Placeholder: this will call the backend function in the future
    console.log(`Completed: ${challenge}`);
    // completed(challenge); // <- future implementation
  };

  return (
    <div className="weekly-container">
      <h2 className="weekly-title">Weekly Challenges</h2>
      <hr className="divider" />
      <div className="challenges-list">
        {challenges.map((challenge, index) => (
          <div className="challenge-box" key={index}>
            <span className="challenge-text">{challenge}</span>
            <button className="checkmark" onClick={() => handleComplete(challenge)}>
              <CheckIcon className="check-icon" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyChallenges;
