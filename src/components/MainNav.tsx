
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function MainNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#333] bg-[#1A1F2C]/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <span className="hidden sm:inline-block text-2xl font-bold text-white">
              Gaming<span className="text-[#9b87f5]">Case</span>
            </span>
            <span className="sm:hidden text-2xl font-bold text-white">GC</span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/crash" className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-white hover:bg-[#222632] hover:text-[#9b87f5]"
                  )}>
                    Crash
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/upgrade" className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-white hover:bg-[#222632] hover:text-[#9b87f5]"
                  )}>
                    Upgrade
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/support" className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-white hover:bg-[#222632] hover:text-[#9b87f5]"
                  )}>
                    Поддержка
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <Button className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white">
            Войти
          </Button>
          <Button variant="outline" className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10">
            Регистрация
          </Button>
        </div>
        
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden p-4 bg-[#222632] border-b border-[#333]">
          <nav className="space-y-4">
            <Link 
              to="/crash"
              className="block p-2 text-white hover:text-[#9b87f5]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Crash
            </Link>
            <Link 
              to="/upgrade"
              className="block p-2 text-white hover:text-[#9b87f5]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Upgrade
            </Link>
            <Link 
              to="/support"
              className="block p-2 text-white hover:text-[#9b87f5]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Поддержка
            </Link>
            <div className="pt-2 flex flex-col gap-2">
              <Button className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white w-full">
                Войти
              </Button>
              <Button variant="outline" className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10 w-full">
                Регистрация
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
