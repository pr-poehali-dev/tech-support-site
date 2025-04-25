
import React from 'react';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SkinCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'mythical' | 'legendary' | 'ancient';
  wear?: string;
  className?: string;
  onClick?: (id: string) => void;
}

const rarityClasses = {
  common: 'border-gray-400 bg-gradient-to-b from-gray-700/50 to-gray-800/50',
  uncommon: 'border-blue-400 bg-gradient-to-b from-blue-700/50 to-blue-800/50',
  rare: 'border-purple-400 bg-gradient-to-b from-purple-700/50 to-purple-800/50',
  mythical: 'border-pink-400 bg-gradient-to-b from-pink-700/50 to-pink-800/50',
  legendary: 'border-red-400 bg-gradient-to-b from-red-600/50 to-red-700/50',
  ancient: 'border-yellow-400 bg-gradient-to-b from-yellow-600/50 to-yellow-700/50',
};

export function SkinCard({ 
  id, 
  name, 
  image, 
  price, 
  rarity,
  wear,
  className,
  onClick
}: SkinCardProps) {
  // Format price to Russian ruble
  const formattedPrice = new Intl.NumberFormat('ru-RU', { 
    style: 'currency', 
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(price);
  
  return (
    <Card 
      className={cn(
        'group relative overflow-hidden transition-all duration-200 border-2',
        rarityClasses[rarity],
        onClick ? 'cursor-pointer hover:scale-105' : '',
        className
      )}
      onClick={() => onClick && onClick(id)}
    >
      <div className="p-2 h-full flex flex-col">
        <div className="flex-1 bg-black/30 rounded-sm flex items-center justify-center p-2">
          <img 
            src={image} 
            alt={name} 
            className="max-h-24 max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        
        <div className="mt-2 text-center">
          <p className="text-xs truncate text-white">
            {name}
            {wear && <span className="text-gray-400 ml-1">({wear})</span>}
          </p>
          <p className="text-sm font-bold text-white">{formattedPrice}</p>
        </div>
      </div>
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out pointer-events-none"></div>
    </Card>
  );
}
