import React from 'react';
import './css/Garden.css';
import {
  EcoQuestBackgroundImageDefault,
  TigerAvatar,
  OakTree,
  PalmTree,
  PineTree,
} from '../assets/gardenAssets/gardenIndex';

// Inventory: how many of each tree type
const treeInventory = {
  oak: 4,
  palm: 5,
  pine: 6,
};

// Map tree type to image
const treeTypes = {
  oak: OakTree,
  palm: PalmTree,
  pine: PineTree,
};

// Shuffle helper (Fisher-Yates)
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Build full tree array from inventory
let treeArray = [];
let id = 0;

for (const type in treeInventory) {
  const count = treeInventory[type];
  const image = treeTypes[type];

  for (let i = 0; i < count; i++) {
    treeArray.push({
      id: ++id,
      type,
      image,
    });
  }
}

// Shuffle tree positions
treeArray = shuffleArray(treeArray);

const Garden = () => {
  const trees = treeArray.map((tree, i) => {
    const row = Math.floor(i / 10);
    const col = i % 10;
    const offset = row % 2 === 0 ? 0 : 3;
    const spacing = 10;
    const heightScale = 1 - row * 0.12;
    const baseHeight = 26.25;

    return (
      <img
        key={tree.id}
        src={tree.image}
        alt={`${tree.type} tree`}
        className="tree"
        style={{
          left: `${col * spacing + offset}%`,
          height: `${baseHeight * heightScale}vh`,
          bottom: '0',
          zIndex: row + 1,
          transform: `translateY(${row * 4}px)`, // ⬅️ push back rows lower to avoid floating
          filter: `brightness(${1 - row * 0.05})`,
        }}
      />
    );
  });

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

        <div className="tree-layer">{trees}</div>
      </div>
    </div>
  );
};

export default Garden;
