
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CaseCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  description?: string;
  className?: string;
  onClick?: (id: string) => void;
}

export function CaseCard({
  id,
  name,
  image,
  price,
  description,
  className,
  onClick
}: CaseCardProps) {
  // Format price to Russian ruble
  const formattedPrice = new Intl.NumberFormat('ru-RU', { 
    style: 'currency', 
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(price);
  
  return (
    <Card className={cn(
      "overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 border-gray-700 transition-all hover:shadow-lg hover:shadow-purple-900/20",
      className
    )}>
      <CardContent className="p-0">
        <div className="relative">
          <div className="bg-gradient-to-b from-purple-900/20 to-transparent p-6 flex items-center justify-center h-48">
            <img 
              src={image} 
              alt={name} 
              className="w-32 h-32 object-contain transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-16 pointer-events-none"></div>
        </div>
        
        <div className="p-4 text-center">
          <h3 className="text-lg font-bold text-white">{name}</h3>
          {description && (
            <p className="text-sm text-gray-400 mt-1">{description}</p>
          )}
          <p className="text-lg font-bold text-purple-400 mt-2">{formattedPrice}</p>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-center">
        <Button 
          className="w-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:opacity-90"
          onClick={() => onClick && onClick(id)}
        >
          Открыть
        </Button>
      </CardFooter>
    </Card>
  );
}
