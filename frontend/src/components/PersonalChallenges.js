import React, { useState, useEffect } from 'react';
import "./css/PersonalChallenges.css";
import { ReactComponent as CheckIcon } from '../assets/otherAssets/checkmark.svg'; 
import { ReactComponent as AddIcon } from '../assets/otherAssets/addicon.svg'; 

const PersonalChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const userId = "USER_ID_HERE"; // Replace with actual user ID from auth/session

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user/${userId}`);
        const data = await response.json();

        if (Array.isArray(data.personalTasks)) {
          setChallenges(data.personalTasks);
        } else {
          console.error("Invalid personalTasks format", data);
        }
      } catch (error) {
        console.error("Error fetching personal challenges:", error);
      }
    };

    fetchChallenges();
  }, [userId]);

  const handleComplete = (challenge) => {
    console.log(`Completed: ${challenge}`);
    // Optionally: call backend to mark as completed
  };

  const addPersonalChallenge = () => {
    console.log("Add personal challenge clicked");
    // Optionally: open modal to add new task and post to backend
  };

  return (
    <div className="personal-container">
      <h2 className="personal-title">Personal Challenges</h2>
      <hr className="divider" />
      <div className="personal-grid">
        {challenges.map((challenge, index) => (
          <div className="challenge-box-p" key={index}>
            <span className="challenge-text-p">{challenge}</span>
            <button className="checkmark-p" onClick={() => handleComplete(challenge)}>
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
