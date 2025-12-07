import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

const sections = [
  { id: 'typography', title: 'Типографика', icon: 'Type' },
  { id: 'composition', title: 'Композиция', icon: 'Layout' },
  { id: 'coloristics', title: 'Колористика', icon: 'Palette' },
  { id: 'card-styles', title: 'Стили карточек', icon: 'Grid3x3' },
  { id: 'theory', title: 'Теория дизайна', icon: 'BookOpen' },
  { id: 'video-tutorials', title: 'Видеоуроки', icon: 'Video' },
];

export default function Profile() {
  const { user, logout, purchaseSubscription } = useAuth();
  const { visitedSections, getProgress } = useProgress();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setMounted(true);
  }, [user, navigate]);

  if (!user) return null;

  const totalProgress = getProgress();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 animated-gradient -z-10" />

      <div className="relative z-10">
        <Navigation />

        <main className="pt-32 pb-20 container mx-auto px-4">
          <div
            className={`max-w-4xl mx-auto transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="glass-effect p-8 rounded-3xl mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                  <p className="opacity-80">{user.email}</p>
                </div>
                <Button onClick={logout} variant="outline" className="gap-2">
                  <Icon name="LogOut" size={18} />
                  Выйти
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-white/10 bg-[#ffffff]">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name={user.hasSubscription ? 'CheckCircle' : 'XCircle'} size={24} />
                    <span className="font-semibold">Статус подписки</span>
                  </div>
                  <p className="text-lg">
                    {user.hasSubscription ? 'Активна' : 'Не активна'}
                  </p>
                  {!user.hasSubscription && !user.isAdmin && (
                    <Button
                      onClick={purchaseSubscription}
                      className="mt-4 gap-2"
                      size="sm"
                    >
                      <Icon name="Crown" size={16} />
                      Купить подписку
                    </Button>
                  )}
                </div>

                <div className="p-4 rounded-xl border border-white/10 bg-[#ffffff]">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name="TrendingUp" size={24} />
                    <span className="font-semibold">Общий прогресс</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={totalProgress} className="flex-1" />
                    <span className="text-lg font-bold">{Math.round(totalProgress)}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-effect p-8 rounded-3xl">
              <h2 className="text-2xl font-bold mb-6">Прогресс по разделам</h2>

              <div className="space-y-4">
                {sections.map((section) => {
                  const isVisited = visitedSections.includes(section.id);
                  
                  return (
                    <div
                      key={section.id}
                      className="p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer bg-[#ffffff]"
                      onClick={() => {
                        if (user.hasSubscription || user.isAdmin) {
                          navigate(`/${section.id}`);
                        } else {
                          navigate('/subscribe');
                        }
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                          <Icon name={section.icon} size={20} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{section.title}</h3>
                        </div>
                        {isVisited ? (
                          <Icon name="CheckCircle" size={24} className="text-green-500" />
                        ) : (
                          <Icon name="Circle" size={24} className="text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {user.isAdmin && (
              <div className="mt-8">
                <Button
                  onClick={() => navigate('/admin')}
                  size="lg"
                  className="w-full gap-2"
                >
                  <Icon name="Settings" size={20} />
                  Админ-панель
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}