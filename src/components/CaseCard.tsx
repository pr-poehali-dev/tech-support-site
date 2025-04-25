
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CaseCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  bestDrop: string;
  bestDropImage: string;
  rarityColor?: string;
  onClick?: (id: string) => void;
  className?: string;
}

export function CaseCard({ 
  id, 
  name, 
  image, 
  price, 
  bestDrop,
  bestDropImage,
  rarityColor = 'from-[#9b87f5] to-[#7E69AB]',
  onClick,
  className 
}: CaseCardProps) {
  const handleClick = () => {
    if (onClick) onClick(id);
  };

  return (
    <div className={cn(
      'group relative overflow-hidden rounded-lg bg-[#222632] transition-all duration-300 hover:scale-105',
      className
    )}>
      <div className={cn(
        'absolute top-0 left-0 h-1 w-full bg-gradient-to-r',
        rarityColor
      )} />
      
      <div className="p-4 flex flex-col h-full">
        <div className="relative aspect-square rounded overflow-hidden mb-4 group-hover:transform group-hover:scale-105 transition-transform duration-300">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-contain"
          />

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
            <div className="flex items-center gap-1">
              <img 
                src={bestDropImage} 
                alt={bestDrop} 
                className="w-6 h-6 object-cover rounded"
              />
              <span className="text-xs text-white truncate">Содержит: {bestDrop}</span>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>
        </div>
        
        <div className="mt-3 flex justify-between items-center">
          <span className="text-xl font-bold text-white">${price.toFixed(2)}</span>
          
          <Button 
            className={cn(
              "bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:opacity-90 text-white",
            )}
            onClick={handleClick}
          >
            Открыть
          </Button>
        </div>
      </div>
    </div>
  );
}
