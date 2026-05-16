import React from 'react';
import { Coffee } from 'lucide-react';

const KOFI_URL = 'https://ko-fi.com/cosmosdev';

export default function FloatingCoffeeButton() {
  return (
    <a
      href={KOFI_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="Support Cosmos Dev ☕"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-[#FF5E5B] rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
        <button
          className="relative flex items-center justify-center w-14 h-14 bg-[#FF5E5B] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce-on-hover"
        >
          <Coffee size={24} className="text-white" />
        </button>
      </div>
    </a>
  );
}