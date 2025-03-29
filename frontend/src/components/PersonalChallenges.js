import React, { useState, useEffect } from 'react';
import "./css/PersonalChallenges.css";
import { ReactComponent as CheckIcon } from '../assets/otherAssets/checkmark.svg'; // assuming you put the svg here

const PersonalChallenges = () => {
  // Placeholder: in the future, fetch from backend
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    // Simulate fetching from backend
    const fetchChallenges = async () => {
      const fetched = [
        "Walk to school today",
        "Setup a recycling bin in office",
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
    <div className="personal-container">
      <h2 className="personal-title">Personal Challenges</h2>
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

export default PersonalChallenges;
