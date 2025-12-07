import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import Navigation from '@/components/Navigation';
import ProgressBar from '@/components/ProgressBar';
import Icon from '@/components/ui/icon';

const designers = [
  {
    id: 1,
    name: 'Анна Михайлова',
    avatar: 'https://cdn.poehali.dev/projects/yc.edadeal-ugc.storage.yandexcloud.net/bucket/designer1.jpg',
    description: 'Топовый дизайнер инфографики с 5-летним опытом работы на маркетплейсах. Специализируется на дизайне карточек для электроники и бытовой техники.',
    videoPlaceholder: 'Видео: Создание эффектной карточки для смартфона',
  },
  {
    id: 2,
    name: 'Дмитрий Соколов',
    avatar: 'https://cdn.poehali.dev/projects/yc.edadeal-ugc.storage.yandexcloud.net/bucket/designer2.jpg',
    description: 'Эксперт по дизайну для категории красота и здоровье. Работал с крупнейшими брендами косметики. Умеет создавать премиальные карточки.',
    videoPlaceholder: 'Видео: Премиальный дизайн для косметики',
  },
  {
    id: 3,
    name: 'Елена Волкова',
    avatar: 'https://cdn.poehali.dev/projects/yc.edadeal-ugc.storage.yandexcloud.net/bucket/designer3.jpg',
    description: 'Специалист по дизайну для детских товаров и игрушек. Создает яркие, привлекательные карточки, которые увеличивают конверсию в 2-3 раза.',
    videoPlaceholder: 'Видео: Яркая карточка для детских игрушек',
  },
];

export default function VideoTutorials() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { markSectionAsVisited } = useProgress();

  useEffect(() => {
    if (!user?.hasSubscription && !user?.isAdmin) {
      navigate('/subscribe');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user?.hasSubscription || user?.isAdmin) {
      markSectionAsVisited('video-tutorials');
    }
  }, [user, markSectionAsVisited]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 -z-10 animated-gradient" />
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <h1 className="mb-6">Видеоуроки</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Посмотрите эксклюзивные видеоуроки от топовых дизайнеров и создайте работы в портфолио
            </p>
          </motion.div>

          <div className="space-y-12">
            {designers.map((designer, index) => (
              <motion.div
                key={designer.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="glass-effect rounded-3xl p-8 bg-slate-50"
              >
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                      {designer.avatar ? (
                        <img 
                          src={designer.avatar} 
                          alt={designer.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.textContent = designer.name.split(' ').map(n => n[0]).join('');
                          }}
                        />
                      ) : (
                        designer.name.split(' ').map(n => n[0]).join('')
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="mb-3">{designer.name}</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {designer.description}
                    </p>
                  </div>
                </div>

                <div className="bg-background/80 rounded-2xl overflow-hidden mb-6">
                  <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <div className="text-center">
                      <Icon name="Video" size={64} className="mx-auto mb-4 text-purple-400" />
                      <p className="text-lg font-medium text-muted-foreground">
                        {designer.videoPlaceholder}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-2xl p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon name="FileDown" size={20} className="text-purple-500" />
                    <span className="font-medium">Материалы для повторения</span>
                  </div>
                  <div className="px-4 py-2 bg-muted rounded-lg text-sm text-muted-foreground">
                    Скоро
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      {(user?.hasSubscription || user?.isAdmin) && <ProgressBar />}
    </div>
  );
}