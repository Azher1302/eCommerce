import React from 'react';
import MainModal from './MainModal';

const WalletsModal = ({ modalOpen, setModalOpen }) => {
  const Wallets = [
    {
      name: 'Meta mask',
      img: '/wallet/meta.svg',
    },
    {
      name: 'Trust',
      img: '/wallet/trust.svg',
    },
    {
      name: 'Binance',
      img: '/wallet/bina.svg',
    },
    {
      name: 'Safe',
      img: '/wallet/safe.svg',
    },
  ];

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block w-full max-w-lg py-10 px-5 sm:p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
        <h2 className="text-2xl font-bold">Choose a wallet</h2>
        <div className="grid gap-4 mt-4">
          {Wallets.map((w, i) => (
            <button
              key={i}
              className="py-5 px-12 gap-5 flex flex-row items-center rounded bg-white w-full hover:border-main border-deepGray border"
            >
              <img
                alt={w.name}
                src={`/images/${w.img}`}
                className="w-8 h-8 object-contain"
              />
              <p>{w.name}</p>
            </button>
          ))}
        </div>
      </div>
    </MainModal>
  );
};

export default React.memo(WalletsModal);
