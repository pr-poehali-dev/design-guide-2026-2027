import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

export default function Contacts() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Сообщение отправлено',
      description: 'Мы свяжемся с вами в ближайшее время',
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 -z-10 animated-gradient" />
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <h1 className="mb-6">Контакты</h1>
            <p className="text-xl text-muted-foreground">
              Свяжитесь с нами по любым вопросам
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="glass-effect rounded-3xl p-8">
                <h2 className="mb-6">Напишите нам</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      placeholder="Ваше имя"
                      required
                      className="glass-effect"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="glass-effect"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea
                      id="message"
                      placeholder="Ваше сообщение..."
                      rows={5}
                      required
                      className="glass-effect resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full glass-effect hover-lift">
                    Отправить сообщение
                  </Button>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="glass-effect rounded-3xl p-8">
                <h3 className="mb-6">Наши контакты</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="Mail" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Email</div>
                      <a
                        href="mailto:info@designeasy.ru"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        info@designeasy.ru
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="MessageCircle" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Telegram</div>
                      <a
                        href="https://t.me/designeasy"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        @designeasy
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="Clock" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Время работы</div>
                      <p className="text-muted-foreground">
                        Пн-Пт: 10:00 - 19:00 МСК
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-effect rounded-3xl p-8">
                <h3 className="mb-4">Часто задаваемые вопросы</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold mb-2">Как получить доступ к курсу?</div>
                    <p className="text-sm text-muted-foreground">
                      Оформите подписку, и доступ откроется сразу после оплаты.
                    </p>
                  </div>
                  <div>
                    <div className="font-semibold mb-2">Можно ли вернуть деньги?</div>
                    <p className="text-sm text-muted-foreground">
                      Да, в течение 14 дней без объяснения причин.
                    </p>
                  </div>
                  <div>
                    <div className="font-semibold mb-2">Есть ли сертификат?</div>
                    <p className="text-sm text-muted-foreground">
                      После прохождения всех разделов вы получите сертификат.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}