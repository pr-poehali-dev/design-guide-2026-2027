import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-3xl font-black tracking-tight">
          <span className="outline-text">Designeasy</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/" className="text-sm hover:text-accent transition-colors font-semibold">
            Главная
          </Link>
          <Link to="/theory" className="text-sm hover:text-accent transition-colors">
            Теория
          </Link>
          <Link to="/card-styles" className="text-sm hover:text-accent transition-colors">
            Стили
          </Link>
          <Link to="/typography" className="text-sm hover:text-accent transition-colors">
            Типографика
          </Link>
          <Link to="/coloristics" className="text-sm hover:text-accent transition-colors">
            Колористика
          </Link>
          <Link to="/composition" className="text-sm hover:text-accent transition-colors">
            Композиция
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Icon name="Menu" size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link 
                  to="/" 
                  className="text-lg hover:text-accent transition-colors font-semibold py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Главная
                </Link>
                <Link 
                  to="/theory" 
                  className="text-lg hover:text-accent transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Теория
                </Link>
                <Link 
                  to="/card-styles" 
                  className="text-lg hover:text-accent transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Стили
                </Link>
                <Link 
                  to="/typography" 
                  className="text-lg hover:text-accent transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Типографика
                </Link>
                <Link 
                  to="/coloristics" 
                  className="text-lg hover:text-accent transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Колористика
                </Link>
                <Link 
                  to="/composition" 
                  className="text-lg hover:text-accent transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Композиция
                </Link>
                {!isAuthenticated ? (
                  <Button asChild className="mt-4">
                    <Link to="/login" onClick={() => setIsOpen(false)}>Войти</Link>
                  </Button>
                ) : !user?.hasSubscription && !user?.isAdmin ? (
                  <Button asChild className="mt-4">
                    <Link to="/subscribe" onClick={() => setIsOpen(false)}>Купить доступ</Link>
                  </Button>
                ) : null}
              </nav>
            </SheetContent>
          </Sheet>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Icon name="User" size={18} />
                  {user?.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass-effect">
                <DropdownMenuItem asChild>
                  <Link to="/profile">Мой профиль</Link>
                </DropdownMenuItem>
                {user?.isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">Админ-панель</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={logout}>Выйти</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" asChild>
              <Link to="/login">Войти</Link>
            </Button>
          )}
          <Button asChild className="glass-effect hover-lift border-0">
            <Link to="/subscribe">Купить доступ</Link>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}