
import { useState, useCallback } from 'react';
import { Skin } from "@/types/cases";

interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
  inventory: Skin[];
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  
  const openAuthModal = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);
  
  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);
  
  const openInventoryModal = useCallback(() => {
    if (!currentUser) {
      openAuthModal();
      return;
    }
    setIsInventoryModalOpen(true);
  }, [currentUser]);
  
  const closeInventoryModal = useCallback(() => {
    setIsInventoryModalOpen(false);
  }, []);
  
  const login = useCallback((username: string, password: string) => {
    // В реальном приложении здесь был бы запрос к API
    // Для демонстрации создаем нового пользователя или используем существующего
    
    // Проверяем, есть ли пользователь в localStorage
    const savedUsers = localStorage.getItem('users');
    const users = savedUsers ? JSON.parse(savedUsers) : {};
    
    // Проверяем учетные данные
    const userExists = Object.values(users).some((u: any) => 
      u.username === username && u.password === password
    );
    
    if (userExists) {
      // Находим пользователя
      const foundUser = Object.values(users).find((u: any) => 
        u.username === username && u.password === password
      ) as any;
      
      // Удаляем пароль из данных пользователя перед сохранением в состоянии
      const { password: _, ...userWithoutPassword } = foundUser;
      
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      closeAuthModal();
      
      return {
        success: true,
        message: "Вы успешно вошли в систему"
      };
    } else {
      // Пользователь не найден, возвращаем ошибку
      return {
        success: false,
        message: "Неверное имя пользователя или пароль"
      };
    }
  }, [closeAuthModal]);
  
  const register = useCallback((username: string, email: string, password: string) => {
    // В реальном приложении здесь был бы запрос к API
    // Для демонстрации сохраняем в localStorage
    const userId = `user_${Date.now()}`;
    
    // Получаем существующих пользователей
    const savedUsers = localStorage.getItem('users');
    const users = savedUsers ? JSON.parse(savedUsers) : {};
    
    // Проверяем, существует ли пользователь с таким именем
    if (Object.values(users).some((user: any) => user.username === username)) {
      return {
        success: false,
        message: "Пользователь с таким именем уже существует"
      };
    }
    
    // Проверяем, существует ли пользователь с таким email
    if (Object.values(users).some((user: any) => user.email === email)) {
      return {
        success: false,
        message: "Пользователь с таким email уже существует"
      };
    }
    
    // Создаем нового пользователя
    const newUser = {
      id: userId,
      username,
      email,
      password, // В реальном приложении пароль должен быть захеширован
      balance: 10000, // Начальный баланс 10000 рублей
      inventory: []
    };
    
    // Сохраняем пользователя
    users[userId] = newUser;
    localStorage.setItem('users', JSON.stringify(users));
    
    // Удаляем пароль из данных пользователя перед сохранением в состоянии
    const { password: _, ...userWithoutPassword } = newUser;
    
    setCurrentUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    closeAuthModal();
    
    return {
      success: true,
      message: "Регистрация успешно завершена"
    };
  }, [closeAuthModal]);
  
  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  }, []);
  
  const addItemToInventory = useCallback((item: Skin) => {
    if (!currentUser) return;
    
    const updatedUser = {
      ...currentUser,
      inventory: [...currentUser.inventory, {...item, id: `${item.id}_${Date.now()}`}] // Уникальный ID для каждого предмета
    };
    
    setCurrentUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Обновляем также в списке пользователей
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      const users = JSON.parse(savedUsers);
      if (users[currentUser.id]) {
        users[currentUser.id] = {
          ...users[currentUser.id],
          inventory: updatedUser.inventory
        };
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
  }, [currentUser]);
  
  const sellItem = useCallback((itemId: string) => {
    if (!currentUser) return false;
    
    // Находим предмет в инвентаре
    const itemIndex = currentUser.inventory.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return false;
    
    const item = currentUser.inventory[itemIndex];
    
    // Удаляем предмет из инвентаря и добавляем его стоимость к балансу
    const updatedInventory = [...currentUser.inventory];
    updatedInventory.splice(itemIndex, 1);
    
    const updatedUser = {
      ...currentUser,
      balance: currentUser.balance + item.price,
      inventory: updatedInventory
    };
    
    setCurrentUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Обновляем также в списке пользователей
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      const users = JSON.parse(savedUsers);
      if (users[currentUser.id]) {
        users[currentUser.id] = {
          ...users[currentUser.id],
          balance: updatedUser.balance,
          inventory: updatedUser.inventory
        };
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
    
    return true;
  }, [currentUser]);
  
  const updateBalance = useCallback((amount: number) => {
    if (!currentUser) return false;
    
    const updatedUser = {
      ...currentUser,
      balance: currentUser.balance + amount
    };
    
    setCurrentUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Обновляем также в списке пользователей
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      const users = JSON.parse(savedUsers);
      if (users[currentUser.id]) {
        users[currentUser.id] = {
          ...users[currentUser.id],
          balance: updatedUser.balance
        };
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
    
    return true;
  }, [currentUser]);

  return {
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
    addItemToInventory,
    sellItem,
    updateBalance
  };
}
