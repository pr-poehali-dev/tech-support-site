
import React, { useState } from 'react';
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { CasesHeader } from "@/components/case/CasesHeader";
import { CasesTabs } from "@/components/case/CasesTabs";
import { CasesTabContent } from "@/components/case/CasesTabContent";
import { CaseOpeningAnimation } from "@/components/CaseOpeningAnimation";
import { cases } from "@/data/casesData";
import { Case, Skin } from "@/types/cases";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/auth/AuthModal";
import { InventoryModal } from "@/components/inventory/InventoryModal";
import { useToast } from "@/components/ui/use-toast";
import { useCaseOpening } from "@/hooks/useCaseOpening";

const CasesPage = () => {
  const [activeTab, setActiveTab] = useState("popular");
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

  const {
    selectedCase,
    openAnimationModal,
    handleOpenCase,
    handleCloseAnimation,
    handleComplete
  } = useCaseOpening();

  if (!cases || !Array.isArray(cases)) {
    return (
      <div className="min-h-screen flex flex-col bg-[#1A1F2C]">
        <MainNav />
        <div className="container mx-auto px-4 py-8 flex-1 flex items-center justify-center">
          <p className="text-white text-xl">Ошибка загрузки данных. Пожалуйста, обновите страницу.</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Фильтруем кейсы по категориям
  const popularCases = cases.filter(c => c.category === "popular");
  const newCases = cases.filter(c => c.category === "new");
  const specialCases = cases.filter(c => c.category === "special");

  return (
    <div className="min-h-screen flex flex-col bg-[#1A1F2C]">
      <MainNav />
      
      <main className="flex-1">
        <CasesHeader />
        
        <div className="container mx-auto px-4 py-8">
          <CasesTabs 
            cases={cases}
            handleOpenCase={handleOpenCase}
          />
          
          <div className="mt-8">
            {activeTab === "popular" && (
              <CasesTabContent 
                cases={cases}
                category="popular"
                handleOpenCase={handleOpenCase}
              />
            )}
            
            {activeTab === "new" && (
              <CasesTabContent 
                cases={cases}
                category="new"
                handleOpenCase={handleOpenCase}
              />
            )}
            
            {activeTab === "special" && (
              <CasesTabContent 
                cases={cases}
                category="special"
                handleOpenCase={handleOpenCase}
              />
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
          isOpen={openAnimationModal}
          onClose={handleCloseAnimation}
          caseName={selectedCase.name}
          caseImage={selectedCase.image}
          casePrice={selectedCase.price}
          possibleItems={selectedCase.items}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
};

export default CasesPage;
