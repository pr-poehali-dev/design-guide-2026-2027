import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const { login, adminLogin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: 'Успешный вход',
        description: 'Добро пожаловать!',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Неверный email или пароль',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await adminLogin(adminUsername, adminPassword);
      if (success) {
        toast({
          title: 'Успешный вход',
          description: 'Добро пожаловать, администратор!',
        });
        navigate('/admin');
      } else {
        toast({
          title: 'Ошибка',
          description: 'Неверное имя пользователя или пароль',
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <div className="fixed inset-0 -z-10 animated-gradient" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md px-6"
      >
        <div className="glass-effect rounded-3xl p-8">
          <div className="text-center mb-8">
            <Link to="/" className="text-3xl font-black inline-block mb-2">
              Designeasy
            </Link>
            <h2 className="text-2xl font-bold mb-2">Вход в аккаунт</h2>
            <p className="text-muted-foreground">
              Продолжите обучение дизайну карточек
            </p>
          </div>

          {!showAdminLogin ? (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="glass-effect"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="glass-effect"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full glass-effect hover-lift"
                  disabled={isLoading}
                >
                  {isLoading ? 'Вход...' : 'Войти'}
                </Button>
              </form>

              <div className="mt-6 text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  Нет аккаунта?{' '}
                  <Link to="/register" className="text-accent hover:underline">
                    Зарегистрироваться
                  </Link>
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdminLogin(true)}
                  className="gap-2"
                >
                  <Icon name="Shield" size={16} />
                  Вход для администратора
                </Button>
              </div>
            </>
          ) : (
            <>
              <form onSubmit={handleAdminSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adminUsername">Имя пользователя</Label>
                  <Input
                    id="adminUsername"
                    type="text"
                    placeholder="admin"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    required
                    className="glass-effect"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminPassword">Пароль</Label>
                  <Input
                    id="adminPassword"
                    type="password"
                    placeholder="••••••••"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                    className="glass-effect"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full glass-effect hover-lift"
                  disabled={isLoading}
                >
                  {isLoading ? 'Вход...' : 'Войти как администратор'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdminLogin(false)}
                  className="gap-2"
                >
                  <Icon name="ArrowLeft" size={16} />
                  Обычный вход
                </Button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}