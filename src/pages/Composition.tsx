import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export default function Composition() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user?.hasSubscription && !user?.isAdmin) {
      navigate('/subscribe');
    }
  }, [user, navigate]);

  const [selectedSymmetry, setSelectedSymmetry] = useState<string | null>(null);

  const symmetryTypes = [
    { id: 'vertical', name: 'Вертикальная', description: 'Зеркальное отражение по вертикали' },
    { id: 'horizontal', name: 'Горизонтальная', description: 'Зеркальное отражение по горизонтали' },
    { id: 'radial', name: 'Радиальная', description: 'Симметрия относительно центра' },
    { id: 'diagonal', name: 'Диагональная', description: 'Симметрия по диагонали' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 -z-10 animated-gradient opacity-5" />
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
            <TabsList className="glass-effect p-2">
              <TabsTrigger value="symmetry">Виды симметрии</TabsTrigger>
              <TabsTrigger value="weight">Визуальный вес</TabsTrigger>
              <TabsTrigger value="focal">Фокусные центры</TabsTrigger>
              <TabsTrigger value="guides">Направляющие</TabsTrigger>
            </TabsList>

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

                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {symmetryTypes.map((type) => (
                    <div
                      key={type.id}
                      className="p-6 rounded-2xl hover-lift cursor-pointer bg-gray-200"
                      onClick={() => setSelectedSymmetry(type.id)}
                    >
                      <h3 className="mb-2">{type.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
                      <div className="aspect-square bg-background rounded-xl flex items-center justify-center">
                        {type.id === 'vertical' && (
                          <div className="flex gap-2">
                            <div className="w-16 h-32 bg-gradient-to-r from-accent to-primary rounded-lg" />
                            <div className="w-1 h-32 bg-border" />
                            <div className="w-16 h-32 bg-gradient-to-l from-accent to-primary rounded-lg" />
                          </div>
                        )}
                        {type.id === 'horizontal' && (
                          <div className="flex flex-col gap-2">
                            <div className="w-32 h-16 bg-gradient-to-b from-accent to-primary rounded-lg" />
                            <div className="w-32 h-1 bg-border" />
                            <div className="w-32 h-16 bg-gradient-to-t from-accent to-primary rounded-lg" />
                          </div>
                        )}
                        {type.id === 'radial' && (
                          <div className="relative w-32 h-32">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent to-primary rounded-full" />
                            <div className="absolute inset-4 bg-background rounded-full" />
                            <div className="absolute inset-8 bg-gradient-to-tl from-accent to-primary rounded-full" />
                          </div>
                        )}
                        {type.id === 'diagonal' && (
                          <div className="relative w-32 h-32">
                            <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-lg" />
                            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-accent to-primary rounded-lg" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-full h-px bg-border rotate-45" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl p-8 bg-slate-50">
                  <h3 className="mb-6">Практика: определите тип симметрии</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-6 border-2 border-accent/30 rounded-xl bg-gray-200">
                      <div className="aspect-[3/4] bg-gradient-to-b from-secondary to-background rounded-lg mb-4 flex items-center justify-center">
                        <div className="flex gap-4">
                          <div className="w-20 h-40 bg-primary/20 rounded-lg" />
                          <div className="w-20 h-40 bg-primary/20 rounded-lg" />
                        </div>
                      </div>
                      <p className="text-center text-sm text-muted-foreground">
                        {selectedSymmetry ? `Выбрано: ${symmetryTypes.find(t => t.id === selectedSymmetry)?.name}` : 'Выберите тип симметрии'}
                      </p>
                    </div>
                    <div className="flex flex-col gap-3">
                      {symmetryTypes.map((type) => (
                        <Button
                          key={type.id}
                          variant={selectedSymmetry === type.id ? 'default' : 'outline'}
                          onClick={() => setSelectedSymmetry(type.id)}
                          className="glass-effect justify-start text-left h-auto py-4"
                        >
                          <div>
                            <div className="font-semibold">{type.name}</div>
                            <div className="text-xs text-muted-foreground">{type.description}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="weight" className="space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-effect rounded-3xl p-8"
              >
                <h2 className="mb-4">Визуальный вес элементов</h2>
                <p className="text-lg mb-8">
                  Визуальный вес — это то, насколько элемент привлекает внимание. 
                  Размер, цвет, контраст и насыщенность влияют на вес.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="p-6 bg-secondary/50 rounded-2xl text-center">
                    <div className="text-sm text-muted-foreground mb-4">Легкий вес</div>
                    <div className="flex items-center justify-center h-40">
                      <div className="w-12 h-12 bg-muted/30 rounded-lg" />
                    </div>
                    <p className="text-xs mt-4">Малый размер, светлый цвет</p>
                  </div>
                  <div className="p-6 bg-secondary/50 rounded-2xl text-center">
                    <div className="text-sm text-muted-foreground mb-4">Средний вес</div>
                    <div className="flex items-center justify-center h-40">
                      <div className="w-20 h-20 bg-primary/50 rounded-lg" />
                    </div>
                    <p className="text-xs mt-4">Средний размер и контраст</p>
                  </div>
                  <div className="p-6 bg-secondary/50 rounded-2xl text-center">
                    <div className="text-sm text-muted-foreground mb-4">Тяжелый вес</div>
                    <div className="flex items-center justify-center h-40">
                      <div className="w-32 h-32 bg-gradient-to-br from-accent to-primary rounded-lg shadow-lg" />
                    </div>
                    <p className="text-xs mt-4">Большой размер, яркий цвет</p>
                  </div>
                </div>

                <div className="bg-background/50 rounded-2xl p-8">
                  <h3 className="mb-6">Принципы визуального веса:</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        1
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Размер имеет значение</div>
                        <p className="text-sm text-muted-foreground">
                          Чем больше элемент, тем больше его визуальный вес
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        2
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Цвет и контраст</div>
                        <p className="text-sm text-muted-foreground">
                          Яркие и насыщенные цвета привлекают больше внимания
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        3
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Сложность формы</div>
                        <p className="text-sm text-muted-foreground">
                          Сложные формы весят больше, чем простые геометрические фигуры
                        </p>
                      </div>
                    </div>
                  </div>
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
                  Фокусный центр — это точка, которая первой привлекает взгляд зрителя. 
                  Правильное размещение фокусных центров управляет вниманием покупателя.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-secondary/50 rounded-2xl p-6">
                    <h3 className="mb-4">Правило третей</h3>
                    <div className="aspect-[3/4] bg-background rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                        <div className="border-r border-b border-accent/30" />
                        <div className="border-r border-b border-accent/30" />
                        <div className="border-b border-accent/30" />
                        <div className="border-r border-b border-accent/30" />
                        <div className="border-r border-b border-accent/30" />
                        <div className="border-b border-accent/30" />
                        <div className="border-r border-accent/30" />
                        <div className="border-r border-accent/30" />
                        <div />
                      </div>
                      <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-accent rounded-full animate-pulse" />
                      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-accent rounded-full animate-pulse" />
                      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-accent rounded-full animate-pulse" />
                      <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-accent rounded-full animate-pulse" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      Разместите важные элементы на пересечении линий третей
                    </p>
                  </div>

                  <div className="bg-secondary/50 rounded-2xl p-6">
                    <h3 className="mb-4">Центральная композиция</h3>
                    <div className="aspect-[3/4] bg-background rounded-lg relative overflow-hidden flex items-center justify-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-accent to-primary rounded-full animate-pulse" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      Центральное расположение создает симметрию и баланс
                    </p>
                  </div>
                </div>

                <div className="bg-background/50 rounded-2xl p-8">
                  <h3 className="mb-6">Как создать фокусный центр:</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4">
                      <div className="w-full aspect-square bg-secondary rounded-xl mb-4 flex items-center justify-center">
                        <div className="text-6xl font-black">А</div>
                      </div>
                      <div className="font-semibold mb-2">Контраст</div>
                      <p className="text-sm text-muted-foreground">
                        Используйте контрастные цвета
                      </p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-full aspect-square bg-secondary rounded-xl mb-4 flex items-center justify-center">
                        <div className="text-8xl">•</div>
                      </div>
                      <div className="font-semibold mb-2">Размер</div>
                      <p className="text-sm text-muted-foreground">
                        Сделайте элемент крупнее
                      </p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-full aspect-square bg-secondary rounded-xl mb-4 flex items-center justify-center relative">
                        <div className="w-16 h-16 bg-accent/20 rounded-full animate-pulse absolute" />
                        <div className="w-12 h-12 bg-accent/40 rounded-full animate-pulse absolute" />
                        <div className="w-8 h-8 bg-accent rounded-full absolute" />
                      </div>
                      <div className="font-semibold mb-2">Пространство</div>
                      <p className="text-sm text-muted-foreground">
                        Окружите свободным местом
                      </p>
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
                <h2 className="mb-4">Направляющие</h2>
                <p className="text-lg mb-8">
                  Направляющие помогают выравнивать элементы и создавать структурированные композиции. 
                  Они обеспечивают визуальный порядок и профессиональный вид.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-secondary/50 rounded-2xl p-6">
                    <h3 className="mb-4">Сетка 12 колонок</h3>
                    <div className="aspect-[3/4] bg-background rounded-lg relative overflow-hidden p-4">
                      <div className="grid grid-cols-12 gap-1 h-full">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div key={i} className="bg-accent/10" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      Стандартная сетка для веб и мобильных макетов
                    </p>
                  </div>

                  <div className="bg-secondary/50 rounded-2xl p-6">
                    <h3 className="mb-4">Модульная сетка</h3>
                    <div className="aspect-[3/4] bg-background rounded-lg relative overflow-hidden p-4">
                      <div className="grid grid-cols-4 grid-rows-6 gap-2 h-full">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <div key={i} className="bg-accent/10 rounded" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      Позволяет создавать сложные композиции с ритмом
                    </p>
                  </div>
                </div>

                <div className="bg-background/50 rounded-2xl p-8">
                  <h3 className="mb-6">Зачем нужны направляющие:</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                        ✓
                      </div>
                      <div>
                        <div className="font-semibold mb-2">Точное выравнивание</div>
                        <p className="text-sm text-muted-foreground">
                          Элементы располагаются на одной линии, создавая ощущение порядка
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                        ✓
                      </div>
                      <div>
                        <div className="font-semibold mb-2">Консистентность</div>
                        <p className="text-sm text-muted-foreground">
                          Одинаковые отступы и размеры во всем макете
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                        ✓
                      </div>
                      <div>
                        <div className="font-semibold mb-2">Скорость работы</div>
                        <p className="text-sm text-muted-foreground">
                          Не нужно каждый раз высчитывать расстояния вручную
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
    </div>
  );
}