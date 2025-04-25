
import { useState, useEffect } from 'react';
import { User, Skin } from "@/types/cases";

// Mock users database
const USERS_KEY = 'cs-case-users';

interface StoredUser extends User {
  password: string;
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  
  // Load users from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);
  
  // Get users from localStorage
  const getUsers = (): StoredUser[] => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  };
  
  // Save users to localStorage
  const saveUsers = (users: StoredUser[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };
  
  // Register a new user
  const register = (username: string, email: string, password: string) => {
    const users = getUsers();
    
    // Check if username already exists
    if (users.some(u => u.username === username)) {
      throw new Error('Пользователь с таким именем уже существует');
    }
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
      throw new Error('Пользователь с таким email уже существует');
    }
    
    // Create new user
    const newUser: StoredUser = {
      id: Date.now().toString(),
      username,
      email,
      password,
      balance: 1000, // Start with 1000 rubles
      inventory: []
    };
    
    // Save user
    users.push(newUser);
    saveUsers(users);
    
    // Login the new user
    const { password: _, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    // Close auth modal
    setIsAuthModalOpen(false);
    
    return userWithoutPassword;
  };
  
  // Login user
  const login = (username: string, password: string) => {
    const users = getUsers();
    
    // Find user
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
      throw new Error('Неверное имя пользователя или пароль');
    }
    
    // Login user
    const { password: _, ...userWithoutPassword } = user;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    // Close auth modal
    setIsAuthModalOpen(false);
    
    return userWithoutPassword;
  };
  
  // Logout user
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };
  
  // Add item to inventory
  const addItemToInventory = (item: Skin) => {
    if (!currentUser) return;
    
    // Update current user
    const updatedUser = {
      ...currentUser,
      inventory: [...currentUser.inventory, item]
    };
    
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Update in users store
    const users = getUsers();
    const updatedUsers = users.map(user => {
      if (user.id === currentUser.id) {
        return { ...user, inventory: [...user.inventory, item] };
      }
      return user;
    });
    
    saveUsers(updatedUsers);
  };
  
  // Sell item from inventory
  const sellItem = (item: Skin) => {
    if (!currentUser) return;
    
    // Remove item from inventory and add price to balance
    const updatedInventory = currentUser.inventory.filter(i => i.id !== item.id);
    const updatedUser = {
      ...currentUser,
      balance: currentUser.balance + item.price,
      inventory: updatedInventory
    };
    
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Update in users store
    const users = getUsers();
    const updatedUsers = users.map(user => {
      if (user.id === currentUser.id) {
        return { 
          ...user, 
          balance: user.balance + item.price,
          inventory: updatedInventory 
        };
      }
      return user;
    });
    
    saveUsers(updatedUsers);
  };
  
  return {
    currentUser,
    isAuthenticated: !!currentUser,
    isAuthModalOpen,
    isInventoryModalOpen,
    openAuthModal: () => setIsAuthModalOpen(true),
    closeAuthModal: () => setIsAuthModalOpen(false),
    openInventoryModal: () => setIsInventoryModalOpen(true),
    closeInventoryModal: () => setIsInventoryModalOpen(false),
    register,
    login,
    logout,
    addItemToInventory,
    sellItem
  };
}
