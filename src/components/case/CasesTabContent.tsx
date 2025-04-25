
import React from 'react';
import { CaseCard } from "@/components/CaseCard";
import { Case } from "@/types/cases";

interface CasesTabContentProps {
  cases: Case[];
  category: string;
  handleOpenCase: (caseId: string) => void;
}

export function CasesTabContent({ 
  cases, 
  category, 
  handleOpenCase 
}: CasesTabContentProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cases
        .filter(c => c.category === category)
        .map(caseItem => (
          <CaseCard 
            key={caseItem.id} 
            {...caseItem}
            onClick={handleOpenCase}
          />
        ))
      }
    </div>
  );
}
