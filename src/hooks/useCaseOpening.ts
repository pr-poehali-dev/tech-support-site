
import { useState } from 'react';
import { Case, Skin } from "@/types/cases";

export function useCaseOpening() {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [openAnimationModal, setOpenAnimationModal] = useState(false);
  
  const handleOpenCase = (caseId: string, cases: Case[]) => {
    const foundCase = cases.find(c => c.id === caseId);
    if (foundCase) {
      setSelectedCase(foundCase);
      setOpenAnimationModal(true);
    }
  };
  
  const handleCloseAnimation = () => {
    setOpenAnimationModal(false);
  };
  
  const handleComplete = (item: Skin) => {
    console.log('Won item:', item);
    // Here you would typically update user inventory, etc.
  };

  return {
    selectedCase,
    openAnimationModal,
    handleOpenCase,
    handleCloseAnimation,
    handleComplete
  };
}
