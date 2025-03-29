import React, { useState, useEffect } from 'react';
import "./css/PersonalChallenges.css";
import { ReactComponent as CheckIcon } from '../assets/otherAssets/checkmark.svg'; 
import { ReactComponent as AddIcon } from '../assets/otherAssets/addicon.svg'; 

const PersonalChallenges = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      const fetched = [
        "Walk to school today",
        "Setup a recycling bin in office",
        "try new things",
        "asdasdasdasd",
        "try new things",
        "asdasdasdasd",
        "try new things",
        "asdasdasdasd",
        "try new things",
        "asdasdasdasd",
        "try new things",
        "asdasdasdasd",
        "try new things",
        "asdasdasdasd",
        "try new things",
        "asdasdasdasd"
      ];
      setChallenges(fetched);
    };

    fetchChallenges();
  }, []);

  const handleComplete = (challenge) => {
    console.log(`Completed: ${challenge}`);
  };

  const addPersonalChallenge = () => {
    console.log("Add personal challenge clicked");
  };

  return (
    <div className="personal-container">
      <h2 className="personal-title">Personal Challenges</h2>
      <hr className="divider" />
      <div className="personal-grid">
        {challenges.map((challenge, index) => (
          <div className="challenge-box" key={index}>
            <span className="challenge-text">{challenge}</span>
            <button className="checkmark" onClick={() => handleComplete(challenge)}>
              <CheckIcon className="check-icon" />
            </button>
          </div>
        ))}
      </div>
      <div className="add-button-wrapper">
        <button className="add-button" onClick={addPersonalChallenge}>
          <AddIcon className="add-icon" />
        </button>
      </div>
    </div>
  );
};

export default PersonalChallenges;
