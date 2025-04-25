
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { SkinCard } from "@/components/SkinCard";
import { cn } from "@/lib/utils";

interface Skin {
  id: string;
  name: string;
  image: string;
  price: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'mythical' | 'legendary' | 'ancient';
  wear?: string;
}

interface CaseOpeningAnimationProps {
  isOpen: boolean;
  onClose: () => void;
  caseName: string;
  caseImage: string;
  possibleItems: Skin[];
  winningItemIndex?: number; // Optional pre-determined winning item
  onComplete?: (item: Skin) => void;
}

export function CaseOpeningAnimation({
  isOpen,
  onClose,
  caseName,
  caseImage,
  possibleItems,
  winningItemIndex,
  onComplete
}: CaseOpeningAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [finalItem, setFinalItem] = useState<Skin | null>(null);
  const [animationStarted, setAnimationStarted] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Generate enough items to fill the animation (with repeats)
  const generateItems = () => {
    // Create an array with 30-50 items, with the winning item at a specific position
    const items: Skin[] = [];
    const totalItems = 50;
    const winIndex = winningItemIndex !== undefined 
      ? winningItemIndex 
      : Math.floor(Math.random() * possibleItems.length);
    
    // Winning item should appear near the end of the animation
    const winningPosition = Math.floor(totalItems * 0.8); // 80% through the animation
    
    for (let i = 0; i < totalItems; i++) {
      if (i === winningPosition) {
        items.push(possibleItems[winIndex]);
      } else {
        // Random items from the possible items
        const randomIndex = Math.floor(Math.random() * possibleItems.length);
        items.push(possibleItems[randomIndex]);
      }
    }
    
    return { items, winningPosition };
  };

  const startAnimation = () => {
    if (isAnimating) return;
    
    setAnimationStarted(true);
    setIsAnimating(true);
    setFinalItem(null);
    
    const { items, winningPosition } = generateItems();
    const winner = items[winningPosition];
    
    if (sliderRef.current) {
      // Set up the initial position
      sliderRef.current.style.transition = 'none';
      sliderRef.current.style.transform = 'translateX(0)';
      
      // Force a reflow
      void sliderRef.current.offsetWidth;
      
      // Calculate the target position (centered on the winning item)
      const itemWidth = 160; // Width of each item + margin
      const targetPosition = -(winningPosition * itemWidth) + (window.innerWidth / 2) - (itemWidth / 2);
      
      // Start the animation
      sliderRef.current.style.transition = 'transform 5s cubic-bezier(0.3, 0.1, 0.3, 1)';
      sliderRef.current.style.transform = `translateX(${targetPosition}px)`;
      
      // Set the final item after animation completes
      setTimeout(() => {
        setIsAnimating(false);
        setFinalItem(winner);
        if (onComplete) onComplete(winner);
      }, 5000);
    }
  };

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setAnimationStarted(false);
      setIsAnimating(false);
      setFinalItem(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="bg-[#1A1F2C] rounded-lg max-w-3xl w-full relative overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Открытие кейса: {caseName}</h2>
            <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white">
              ✕
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          {!animationStarted ? (
            <div className="flex flex-col items-center gap-6">
              <img src={caseImage} alt={caseName} className="w-40 h-40 object-contain animate-pulse" />
              <Button 
                className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:opacity-90 text-white px-8 py-6 text-lg"
                onClick={startAnimation}
              >
                Открыть кейс
              </Button>
            </div>
          ) : (
            <div className="relative h-64 overflow-hidden">
              {/* Central marker */}
              <div 
                className="absolute top-0 left-1/2 h-full w-0.5 bg-[#9b87f5] z-10"
                ref={targetRef}
              />
              
              {/* Items slider */}
              <div 
                ref={sliderRef} 
                className="flex items-center absolute left-0 top-1/2 -translate-y-1/2 will-change-transform"
              >
                {generateItems().items.map((item, index) => (
                  <div key={index} className="mx-2 flex-shrink-0 w-36">
                    <SkinCard {...item} />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Result display */}
          {finalItem && (
            <div className="mt-6 flex flex-col items-center gap-4 animate-fade-in">
              <h3 className="text-xl font-bold text-white">Поздравляем!</h3>
              <div className="w-48">
                <SkinCard {...finalItem} className="scale-110" />
              </div>
              <p className="text-gray-300">
                Вы получили: <span className="font-bold text-white">{finalItem.name}</span>
              </p>
              <Button 
                className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
                onClick={onClose}
              >
                Продолжить
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
