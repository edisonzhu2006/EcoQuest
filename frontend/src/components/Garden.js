import React from 'react';
import './css/Garden.css';
import {
  EcoQuestBackgroundImageDefault,
  TigerAvatar,
  OakTree
} from '../assets/gardenAssets/gardenIndex';

const treeCount = 23; // ← Change this to test more or fewer trees

const Garden = () => {
  const trees = [];

  for (let i = 0; i < treeCount; i++) {
    const row = Math.floor(i / 10);        // row index (0 = front)
    const col = i % 10;                    // position in row (0–9)
    const offset = (row % 2 === 0) ? 0 : 3; // alternate row offset

    trees.push(
      <img
        key={i}
        src={OakTree}
        alt={`Tree ${i}`}
        className="tree"
        style={{
          bottom: `${row * 8 + 5}vh`,            // stack each row slightly higher
          left: `${col * 6 + offset}%`,          // offset alternate rows
          zIndex: row + 1                        // ensure upper rows sit above
        }}
      />
    );
  }

  return (
    <div className="garden-container">
      <div className="image-wrapper">
        <div
          className="responsive-background"
          style={{
            backgroundImage: `url(${EcoQuestBackgroundImageDefault})`,
          }}
        ></div>

        <img
          src={TigerAvatar}
          alt="My Avatar"
          className="avatar-inside-garden"
        />

        <div className="tree-layer">
          {trees}
        </div>
      </div>
    </div>
  );
};

export default Garden;
