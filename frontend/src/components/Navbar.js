import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-green-200 p-4 flex justify-between items-center shadow">
      <div className="text-lg font-bold">EcoQuest</div>
      <ul className="flex space-x-4">
        <li className="hover:underline cursor-pointer">Home</li>
        <li className="hover:underline cursor-pointer">Shop</li>
        <li className="hover:underline cursor-pointer">Challenges</li>
      </ul>
      <div className="text-yellow-600 font-bold">128 🥕</div>
    </nav>
  );
};

export default Navbar;