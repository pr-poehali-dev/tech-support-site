
import { useState } from 'react';
import { Case, Skin } from "@/types/cases";
import { useAuth } from './useAuth';
import { useToast } from "@/components/ui/use-toast";

export function useCaseOpening() {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [openAnimationModal, setOpenAnimationModal] = useState(false);
  const { currentUser, addItemToInventory, openAuthModal } = useAuth();
  const { toast } = useToast();
  
  const handleOpenCase = (caseId: string, cases: Case[]) => {
    if (!currentUser) {
      toast({
        title: "Требуется авторизация",
        description: "Войдите или зарегистрируйтесь, чтобы открыть кейс",
        variant: "destructive"
      });
      openAuthModal();
      return;
    }
    
    const foundCase = cases.find(c => c.id === caseId);
    if (foundCase) {
      // Check if user has enough balance
      if (currentUser.balance < foundCase.price) {
        toast({
          title: "Недостаточно средств",
          description: "Пополните баланс, чтобы открыть этот кейс",
          variant: "destructive"
        });
        return;
      }
      
      setSelectedCase(foundCase);
      setOpenAnimationModal(true);
    }
  };
  
  const handleCloseAnimation = () => {
    setOpenAnimationModal(false);
  };
  
  const handleComplete = (item: Skin) => {
    if (currentUser && selectedCase) {
      // Generate a unique ID for the item
      const uniqueItem = {
        ...item,
        id: `${item.id}-${Date.now()}`
      };
      
      // Add item to inventory
      addItemToInventory(uniqueItem);
      
      toast({
        title: "Предмет добавлен в инвентарь",
        description: `${item.name} успешно добавлен в ваш инвентарь`,
      });
    }
  };

  return {
    selectedCase,
    openAnimationModal,
    handleOpenCase,
    handleCloseAnimation,
    handleComplete
  };
}
