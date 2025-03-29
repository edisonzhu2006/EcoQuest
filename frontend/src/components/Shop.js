import React from 'react';

const Shop = () => {
  const items = [
    { name: "Tree", cost: 20 },
    { name: "Plant", cost: 14 },
    { name: "Tree", cost: 20 },
    { name: "Tree", cost: 20 },
    { name: "Tree", cost: 20 },
  ];

  return (
    <div className="bg-green-100 p-4 rounded-lg shadow mt-6">
      <h2 className="text-lg font-semibold mb-4 text-center">Flower Shop</h2>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="bg-white p-3 rounded shadow text-center">
            <div className="h-12 bg-green-200 mb-2 rounded">🌳</div>
            <div>{item.name}</div>
            <div className="text-yellow-600 font-bold">{item.cost} 🥕</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
