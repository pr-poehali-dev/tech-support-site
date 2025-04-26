
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { SkinCard } from "@/components/SkinCard";
import { Skin } from "@/types/cases";
import { useAuth } from "@/hooks/useAuth";

interface CaseOpeningAnimationProps {
  isOpen: boolean;
  onClose: () => void;
  caseName: string;
  caseImage: string;
  casePrice: number;
  possibleItems: Skin[];
  winningItemIndex?: number; // Optional pre-determined winning item
  onComplete?: (item: Skin) => void;
}

export function CaseOpeningAnimation({
  isOpen,
  onClose,
  caseName,
  caseImage,
  casePrice,
  possibleItems,
  winningItemIndex,
  onComplete
}: CaseOpeningAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [finalItem, setFinalItem] = useState<Skin | null>(null);
  const [animationStarted, setAnimationStarted] = useState(false);
  const { currentUser, updateBalance, addItemToInventory, openAuthModal } = useAuth();
  
  const generateWinningItem = () => {
    // Определяем выигрышный предмет
    const winIndex = winningItemIndex !== undefined 
      ? winningItemIndex 
      : Math.floor(Math.random() * possibleItems.length);
    
    return possibleItems[winIndex];
  };

  const startAnimation = () => {
    if (isAnimating) return;
    
    // Проверяем, вошел ли пользователь
    if (!currentUser) {
      openAuthModal();
      return;
    }
    
    // Проверяем, достаточно ли у пользователя баланса
    if (currentUser.balance < casePrice) {
      alert('Недостаточно средств на балансе');
      return;
    }
    
    // Списываем стоимость кейса с баланса
    updateBalance(-casePrice);
    
    setAnimationStarted(true);
    setIsAnimating(true);
    setFinalItem(null);
    
    // Простая анимация без прокрутки
    setTimeout(() => {
      const winningItem = generateWinningItem();
      setFinalItem(winningItem);
      setIsAnimating(false);
      
      // Добавляем предмет в инвентарь
      addItemToInventory(winningItem);
      
      if (onComplete) onComplete(winningItem);
    }, 2000);
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
            {!isAnimating && (
              <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white">
                ✕
              </Button>
            )}
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
                Открыть кейс за {casePrice.toLocaleString('ru-RU')} ₽
              </Button>
            </div>
          ) : (
            <div className="relative h-64">
              {!finalItem ? (
                // Альтернативная анимация - пульсирующий кейс с вращением
                <div className="flex justify-center items-center h-full">
                  <img 
                    src={caseImage} 
                    alt={caseName} 
                    className="w-40 h-40 object-contain animate-spin-slow animate-pulse" 
                  />
                </div>
              ) : null}
            </div>
          )}
          
          {/* Отображение результата */}
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
