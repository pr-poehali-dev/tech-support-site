
import React from 'react';
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { CaseOpeningAnimation } from "@/components/CaseOpeningAnimation";
import { CasesHeader } from "@/components/case/CasesHeader";
import { CasesTabs } from "@/components/case/CasesTabs";
import { cases } from "@/data/casesData";
import { useCaseOpening } from "@/hooks/useCaseOpening";
import { useAuth } from "@/hooks/useAuth";

const CasesPage = () => {
  const {
    selectedCase,
    openAnimationModal,
    handleOpenCase: openCase,
    handleCloseAnimation,
    handleComplete
  } = useCaseOpening();
  
  const { currentUser } = useAuth();
  
  // Создаем обертку для передачи cases в handleOpenCase
  const handleOpenCase = (caseId: string) => {
    openCase(caseId, cases);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1A1F2C]">
      <MainNav />
      
      <main className="flex-1 container py-8">
        <CasesHeader />
        <CasesTabs cases={cases} handleOpenCase={handleOpenCase} />
      </main>

      {selectedCase && (
        <CaseOpeningAnimation 
          isOpen={openAnimationModal}
          onClose={handleCloseAnimation}
          caseName={selectedCase.name}
          caseImage={selectedCase.image}
          possibleItems={selectedCase.items}
          onComplete={handleComplete}
        />
      )}

      <Footer />
    </div>
  );
};

export default CasesPage;
