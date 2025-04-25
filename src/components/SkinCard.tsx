
import React from 'react';
import { cn } from "@/lib/utils";

type RarityType = 'common' | 'uncommon' | 'rare' | 'mythical' | 'legendary' | 'ancient';

interface SkinCardProps {
  name: string;
  image: string;
  price: number;
  rarity: RarityType;
  wear?: string;
  className?: string;
}

const rarityColors: Record<RarityType, string> = {
  common: 'border-gray-400 bg-gray-400/10',
  uncommon: 'border-blue-400 bg-blue-400/10',
  rare: 'border-purple-400 bg-purple-400/10',
  mythical: 'border-pink-400 bg-pink-400/10',
  legendary: 'border-red-400 bg-red-400/10',
  ancient: 'border-yellow-400 bg-yellow-400/10',
};

const rarityGlows: Record<RarityType, string> = {
  common: '',
  uncommon: 'shadow-sm shadow-blue-400/20',
  rare: 'shadow-sm shadow-purple-400/20',
  mythical: 'shadow-md shadow-pink-400/30',
  legendary: 'shadow-md shadow-red-400/40',
  ancient: 'shadow-lg shadow-yellow-400/50',
};

export function SkinCard({ 
  name, 
  image, 
  price, 
  rarity, 
  wear = 'Factory New', 
  className 
}: SkinCardProps) {
  return (
    <div className={cn(
      'relative overflow-hidden rounded-lg border-2 transition-all duration-300 hover:scale-105',
      rarityColors[rarity],
      rarityGlows[rarity],
      className
    )}>
      <div className="p-3 bg-[#1A1F2C]/80 h-full flex flex-col">
        <div className="relative aspect-square rounded overflow-hidden mb-2">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="text-sm font-medium text-white truncate">{name}</h3>
          <p className="text-xs text-gray-400">{wear}</p>
        </div>
        
        <div className="mt-2 flex justify-between items-center">
          <span className="text-sm font-bold text-white">${price.toFixed(2)}</span>
          <span className={cn(
            'text-xs px-2 py-0.5 rounded',
            rarity === 'common' ? 'bg-gray-600 text-gray-200' :
            rarity === 'uncommon' ? 'bg-blue-600 text-blue-100' :
            rarity === 'rare' ? 'bg-purple-600 text-purple-100' :
            rarity === 'mythical' ? 'bg-pink-600 text-pink-100' :
            rarity === 'legendary' ? 'bg-red-600 text-red-100' :
            'bg-yellow-600 text-yellow-100'
          )}>
            {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
