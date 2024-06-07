import React from 'react';
import { Link } from 'react-router-dom';
import './Promos.css'; // Import the CSS file for additional styling

function Promos() {
  const Prom = [
    {
      bg: 'bg-blue-400',
      title: 'Express Delivery',
      img: 'promo1',
      text: 'text-blue-400',
    },
    {
      bg: 'bg-main',
      title: 'Cash On Delivery',
      img: 'promo2',
      text: 'text-main',
    },
    {
      bg: 'bg-purple-600',
      title: 'Ocean Of Gifts',
      img: 'promo3',
      text: 'text-purple-600',
    },
  ];

  return (
    <div className="promos-container xl:grid hidden grid-cols-3 gap-10 my-20">
      {Prom.map((p, i) => (
        <div
          key={i + 1}
          className={`${p.bg} promo-card hover:-translate-y-4 rounded-xl grid grid-cols-2 gap-2`}
        >
          <div className="promo-text-container text-white py-10 pl-10 pr-2">
            <h2 className="promo-title font-bold">{p.title}</h2>
            <p className="promo-description">With selected items</p>
            <Link to="/shop" className={`promo-button bg-white ${p.text}`}>
              SAVE NOW
            </Link>
          </div>
          <div className="promo-image-container w-full h-48">
            <img
              alt={p.title}
              src={`images/${p.img}.png`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Promos;
