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
import Icon from '@/components/ui/icon';

export default function Navigation() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect sticky top-0 z-50 mb-8"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-3xl font-black tracking-tight">
          <span className="outline-text">Designeasy</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm hover:text-accent transition-colors font-semibold">
            Главная
          </Link>
          <Link to="/composition" className="text-sm hover:text-accent transition-colors">
            Композиция
          </Link>
          <Link to="/typography" className="text-sm hover:text-accent transition-colors">
            Типографика
          </Link>
          <Link to="/coloristics" className="text-sm hover:text-accent transition-colors">
            Колористика
          </Link>
          <Link to="/card-styles" className="text-sm hover:text-accent transition-colors">
            Стили
          </Link>
          <Link to="/theory" className="text-sm hover:text-accent transition-colors">
            Теория
          </Link>
        </nav>

        <div className="flex items-center gap-4">
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
          {!user?.hasSubscription && !user?.isAdmin && (
            <Button asChild className="glass-effect hover-lift border-0">
              <Link to="/subscribe">Купить доступ</Link>
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
