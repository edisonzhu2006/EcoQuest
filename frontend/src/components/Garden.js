import React, { useEffect, useState } from 'react';
import './css/Garden.css';
import {
  EcoQuestBackgroundImageDefault,
  TigerAvatar,
  TigerAvatarRide,
  TigerAvatarJump,
  TigerAvatarRideLeft,
  TigerAvatarJumpLeft,
} from '../assets/gardenAssets/gardenIndex';

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
  const [isWalking, setIsWalking] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [jumpY, setJumpY] = useState(0);
  const [direction, setDirection] = useState('right'); // 👈 NEW
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const awsBaseUrl = "https://ecoquest-storageofimages-3292025-princeton.s3.us-east-2.amazonaws.com";

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const userId = localStorage.getItem('userID');
        const userRes = await fetch(`https://ecoquest-n5ub.onrender.com/api/users/${userId}`);
        const userData = await userRes.json();

        const inventory = userData.inventory || [];

        const inventoryWithDetails = await Promise.all(
          inventory.map(async (entry) => {
            const itemRes = await fetch(`https://ecoquest-n5ub.onrender.com/api/items/${entry.item}`);
            const itemData = await itemRes.json();

            return {
              type: itemData.name?.toLowerCase().replace(/\s+/g, ''),
              quantity: entry.quantity,
              imageUrl: itemData.imageUrl,
            };
          })
        );

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
    let keysPressed = {};
    let jumpVelocity = 0;
    let gravity = -1.2;
    let isInAir = false;

    const handleKeyDown = (e) => {
      keysPressed[e.key] = true;

      if (e.key === 'ArrowRight') {
        setDirection('right'); // 👈 update direction
        setIsWalking(true);
      }

      if (e.key === 'ArrowLeft') {
        setDirection('left'); // 👈 update direction
        setIsWalking(true);
      }

      if (e.key === 'ArrowUp' && !isInAir) {
        jumpVelocity = 12;
        isInAir = true;
        setIsJumping(true);
      }
    };

    const handleKeyUp = (e) => {
      delete keysPressed[e.key];

      if (!keysPressed['ArrowRight'] && !keysPressed['ArrowLeft']) {
        setIsWalking(false);
      }
    };

    const movementInterval = setInterval(() => {
      // Horizontal movement
      if (keysPressed['ArrowRight']) {
        setTigerX((prev) => Math.min(prev + 1, 90));
      }
      if (keysPressed['ArrowLeft']) {
        setTigerX((prev) => Math.max(prev - 1, 0));
      }

      // Jump physics
      if (isInAir) {
        setJumpY((prevY) => {
          const newY = prevY + jumpVelocity;
          jumpVelocity += gravity;

          if (newY <= 0) {
            isInAir = false;
            setIsJumping(false);
            return 0;
          }

          return newY;
        });
      }
    }, 30);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearInterval(movementInterval);
    };
  }, []);

  if (isLoading) return <div>Loading garden...</div>;
  if (error) return <div>{error}</div>;

  let treeArray = [];
  let id = 0;

  treeInventory.forEach(({ type, quantity, imageUrl }) => {
    const qty = Number(quantity);
    if (!imageUrl || isNaN(qty) || qty <= 0) return;

    for (let i = 0; i < qty; i++) {
      treeArray.push({
        id: ++id,
        type,
        imageUrl,
      });
    }
  });

  treeArray = shuffleArray(treeArray);

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

  // 👇 Determine which tiger image to use based on direction and state
  let tigerImage;
  if (isJumping) {
    tigerImage = direction === 'left' ? TigerAvatarJumpLeft : TigerAvatarJump;
  } else if (isWalking) {
    tigerImage = direction === 'left' ? TigerAvatarRideLeft : TigerAvatarRide;
  } else {
    tigerImage = TigerAvatar;
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
          src={tigerImage}
          alt="My Avatar"
          className="avatar-inside-garden"
          style={{
            left: `${tigerX}%`,
            bottom: `${jumpY}px`,
            transition: 'bottom 0.05s linear',
          }}
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
