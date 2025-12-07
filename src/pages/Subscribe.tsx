import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

export default function Subscribe() {
  const [email, setEmail] = useState('');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const features = [
    'Полный доступ к 5 разделам курса',
    'Интерактивные упражнения',
    'Теория + практика',
    'Примеры работ',
    'Доступ навсегда',
  ];

  const handlePurchase = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    toast({
      title: 'Оплата',
      description: 'Функционал оплаты в разработке',
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 -z-10 animated-gradient" />
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="mb-6">Купить подписку</h1>
            <p className="text-xl text-muted-foreground">
              Получите полный доступ ко всем материалам курса
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-effect rounded-3xl p-12 bg-[#ffffff]"
          >
            <div className="text-center mb-8">
              <div className="text-6xl font-black mb-4">1000₽</div>
              <p className="text-lg text-muted-foreground">
                Единоразовая оплата • Доступ навсегда
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" size={16} className="text-accent" />
                  </div>
                  <span className="text-lg">{feature}</span>
                </motion.div>
              ))}
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="w-full glass-effect hover-lift text-lg py-6">
                  Купить доступ
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-effect">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Оформление подписки</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-muted-foreground">Подписка Designeasy</span>
                      <span className="font-bold text-lg">2000₽</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Доступ ко всем разделам навсегда
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="payment-email">Email для чека</Label>
                      <Input
                        id="payment-email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="glass-effect"
                      />
                      <p className="text-xs text-muted-foreground">
                        На этот email придет чек и подтверждение покупки
                      </p>
                    </div>

                    <Button
                      onClick={handlePurchase}
                      className="w-full glass-effect hover-lift"
                      size="lg"
                    >
                      Перейти к оплате
                    </Button>
                  </div>

                  <div className="text-center text-xs text-muted-foreground">
                    Нажимая на кнопку, вы соглашаетесь с условиями оферты
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Безопасная оплата • Возврат в течение 14 дней
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}