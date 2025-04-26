
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from '@/hooks/useAuth';
import { UserProfile } from './user/UserProfile';
import { AuthModal } from './auth/AuthModal';
import { InventoryModal } from './inventory/InventoryModal';

export function MainNav() {
  const { 
    currentUser, 
    isAuthModalOpen, 
    isInventoryModalOpen,
    openAuthModal, 
    closeAuthModal,
    openInventoryModal,
    closeInventoryModal,
    login,
    register,
    logout,
    sellItem
  } = useAuth();

  return (
    <header className="bg-[#1A1F2C] p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <NavLink to="/" className="text-2xl font-bold text-white flex items-center">
            <span className="text-purple-500">CS</span>
            <span>Case</span>
          </NavLink>
          
          <nav className="ml-8 hidden md:flex">
            <ul className="flex space-x-6">
              <li>
                <NavLink 
                  to="/cases" 
                  className={({ isActive }) => 
                    isActive 
                      ? "text-purple-500 font-medium" 
                      : "text-gray-300 hover:text-white transition"
                  }
                >
                  Кейсы CS:GO
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/crash" 
                  className={({ isActive }) => 
                    isActive 
                      ? "text-purple-500 font-medium" 
                      : "text-gray-300 hover:text-white transition"
                  }
                >
                  Crash
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/upgrade" 
                  className={({ isActive }) => 
                    isActive 
                      ? "text-purple-500 font-medium" 
                      : "text-gray-300 hover:text-white transition"
                  }
                >
                  Upgrade
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/support" 
                  className={({ isActive }) => 
                    isActive 
                      ? "text-purple-500 font-medium" 
                      : "text-gray-300 hover:text-white transition"
                  }
                >
                  Поддержка
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {currentUser ? (
            <UserProfile 
              user={currentUser} 
              onLogout={logout}
              onViewInventory={openInventoryModal}
              onViewBalance={() => {}}
            />
          ) : (
            <Button
              variant="outline"
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={openAuthModal}
            >
              Войти
            </Button>
          )}
        </div>
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal}
        onLogin={login}
        onRegister={register}
      />
      
      <InventoryModal
        isOpen={isInventoryModalOpen}
        onClose={closeInventoryModal}
        user={currentUser}
        onSellItem={(item) => sellItem(item.id)}
      />
    </header>
  );
}
