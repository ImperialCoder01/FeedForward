
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Wallet, User, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { navItems } from "./NavLinks";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="pr-0">
        <div className="px-7">
          <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
            <span className="font-bold text-2xl gradient-text">FeedForward</span>
          </Link>
        </div>
        <nav className="flex flex-col gap-4 mt-8">
          {navItems
            .filter(item => !item.protected || isAuthenticated)
            .map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center py-2 px-7 text-base font-medium transition-colors hover:text-primary"
                )}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.title}
              </Link>
            ))}
          
          {isAuthenticated ? (
            <>
              <Link 
                to="/wallet"
                onClick={() => setIsOpen(false)}
                className="flex items-center py-2 px-7 text-base font-medium transition-colors hover:text-primary"
              >
                <Wallet className="mr-2 h-4 w-4" />
                My Wallet
              </Link>
              <Link 
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center py-2 px-7 text-base font-medium transition-colors hover:text-primary"
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center py-2 px-7 text-base font-medium transition-colors hover:text-primary text-left"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </button>
            </>
          ) : (
            <Button asChild className="mx-7 mt-4 btn-gradient animate-fade-in">
              <Link to="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
            </Button>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
