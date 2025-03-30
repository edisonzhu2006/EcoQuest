import React, { useState, useEffect } from 'react';
import "./css/WeeklyChallenges.css";
import { ReactComponent as CheckIcon } from '../assets/otherAssets/checkmark.svg';

const WeeklyChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState(() => {
    const stored = localStorage.getItem("completedWeeklyChallenges");
    return stored ? JSON.parse(stored) : [];
  });

  const userId = localStorage.getItem("userID");

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/weeklytasks");
        const data = await response.json();
        setChallenges(data);
      } catch (error) {
        console.error("Error fetching weekly challenges:", error);
      }
    };

    fetchChallenges();
  }, []);

  const handleComplete = async (challenge) => {
    if (completedChallenges.includes(challenge._id)) return;

    let coinsToAdd = 0;
    if (challenge.type === "easy") coinsToAdd = 5;
    else if (challenge.type === "medium") coinsToAdd = 10;
    else if (challenge.type === "hard") coinsToAdd = 15;

    try {
      await fetch(`http://localhost:3000/api/users/${userId}/wallet`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coins: coinsToAdd }),
      });

      const updatedCompleted = [...completedChallenges, challenge._id];
      setCompletedChallenges(updatedCompleted);
      localStorage.setItem("completedWeeklyChallenges", JSON.stringify(updatedCompleted));

      window.location.reload();
    } catch (error) {
      console.error("Failed to update wallet:", error);
    }
  };

  return (
    <div className="weekly-container">
      <h2 className="weekly-title">Weekly Challenges</h2>
      <hr className="divider" />
      <div className="challenges-list">
        {challenges.map((challenge) => (
          <div
            className={`challenge-box ${completedChallenges.includes(challenge._id) ? 'completed' : ''}`}
            key={challenge._id}
          >
            <span className="challenge-text">
              {completedChallenges.includes(challenge._id) ? <s>{challenge.title}</s> : challenge.title}
            </span>
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