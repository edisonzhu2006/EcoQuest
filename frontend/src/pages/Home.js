import React from 'react';
import Navbar from '../components/Navbar';
import Garden from '../components/Garden';
import WeeklyChallenges from '../components/WeeklyChallenges';
import PersonalChallenges from '../components/PersonalChallenges';
import Shop from '../components/Shop';
import './css/Home.css'; // Make sure to import it

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />

      <main>
        {/* Garden Section */}
        <section className="garden-section">
          <Garden />
        </section>

        {/* Triple Column Layout */}
        <section className="triple-section">
          <WeeklyChallenges />
          <PersonalChallenges />
          <Shop />
        </section>
      </main>
    </div>
  );
};

export default Home;
