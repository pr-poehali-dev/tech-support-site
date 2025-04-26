
import React, { useState } from 'react';
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { CasesHeader } from "@/components/case/CasesHeader";
import { CasesTabs } from "@/components/case/CasesTabs";
import { CasesTabContent } from "@/components/case/CasesTabContent";
import { CaseOpeningAnimation } from "@/components/CaseOpeningAnimation";
import { casesData } from "@/data/casesData";
import { Case, Skin } from "@/types/cases";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/auth/AuthModal";
import { InventoryModal } from "@/components/inventory/InventoryModal";
import { useToast } from "@/components/ui/use-toast";

const CasesPage = () => {
  const [activeTab, setActiveTab] = useState("popular");
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [isOpeningCase, setIsOpeningCase] = useState(false);
  const { toast } = useToast();
  
  const { 
    currentUser, 
    isAuthModalOpen, 
    closeAuthModal, 
    isInventoryModalOpen, 
    closeInventoryModal,
    openAuthModal,
    login,
    register,
    addItemToInventory
  } = useAuth();

  const handleOpenCase = (caseItem: Case) => {
    if (!currentUser) {
      openAuthModal();
      return;
    }
    
    setSelectedCase(caseItem);
    setIsOpeningCase(true);
  };

  const handleCaseOpeningComplete = (item: Skin) => {
    toast({
      title: "Поздравляем!",
      description: `Вы получили ${item.name} стоимостью ${item.price.toLocaleString('ru-RU')} ₽`,
    });
    
    if (currentUser) {
      addItemToInventory(item);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1A1F2C]">
      <MainNav />
      
      <main className="flex-1">
        <CasesHeader />
        
        <div className="container mx-auto px-4 py-8">
          <CasesTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="mt-8">
            {activeTab === "popular" && (
              <CasesTabContent cases={casesData.popularCases} onOpenCase={handleOpenCase} />
            )}
            
            {activeTab === "new" && (
              <CasesTabContent cases={casesData.newCases} onOpenCase={handleOpenCase} />
            )}
            
            {activeTab === "special" && (
              <CasesTabContent cases={casesData.specialCases} onOpenCase={handleOpenCase} />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Модальные окна */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal}
        onLogin={login}
        onRegister={register}
      />
      
      <InventoryModal 
        isOpen={isInventoryModalOpen}
        onClose={closeInventoryModal}
      />
      
      {selectedCase && (
        <CaseOpeningAnimation
          isOpen={isOpeningCase}
          onClose={() => setIsOpeningCase(false)}
          caseName={selectedCase.name}
          caseImage={selectedCase.image}
          casePrice={selectedCase.price}
          possibleItems={selectedCase.possibleItems}
          onComplete={handleCaseOpeningComplete}
        />
      )}
    </div>
  );
};

export default CasesPage;
