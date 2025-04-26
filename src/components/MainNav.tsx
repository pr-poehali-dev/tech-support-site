
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export function MainNav() {
  const { 
    currentUser, 
    openAuthModal, 
    logout, 
    openInventoryModal 
  } = useAuth();
  
  return (
    <header className="bg-[#1A1F2C] border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center mr-6">
              <span className="text-2xl font-bold text-[#9b87f5]">CSCase</span>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link to="/cases" className="text-gray-300 hover:text-white transition-colors">
                Кейсы CS:GO
              </Link>
              <Link to="/crash" className="text-gray-300 hover:text-white transition-colors">
                Crash
              </Link>
              <Link to="/upgrade" className="text-gray-300 hover:text-white transition-colors">
                Upgrade
              </Link>
              <Link to="/support" className="text-gray-300 hover:text-white transition-colors">
                Поддержка
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <div className="hidden md:flex items-center text-white bg-[#222632] rounded-lg px-4 py-2">
                  <span className="font-bold">{currentUser.balance.toLocaleString('ru-RU')} ₽</span>
                </div>
                
                <Button 
                  variant="outline"
                  className="border-[#9b87f5] text-white hover:bg-[#9b87f5]/10"
                  onClick={openInventoryModal}
                >
                  Инвентарь
                </Button>
                
                <div className="relative group">
                  <Button variant="ghost" className="text-white">
                    {currentUser.username}
                  </Button>
                  
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-[#222632] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <button 
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#1A1F2C] w-full text-left"
                      onClick={logout}
                    >
                      Выйти
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Button 
                className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
                onClick={openAuthModal}
              >
                Войти
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
