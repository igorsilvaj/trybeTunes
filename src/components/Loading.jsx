import React from 'react';
import loading from '../assets/spinner.png';

export default function Loading() {
  return (
    <div
      className="
      flex flex-col justify-center items-center gap-10
      h-screen w-screen font-bold absolute
      bg-loading bg-no-repeat bg-cover bg-center
      sm:text-xl sm:text-[#ffffff]
      md:text-3xl md:text-[#003BE5]
      z-50"
    >
      <img className="animate-spin" src={ loading } alt="loading spinner" />
      Carregando...
    </div>
  );
}
