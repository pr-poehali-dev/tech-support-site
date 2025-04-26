
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
  // Проверяем, что cases - это массив и не undefined
  if (!cases || !Array.isArray(cases)) {
    return <div className="text-center py-8 text-gray-400">Кейсы не найдены</div>;
  }

  const filteredCases = cases.filter(c => c.category === category);

  if (filteredCases.length === 0) {
    return <div className="text-center py-8 text-gray-400">В данной категории нет доступных кейсов</div>;
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCases.map(caseItem => (
        <CaseCard 
          key={caseItem.id} 
          {...caseItem}
          onClick={() => handleOpenCase(caseItem.id)}
        />
      ))}
    </div>
  );
}
