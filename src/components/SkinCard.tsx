
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Skin } from "@/types/cases";

interface SkinCardProps extends Skin {
  onClick?: () => void;
  className?: string;
}

export function SkinCard({ 
  id, 
  name, 
  image, 
  price, 
  rarity,
  condition,
  onClick,
  className
}: SkinCardProps) {
  // Определяем класс для фона в зависимости от редкости
  const rarityClasses = {
    'common': 'bg-gradient-to-b from-gray-700 to-gray-800 border-gray-600',
    'uncommon': 'bg-gradient-to-b from-blue-700 to-blue-800 border-blue-600',
    'rare': 'bg-gradient-to-b from-purple-700 to-purple-800 border-purple-600',
    'mythical': 'bg-gradient-to-b from-pink-700 to-pink-800 border-pink-600',
    'legendary': 'bg-gradient-to-b from-[#D4AF37] to-[#AA8C2C] border-yellow-600',
    'ancient': 'bg-gradient-to-b from-red-700 to-red-800 border-red-600'
  };
  
  // Форматирование цены
  const formattedPrice = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(price);

  return (
    <Card 
      className={cn(
        "w-full cursor-pointer transition-all duration-200 border-2 overflow-hidden",
        rarityClasses[rarity as keyof typeof rarityClasses],
        "hover:scale-[1.03] hover:shadow-lg hover:shadow-black/30",
        onClick && "hover:shadow-md",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-2">
        <div className="aspect-square rounded bg-black/20 flex items-center justify-center mb-2 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-auto object-contain transform transition-transform hover:scale-110 duration-300"
          />
        </div>
        
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-white truncate" title={name}>
            {name}
          </h3>
          
          {condition && (
            <p className="text-xs text-gray-300 truncate">
              {condition}
            </p>
          )}
          
          <p className="text-sm font-bold text-white">
            {formattedPrice}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
