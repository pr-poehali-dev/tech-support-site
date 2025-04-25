
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SkinCard } from "@/components/SkinCard";
import { User, Skin } from "@/types/cases";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSellItem: (item: Skin) => void;
}

export function InventoryModal({ isOpen, onClose, user, onSellItem }: InventoryModalProps) {
  const [selectedTab, setSelectedTab] = useState('all');
  const { toast } = useToast();
  
  const handleSellItem = (item: Skin) => {
    onSellItem(item);
    toast({
      title: "Предмет продан",
      description: `Вы продали ${item.name} за ${new Intl.NumberFormat('ru-RU', { 
        style: 'currency', 
        currency: 'RUB',
        maximumFractionDigits: 0
      }).format(item.price)}`,
    });
  };
  
  // Filter items by rarity
  const filterItems = (rarity?: string) => {
    if (!rarity || rarity === 'all') return user.inventory;
    return user.inventory.filter(item => item.rarity === rarity);
  };
  
  // Group by rarity for count display
  const countByRarity = {
    all: user.inventory.length,
    common: user.inventory.filter(i => i.rarity === 'common').length,
    uncommon: user.inventory.filter(i => i.rarity === 'uncommon').length,
    rare: user.inventory.filter(i => i.rarity === 'rare').length,
    mythical: user.inventory.filter(i => i.rarity === 'mythical').length,
    legendary: user.inventory.filter(i => i.rarity === 'legendary').length,
    ancient: user.inventory.filter(i => i.rarity === 'ancient').length,
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-[#1A1F2C] text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Ваш инвентарь</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-7 mb-4">
            <TabsTrigger value="all">
              Все ({countByRarity.all})
            </TabsTrigger>
            <TabsTrigger value="common">
              Обычные ({countByRarity.common})
            </TabsTrigger>
            <TabsTrigger value="uncommon">
              Необычные ({countByRarity.uncommon})
            </TabsTrigger>
            <TabsTrigger value="rare">
              Редкие ({countByRarity.rare})
            </TabsTrigger>
            <TabsTrigger value="mythical">
              Мифические ({countByRarity.mythical})
            </TabsTrigger>
            <TabsTrigger value="legendary">
              Легендарные ({countByRarity.legendary})
            </TabsTrigger>
            <TabsTrigger value="ancient">
              Древние ({countByRarity.ancient})
            </TabsTrigger>
          </TabsList>
          
          {['all', 'common', 'uncommon', 'rare', 'mythical', 'legendary', 'ancient'].map((tab) => (
            <TabsContent key={tab} value={tab}>
              {filterItems(tab).length > 0 ? (
                <div className="grid grid-cols-5 gap-4">
                  {filterItems(tab).map((item) => (
                    <div key={item.id} className="relative group">
                      <SkinCard {...item} />
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button 
                          variant="destructive" 
                          onClick={() => handleSellItem(item)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Продать
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  В этой категории пока нет предметов
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
