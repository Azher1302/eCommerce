import React from 'react';

function Head({ title }) {
  return (
    <div className="w-full bg-deepGray lg:h-64 h-40 relative overflow-hidden rounded-md">
      <img
        alt="headImage"
        src="/images/head.png"
        className="w-full h-full object-cover"
      />
      <div className="flex-colo w-full absolute lg:top-24 top-16">
        <h1 className="lg:text-h1 text-2xl font-bold text-main">
          {title && title}
        </h1>
      </div>
    </div>
  );
}

export default Head;
