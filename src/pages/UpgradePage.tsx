
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";

const UpgradePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#1A1F2C]">
      <MainNav />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Режим Upgrade</h1>
        <div className="bg-[#222632] border border-[#333] rounded-lg p-6">
          <p className="text-gray-300">Страница с режимом Upgrade находится в разработке.</p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UpgradePage;
