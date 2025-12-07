import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import Navigation from '@/components/Navigation';
import ProgressBar from '@/components/ProgressBar';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ImageCarousel from '@/components/ImageCarousel';

export default function Composition() {
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
      markSectionAsVisited('composition');
    }
  }, [user, markSectionAsVisited]);

  const symmetryTypes = [
    { id: 'vertical', name: 'Вертикальная', description: 'Зеркальное отражение по вертикали' },
    { id: 'horizontal', name: 'Горизонтальная', description: 'Зеркальное отражение по горизонтали' },
    { id: 'radial', name: 'Радиальная', description: 'Симметрия относительно центра' },
    { id: 'diagonal', name: 'Диагональная', description: 'Симметрия по диагонали' },
  ];

  const focalPoints = [
    {
      title: 'Правило третей',
      description: 'Размещайте важные элементы на пересечении линий, делящих изображение на трети',
      icon: 'Grid3x3',
    },
    {
      title: 'Центральная композиция',
      description: 'Главный объект в центре создает симметричную и статичную композицию',
      icon: 'Target',
    },
    {
      title: 'Диагональная композиция',
      description: 'Размещение элементов по диагонали создает динамику и движение',
      icon: 'TrendingUp',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 -z-10 animated-gradient" />
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h1 className="mb-6">Композиция</h1>
            <p className="text-xl text-muted-foreground">
              Научитесь создавать сбалансированные и гармоничные композиции для карточек товаров
            </p>
          </motion.div>

          <Tabs defaultValue="symmetry" className="space-y-12">
            <div className="overflow-x-auto pb-2">
              <TabsList className="glass-effect p-2 w-max">
                <TabsTrigger value="symmetry">Виды симметрии</TabsTrigger>
                <TabsTrigger value="focal">Фокусные центры</TabsTrigger>
                <TabsTrigger value="guides">Направляющие</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="symmetry" className="space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-effect rounded-3xl p-8 bg-slate-50"
              >
                <h2 className="mb-4">Виды симметрии в карточках</h2>
                <p className="text-lg mb-8">
                  Симметрия создает ощущение порядка и баланса. Разные виды симметрии 
                  подходят для разных типов товаров и задач.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {symmetryTypes.map((type) => (
                    <div key={type.id} className="glass-effect rounded-2xl p-6 bg-slate-50">
                      <h3 className="mb-2">{type.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
                      <ImageCarousel images={['1', '2', '3']} aspectRatio="3/4" />
                    </div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="focal" className="space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-effect rounded-3xl p-8"
              >
                <h2 className="mb-4">Фокусные центры</h2>
                <p className="text-lg mb-8">
                  Фокусный центр — это точка, которая первой привлекает внимание зрителя. 
                  Правильное размещение помогает направить взгляд на главное.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  {focalPoints.map((point) => (
                    <div key={point.title} className="p-6 bg-secondary/50 rounded-2xl">
                      <Icon name={point.icon as any} size={32} className="text-purple-500 mb-4" />
                      <h3 className="mb-2">{point.title}</h3>
                      <p className="text-sm text-muted-foreground">{point.description}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-background/50 rounded-2xl p-8">
                  <h3 className="mb-6">Визуализация фокусных центров</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="relative aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden">
                      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                        {Array.from({ length: 9 }, (_, i) => (
                          <div key={i} className="border border-purple-300/30" />
                        ))}
                      </div>
                      <div className="absolute top-1/3 left-1/3 w-4 h-4 bg-purple-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
                      <div className="absolute top-1/3 left-2/3 w-4 h-4 bg-purple-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
                      <div className="absolute top-2/3 left-1/3 w-4 h-4 bg-purple-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
                      <div className="absolute top-2/3 left-2/3 w-4 h-4 bg-purple-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
                      <div className="absolute bottom-4 left-4 bg-background/80 px-3 py-1 rounded-lg text-xs">
                        Правило третей
                      </div>
                    </div>

                    <div className="relative aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 border-2 border-purple-300 rounded-full" />
                        <div className="absolute w-4 h-4 bg-purple-500 rounded-full" />
                      </div>
                      <div className="absolute bottom-4 left-4 bg-background/80 px-3 py-1 rounded-lg text-xs">
                        Центральная
                      </div>
                    </div>

                    <div className="relative aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden">
                      <div className="absolute inset-0">
                        <div className="absolute top-4 left-4 w-20 h-20 bg-purple-200 rounded-lg" />
                        <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-purple-300 rounded-lg" />
                        <div className="absolute bottom-8 right-8 w-24 h-24 bg-purple-500 rounded-lg" />
                        <div className="absolute top-0 left-0 w-full h-full">
                          <svg className="w-full h-full">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="rgb(168, 85, 247)" strokeWidth="2" strokeDasharray="4" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-background/80 px-3 py-1 rounded-lg text-xs">
                        Диагональная
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="guides" className="space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-effect rounded-3xl p-8"
              >
                <h2 className="mb-4">Направляющие и сетки</h2>
                <p className="text-lg mb-8">
                  Направляющие помогают выравнивать элементы и создавать структурированный дизайн
                </p>

                <div className="bg-background/50 rounded-2xl p-8 mb-8">
                  <h3 className="mb-6">Зачем нужны направляющие:</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <Icon name="AlignLeft" size={24} className="text-purple-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold mb-1">Выравнивание</p>
                        <p className="text-sm text-muted-foreground">
                          Все элементы выровнены по единой системе
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Grid3x3" size={24} className="text-pink-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold mb-1">Структура</p>
                        <p className="text-sm text-muted-foreground">
                          Создание четкой иерархии информации
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Maximize2" size={24} className="text-purple-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold mb-1">Отступы</p>
                        <p className="text-sm text-muted-foreground">
                          Контроль расстояний между элементами
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Layers" size={24} className="text-pink-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold mb-1">Консистентность</p>
                        <p className="text-sm text-muted-foreground">
                          Единообразие в серии карточек
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-effect rounded-2xl p-6 bg-slate-50 mb-8">
                  <h3 className="mb-4">Модульная сетка в действии</h3>
                  <ImageCarousel images={['1', '2', '3']} aspectRatio="16/9" />
                </div>

                <div className="bg-background/50 rounded-2xl p-8">
                  <h3 className="mb-6">Практический совет:</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Icon name="Lightbulb" size={24} className="text-purple-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold mb-1">В Figma</p>
                        <p className="text-muted-foreground">
                          Используйте Layout Grid (Shift + G) для создания сетки. 
                          Настройте количество колонок, размер отступов и полей.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Ruler" size={24} className="text-pink-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold mb-1">Направляющие</p>
                        <p className="text-muted-foreground">
                          Протягивайте направляющие с линеек (View → Rulers или Ctrl/Cmd + R) 
                          для точного выравнивания элементов.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      {(user?.hasSubscription || user?.isAdmin) && <ProgressBar />}
    </div>
  );
}