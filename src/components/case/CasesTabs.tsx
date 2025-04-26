
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CasesTabContent } from "@/components/case/CasesTabContent";
import { Case } from "@/types/cases";

interface CasesTabsProps {
  cases: Case[];
  handleOpenCase: (caseId: string) => void;
}

export function CasesTabs({ cases, handleOpenCase }: CasesTabsProps) {
  // Проверяем, что cases - это массив и не undefined
  if (!cases || !Array.isArray(cases)) {
    return <div className="text-center py-8 text-gray-400">Ошибка загрузки кейсов</div>;
  }

  return (
    <Tabs defaultValue="popular" className="w-full">
      <TabsList className="mb-8 bg-[#222632] border-b border-[#333]">
        <TabsTrigger 
          value="popular"
          className="data-[state=active]:text-[#9b87f5] data-[state=active]:border-b-2 data-[state=active]:border-[#9b87f5]"
        >
          Популярные
        </TabsTrigger>
        <TabsTrigger 
          value="new"
          className="data-[state=active]:text-[#9b87f5] data-[state=active]:border-b-2 data-[state=active]:border-[#9b87f5]"
        >
          Новые
        </TabsTrigger>
        <TabsTrigger 
          value="special"
          className="data-[state=active]:text-[#9b87f5] data-[state=active]:border-b-2 data-[state=active]:border-[#9b87f5]"
        >
          Специальные
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="popular" className="mt-0">
        <CasesTabContent 
          cases={cases} 
          category="popular" 
          handleOpenCase={handleOpenCase} 
        />
      </TabsContent>
      
      <TabsContent value="new" className="mt-0">
        <CasesTabContent 
          cases={cases} 
          category="new" 
          handleOpenCase={handleOpenCase} 
        />
      </TabsContent>
      
      <TabsContent value="special" className="mt-0">
        <CasesTabContent 
          cases={cases} 
          category="special" 
          handleOpenCase={handleOpenCase} 
        />
      </TabsContent>
    </Tabs>
  );
}
