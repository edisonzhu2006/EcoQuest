import React, { useState, useEffect } from 'react';
import "./css/PersonalChallenges.css";
import { ReactComponent as CheckIcon } from '../assets/otherAssets/checkmark.svg';
import { ReactComponent as AddIcon } from '../assets/otherAssets/addicon.svg';

const PersonalChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newChallenge, setNewChallenge] = useState('');
  const [difficulty, setDifficulty] = useState('easy');

  const userId = localStorage.getItem("userID");

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch(`https://ecoquest-n5ub.onrender.com/api/users/${userId}`);
        const data = await response.json();
        if (Array.isArray(data.dailytasks)) {
          setChallenges(data.dailytasks);
        } else {
          console.error("Invalid dailytasks format", data);
        }
      } catch (error) {
        console.error("Error fetching daily challenges:", error);
      }
    };

    fetchChallenges();
  }, [userId]);

  const handleComplete = async (challenge) => {
    let coinsToAdd = 0;
    if (challenge.type === "easy") coinsToAdd = 5;
    else if (challenge.type === "medium") coinsToAdd = 10;
    else if (challenge.type === "hard") coinsToAdd = 15;

    try {
      await fetch(`https://ecoquest-n5ub.onrender.com/api/users/${userId}/wallet`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coins: coinsToAdd }),
      });

      await fetch(`https://ecoquest-n5ub.onrender.com/api/users/${userId}/tasks/${challenge._id}`, {
        method: "DELETE",
      });

      window.location.reload();
    } catch (error) {
      console.error("Failed to complete and delete task:", error);
    }
  };

  const handleCreateChallenge = async () => {
    try {
      const res = await fetch(`https://ecoquest-n5ub.onrender.com/api/users/${userId}/dailytasks`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newChallenge, type: difficulty, completed: false })
      });
      if (res.ok) {
        setShowPopup(false);
        setNewChallenge('');
        setDifficulty('easy');
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating challenge:", error);
    }
  };

  return (
    <div className="personal-container">
      <h2 className="personal-title">Personal Challenges</h2>
      <hr className="divider" />
      <div className="personal-grid">
        {challenges.map((challenge) => (
          <div className="challenge-box-p" key={challenge._id}>
            <span className="challenge-text-p">{challenge.title}</span>
            <button className="checkmark-p" onClick={() => handleComplete(challenge)}>
              <CheckIcon className="check-icon" />
            </button>
          </div>
        ))}
      </div>
      <div className="add-button-wrapper">
        <button className="add-button" onClick={() => setShowPopup(true)}>
          <AddIcon className="add-icon" />
        </button>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3 className="popup-title">Create New Challenge</h3>
            <input
              className="popup-input"
              type="text"
              placeholder="Challenge title"
              value={newChallenge}
              onChange={(e) => setNewChallenge(e.target.value)}
            />
            <select
              className="popup-select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <div className="popup-buttons">
              <button className="popup-create" onClick={handleCreateChallenge}>Create Challenge</button>
              <button className="popup-cancel" onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalChallenges;