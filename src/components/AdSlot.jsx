import React from 'react';

export default function AdSlot({ position = 'top' }) {
  return (
    <div className="ad-slot" data-position={position}>
    </div>
  );
}