import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Typography() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user?.hasSubscription && !user?.isAdmin) {
      navigate('/subscribe');
    }
  }, [user, navigate]);

  const [kerning, setKerning] = useState([0]);
  const [tracking, setTracking] = useState([0]);
  const [lineHeight, setLineHeight] = useState([1.5]);
  const [fontWeight, setFontWeight] = useState(400);

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
            <h1 className="mb-6">Типографика</h1>
            <p className="text-xl text-muted-foreground">Типографика – работа с текстом, один из важнейших аспектов грамотного дизайна
Помогает быстро и понятно донести важную информацию до покупателя  </p>
          </motion.div>

          <Tabs defaultValue="kerning" className="space-y-12">
            <div className="overflow-x-auto pb-2">
              <TabsList className="glass-effect p-2 w-max">
                <TabsTrigger value="kerning">Кернинг</TabsTrigger>
                <TabsTrigger value="tracking">Трекинг</TabsTrigger>
                <TabsTrigger value="lineheight">Интерлиньяж</TabsTrigger>
                <TabsTrigger value="weight">Начертания</TabsTrigger>
                <TabsTrigger value="fonts">Виды шрифтов</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="kerning" className="space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-effect rounded-3xl p-8"
              >
                <h2 className="mb-4">Кернинг</h2>
                <p className="text-lg mb-8 font-normal">Кернинг —  расстояние между двумя символами в слове.
Правильный кернинг делает текст более читаемым и эстетичным.
</p>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="text-center p-6 rounded-2xl bg-[#ffffff]">
                    <div className="text-sm text-muted-foreground mb-2">Отрицательный</div>
                    <div className="text-3xl font-bold" style={{ letterSpacing: '-0.05em' }}>
                      ПРИМЕР
                    </div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-[#ffffff]">
                    <div className="text-sm text-muted-foreground mb-2">Стандартный</div>
                    <div className="text-3xl font-bold" style={{ letterSpacing: '0' }}>
                      ПРИМЕР
                    </div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-[#ffffff]">
                    <div className="text-sm text-muted-foreground mb-2">Положительный</div>
                    <div className="text-3xl font-bold" style={{ letterSpacing: '0.1em' }}>
                      ПРИМЕР
                    </div>
                  </div>
                </div>

                <div className="bg-background/50 rounded-2xl p-8">
                  <h3 className="mb-6 font-semibold">Интерактивный пример:</h3>
                  <div
                    className="text-5xl font-bold mb-8 text-center"
                    style={{ letterSpacing: `${kerning[0]}em` }}
                  >
                    ТИПОГРАФИКА
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-sm min-w-32">Кернинг: {kerning[0].toFixed(2)}em</span>
                      <Slider
                        value={kerning}
                        onValueChange={setKerning}
                        min={-0.1}
                        max={0.3}
                        step={0.01}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="tracking" className="space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-effect rounded-3xl p-8"
              >
                <h2 className="mb-4">Трекинг</h2>
                <p className="text-lg mb-8">
                  Трекинг — это расстояние между всеми символами в слове. 
                  Влияет на общую плотность и ритм текста.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="text-center p-6 rounded-2xl bg-gray-200">
                    <div className="text-sm text-muted-foreground mb-2">Плотный</div>
                    <div className="text-2xl" style={{ letterSpacing: '-0.03em' }}>
                      дизайн карточек
                    </div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-gray-200">
                    <div className="text-sm text-muted-foreground mb-2">Нормальный</div>
                    <div className="text-2xl" style={{ letterSpacing: '0' }}>
                      дизайн карточек
                    </div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-gray-200">
                    <div className="text-sm text-muted-foreground mb-2">Разреженный</div>
                    <div className="text-2xl" style={{ letterSpacing: '0.1em' }}>
                      дизайн карточек
                    </div>
                  </div>
                </div>

                <div className="bg-background/50 rounded-2xl p-8">
                  <h3 className="mb-6">Практика: настройте трекинг</h3>
                  <div
                    className="text-3xl mb-8 text-center"
                    style={{ letterSpacing: `${tracking[0]}em` }}
                  >
                    Эффективные карточки для маркетплейсов создаются с учетом композиции и цвета
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-sm min-w-32">Трекинг: {tracking[0].toFixed(2)}em</span>
                      <Slider
                        value={tracking}
                        onValueChange={setTracking}
                        min={-0.05}
                        max={0.2}
                        step={0.01}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="lineheight" className="space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-effect rounded-3xl p-8"
              >
                <h2 className="mb-4">Интерлиньяж</h2>
                <p className="text-lg mb-8">
                  Интерлиньяж — это расстояние между строками текста. 
                  Оптимальное значение: 1.2-1.5 от размера шрифта.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="p-6 rounded-2xl bg-gray-200">
                    <div className="text-sm text-muted-foreground mb-2">Плотный (1.0)</div>
                    <div className="text-lg" style={{ lineHeight: '1.0' }}>
                      Дизайн карточек для
                      маркетплейсов требует
                      внимания к деталям
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-gray-200">
                    <div className="text-sm text-muted-foreground mb-2">Оптимальный (1.5)</div>
                    <div className="text-lg" style={{ lineHeight: '1.5' }}>
                      Дизайн карточек для
                      маркетплейсов требует
                      внимания к деталям
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-gray-200">
                    <div className="text-sm text-muted-foreground mb-2">Разреженный (2.0)</div>
                    <div className="text-lg" style={{ lineHeight: '2.0' }}>
                      Дизайн карточек для
                      маркетплейсов требует
                      внимания к деталям
                    </div>
                  </div>
                </div>

                <div className="bg-background/50 rounded-2xl p-8">
                  <h3 className="mb-6">Практика: измените интерлиньяж</h3>
                  <div
                    className="text-2xl mb-8"
                    style={{ lineHeight: lineHeight[0] }}
                  >
                    Правильный интерлиньяж делает текст более читаемым и приятным для глаз.
                    Слишком маленькое расстояние создает ощущение тесноты, 
                    а слишком большое — разрывает визуальную связь между строками.
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-sm min-w-32">Интерлиньяж: {lineHeight[0].toFixed(1)}</span>
                      <Slider
                        value={lineHeight}
                        onValueChange={setLineHeight}
                        min={0.8}
                        max={2.5}
                        step={0.1}
                        className="flex-1"
                      />
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
                <h2 className="mb-4">Начертания шрифта</h2>
                <p className="text-lg mb-8">
                  Начертание — это жирность шрифта. Используется для создания иерархии и акцентов.
                </p>

                <div className="grid md:grid-cols-4 gap-6 mb-12">
                  <div className="text-center p-6 rounded-2xl bg-[#ffffff]">
                    <div className="text-sm text-muted-foreground mb-2">Light (300)</div>
                    <div className="text-3xl" style={{ fontWeight: 300 }}>Аа</div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-[#ffffff]">
                    <div className="text-sm text-muted-foreground mb-2">Regular (400)</div>
                    <div className="text-3xl" style={{ fontWeight: 400 }}>Аа</div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-[#ffffff]">
                    <div className="text-sm text-muted-foreground mb-2">Bold (700)</div>
                    <div className="text-3xl" style={{ fontWeight: 700 }}>Аа</div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-[#ffffff]">
                    <div className="text-sm text-muted-foreground mb-2">Black (900)</div>
                    <div className="text-3xl" style={{ fontWeight: 900 }}>Аа</div>
                  </div>
                </div>

                <div className="rounded-2xl p-8 bg-[#ffffffc2]">
                  <h3 className="mb-6">Практика: выберите начертание</h3>
                  <div
                    className="text-5xl mb-8 text-center"
                    style={{ fontWeight: fontWeight }}
                  >
                    ДИЗАЙН
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {[300, 400, 500, 600, 700, 800, 900].map((weight) => (
                      <Button
                        key={weight}
                        variant={fontWeight === weight ? 'default' : 'outline'}
                        onClick={() => setFontWeight(weight)}
                        className="glass-effect"
                      >
                        {weight}
                      </Button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="fonts" className="space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-effect rounded-3xl p-8"
              >
                <h2 className="mb-4">Виды шрифтов</h2>
                <p className="text-lg mb-8">
                  Различные типы шрифтов используются для разных целей и создают разное настроение.
                </p>

                <div className="space-y-8">
                  <div className="rounded-2xl p-8 bg-gray-200">
                    <h3 className="mb-4">Гротески (Sans-serif)</h3>
                    <p className="text-muted-foreground mb-6">
                      Шрифты без засечек. Современные, чистые, хорошо читаются на экранах. 
                      Идеальны для заголовков и интерфейсов.
                    </p>
                    <div className="text-4xl font-sans font-bold">
                      Современный дизайн
                    </div>
                  </div>

                  <div className="rounded-2xl p-8 bg-gray-200">
                    <h3 className="mb-4">Антиквы (Serif)</h3>
                    <p className="text-muted-foreground mb-6">
                      Шрифты с засечками. Классические, элегантные, располагают к чтению. 
                      Отлично подходят для длинных текстов.
                    </p>
                    <div className="text-4xl font-serif">
                      Элегантная типографика
                    </div>
                  </div>

                  <div className="rounded-2xl p-8 bg-gray-200">
                    <h3 className="mb-4">Декоративные (Display)</h3>
                    <p className="text-muted-foreground mb-6">
                      Художественные шрифты с уникальным характером. 
                      Используются для акцентов и креативных заголовков.
                    </p>
                    <div className="text-4xl font-black tracking-wider">
                      КРЕАТИВНОСТЬ
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