import React from 'react';
import Navbar from '../components/Navbar';
import Garden from '../components/Garden';
import WeeklyChallenges from '../components/WeeklyChallenges';
import PersonalChallenges from '../components/PersonalChallenges';
import Shop from '../components/Shop';

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />

      <main style={{ padding: '1rem' }}>
        {/* Garden Section */}
        <section>
          <Garden />
        </section>

        {/* Challenges Section */}
        <section style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <WeeklyChallenges />
          <PersonalChallenges />
        </section>

        {/* Shop Section */}
        <section style={{ marginTop: '2rem' }}>
          <Shop />
        </section>
      </main>
    </div>
  );
};

export default Home;
