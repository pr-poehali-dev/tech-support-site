
import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/cases";
import { ChevronDown } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface UserProfileProps {
  user: User;
  onLogout: () => void;
  onViewInventory: () => void;
  onViewBalance: () => void;
}

export function UserProfile({ user, onLogout, onViewInventory, onViewBalance }: UserProfileProps) {
  // Format balance to Russian ruble
  const formattedBalance = new Intl.NumberFormat('ru-RU', { 
    style: 'currency', 
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(user.balance);
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };
  
  return (
    <div className="flex items-center gap-4">
      <div className="bg-gray-800 rounded-lg px-3 py-1 text-white">
        {formattedBalance}
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-gray-800">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${user.username}`} />
              <AvatarFallback className="bg-purple-900">{getInitials(user.username)}</AvatarFallback>
            </Avatar>
            <span>{user.username}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-white">
          <DropdownMenuItem onClick={onViewInventory} className="cursor-pointer hover:bg-gray-700">
            Инвентарь
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onViewBalance} className="cursor-pointer hover:bg-gray-700">
            Пополнить баланс
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-red-400 hover:bg-gray-700 hover:text-red-400">
            Выйти
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
