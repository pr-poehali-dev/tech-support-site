
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

  return (
    <div className="min-h-screen flex flex-col bg-[#1A1F2C]">
      <MainNav />
      
      <main className="flex-1">
        <CasesHeader />
        
        <div className="container mx-auto px-4 py-8">
          <CasesTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="mt-8">
            {activeTab === "popular" && (
              <CasesTabContent 
                cases={casesData.popularCases} 
                onOpenCase={(caseItem) => handleOpenCase(caseItem.id, casesData.allCases)} 
              />
            )}
            
            {activeTab === "new" && (
              <CasesTabContent 
                cases={casesData.newCases} 
                onOpenCase={(caseItem) => handleOpenCase(caseItem.id, casesData.allCases)} 
              />
            )}
            
            {activeTab === "special" && (
              <CasesTabContent 
                cases={casesData.specialCases} 
                onOpenCase={(caseItem) => handleOpenCase(caseItem.id, casesData.allCases)} 
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
