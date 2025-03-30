import React, { useEffect, useState } from 'react';
import './css/Garden.css';
import { EcoQuestBackgroundImageDefault, TigerAvatar } from '../assets/gardenAssets/gardenIndex';

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const Garden = () => {
  const [treeInventory, setTreeInventory] = useState([]);
  const [tigerX, setTigerX] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const awsBaseUrl = "https://ecoquest-storageofimages-3292025-princeton.s3.us-east-2.amazonaws.com";

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        
        const userId = localStorage.getItem('userID');
        const userRes = await fetch(`http://localhost:3000/api/users/${userId}`);
        const userData = await userRes.json();

        const inventory = userData.inventory || [];
        console.log("📦 Raw user inventory:", inventory);

        const inventoryWithDetails = await Promise.all(
          inventory.map(async (entry) => {
            const itemRes = await fetch(`http://localhost:3000/api/items/${entry.item}`);
            const itemData = await itemRes.json();
            console.log("🧩 itemData for", entry.item, ":", itemData);

            return {
              type: itemData.name?.toLowerCase().replace(/\s+/g, ''),
              quantity: entry.quantity,
              imageUrl: itemData.imageUrl,
            };
          })
        );

        console.log("🌲 treeInventory (with item details):", inventoryWithDetails);
        setTreeInventory(inventoryWithDetails);
        setIsLoading(false);
      } catch (err) {
        console.error('❌ Error fetching inventory:', err);
        setError('Failed to load your garden.');
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setTigerX((prev) => Math.min(prev + 2, 90));
      } else if (e.key === 'ArrowLeft') {
        setTigerX((prev) => Math.max(prev - 2, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (isLoading) return <div>Loading garden...</div>;
  if (error) return <div>{error}</div>;

  // Build tree array from full inventory (with safety guard and logging)
  let treeArray = [];
  let id = 0;

  treeInventory.forEach(({ type, quantity, imageUrl }) => {
    const qty = Number(quantity);
    if (!imageUrl || isNaN(qty) || qty <= 0) {
      console.warn("⚠️ Skipping invalid tree entry:", { type, quantity, imageUrl });
      return;
    }

    for (let i = 0; i < qty; i++) {
      treeArray.push({
        id: ++id,
        type,
        imageUrl,
      });
    }
  });

  treeArray = shuffleArray(treeArray);

  console.log("🧮 Final treeArray to render:", treeArray.length, treeArray);

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
        src={`${awsBaseUrl}${tree.imageUrl}`}
        alt={`${tree.type} tree`}
        className="tree"
        style={{
          left: `${col * spacing + offset}%`,
          height: `${baseHeight * heightScale}vh`,
          bottom: '0',
          zIndex: row + 1,
          transform: `translateY(${row * 4}px)`,
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
          style={{ left: `${tigerX}%` }}
        />

        <div className="tree-layer">
          {trees.length === 0 ? (
            <div className="empty-garden-message">Your garden is waiting to grow 🌱</div>
          ) : (
            trees
          )}
        </div>
      </div>
    </div>
  );
};

export default Garden;
