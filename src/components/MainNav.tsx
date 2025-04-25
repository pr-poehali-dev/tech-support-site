
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { UserProfile } from './user/UserProfile';
import { AuthModal } from './auth/AuthModal';
import { InventoryModal } from './inventory/InventoryModal';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';

export function MainNav() {
  const location = useLocation();
  const { toast } = useToast();
  const {
    currentUser,
    isAuthenticated,
    isAuthModalOpen,
    isInventoryModalOpen,
    openAuthModal,
    closeAuthModal,
    openInventoryModal,
    closeInventoryModal,
    register,
    login,
    logout,
    sellItem
  } = useAuth();
  
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  
  const handleLogin = (username: string, password: string) => {
    try {
      login(username, password);
      toast({
        title: "Успешный вход",
        description: "Вы успешно вошли в систему"
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Ошибка входа",
          description: error.message,
          variant: "destructive"
        });
      }
    }
  };
  
  const handleRegister = (username: string, email: string, password: string) => {
    try {
      register(username, email, password);
      toast({
        title: "Успешная регистрация",
        description: "Вы успешно зарегистрировались и вошли в систему"
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Ошибка регистрации",
          description: error.message,
          variant: "destructive"
        });
      }
    }
  };
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Выход из системы",
      description: "Вы успешно вышли из системы"
    });
  };
  
  return (
    <header className="bg-[#1A1F2C] border-b border-gray-800 py-4">
      <div className="container flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold text-white">
            CS<span className="text-purple-400">Case</span>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link 
              to="/cases" 
              className={`${location.pathname === '/cases' ? 'text-purple-400' : 'text-gray-300 hover:text-white'} transition-colors`}
            >
              Кейсы CS:GO
            </Link>
            <Link 
              to="/crash" 
              className={`${location.pathname === '/crash' ? 'text-purple-400' : 'text-gray-300 hover:text-white'} transition-colors`}
            >
              Crash
            </Link>
            <Link 
              to="/upgrade" 
              className={`${location.pathname === '/upgrade' ? 'text-purple-400' : 'text-gray-300 hover:text-white'} transition-colors`}
            >
              Upgrade
            </Link>
            <Link 
              to="/support" 
              className={`${location.pathname === '/support' ? 'text-purple-400' : 'text-gray-300 hover:text-white'} transition-colors`}
            >
              Поддержка
            </Link>
          </nav>
        </div>
        
        <div>
          {isAuthenticated && currentUser ? (
            <UserProfile 
              user={currentUser}
              onLogout={handleLogout}
              onViewInventory={openInventoryModal}
              onViewBalance={() => setIsBalanceModalOpen(true)}
            />
          ) : (
            <Button 
              onClick={openAuthModal}
              className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:opacity-90"
            >
              Войти
            </Button>
          )}
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
      
      {/* Inventory Modal */}
      {currentUser && (
        <InventoryModal 
          isOpen={isInventoryModalOpen}
          onClose={closeInventoryModal}
          user={currentUser}
          onSellItem={sellItem}
        />
      )}
    </header>
  );
}
