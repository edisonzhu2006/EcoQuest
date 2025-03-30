import React, { useState, useEffect } from 'react';
import "./css/WeeklyChallenges.css";
import { ReactComponent as CheckIcon } from '../assets/otherAssets/checkmark.svg';

const WeeklyChallenges = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/weeklytasks");
        const data = await response.json();
        setChallenges(data); // Keep full object in case we need _id later
      } catch (error) {
        console.error("Error fetching weekly challenges:", error);
      }
    };

    fetchChallenges();
  }, []);

  const handleComplete = (challenge) => {
    console.log(`Completed: ${challenge.title}`);
    // Optional future: PUT to /api/weeklytasks/:id to mark complete
  };

  return (
    <div className="weekly-container">
      <h2 className="weekly-title">Weekly Challenges</h2>
      <hr className="divider" />
      <div className="challenges-list">
        {challenges.map((challenge) => (
          <div className="challenge-box" key={challenge._id}>
            <span className="challenge-text">{challenge.title}</span>
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
