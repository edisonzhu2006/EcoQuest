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
        <section style={{ marginBottom: '2rem' }}>
          <Garden />
        </section>

        {/* Triple Column Layout */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '1.5rem',
            alignItems: 'flex-start',
          }}
        >
          <WeeklyChallenges />
          <PersonalChallenges />
          <Shop />
        </section>
      </main>
    </div>
  );
};

export default Home;
