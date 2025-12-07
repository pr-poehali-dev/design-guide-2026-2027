import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import Navigation from '@/components/Navigation';
import ProgressBar from '@/components/ProgressBar';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import ImageCarousel from '@/components/ImageCarousel';

export default function Coloristics() {
  const { user } = useAuth();
  const { markSectionAsVisited } = useProgress();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user?.hasSubscription && !user?.isAdmin) {
      navigate('/subscribe');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user?.hasSubscription || user?.isAdmin) {
      markSectionAsVisited('coloristics');
    }
  }, [user, markSectionAsVisited]);

  useEffect(() => {
    if (user?.hasSubscription || user?.isAdmin) {
      markSectionAsVisited('coloristics');
    }
  }, [user, markSectionAsVisited]);

  const [selectedBg, setSelectedBg] = useState('#ffffff');
  const [selectedText, setSelectedText] = useState('#000000');
  const [selectedAccent, setSelectedAccent] = useState('#8b5cf6');

  const colorSchemes = [
    { name: 'Монохромная', colors: ['#1a1a2e', '#16213e', '#0f3460', '#533483', '#e94560'] },
    { name: 'Комплементарная', colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'] },
    { name: 'Триадная', colors: ['#f38181', '#78e08f', '#786fa6', '#f8b500', '#63cdda'] },
  ];

  const commonMistakes = [
    {
      title: 'Неоновые цвета',
      description: 'Слишком яркие неоновые цвета режут глаза',
    },
    {
      title: 'Низкий контраст',
      description: 'Текст должен хорошо читаться на фоне',
    },
    {
      title: 'Грязные цвета',
      description: 'Избегайте мутных, невыразительных оттенков',
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
            <h1 className="mb-6">Колористика</h1>
            <p className="text-xl text-muted-foreground">
              Освойте теорию цвета и научитесь создавать гармоничные цветовые схемы
            </p>
          </motion.div>

          <Tabs defaultValue="theory" className="space-y-12">
            <div className="overflow-x-auto pb-2">
              <TabsList className="glass-effect p-2 w-max">
                <TabsTrigger value="theory">Теория цвета</TabsTrigger>
                <TabsTrigger value="schemes">Цветовые схемы</TabsTrigger>
                <TabsTrigger value="mistakes">Частые ошибки</TabsTrigger>
                <TabsTrigger value="practice">Практика</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="theory" className="space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-effect rounded-3xl p-8"
              >
                <h2 className="mb-4">Основы теории цвета</h2>
                <p className="text-lg mb-8">
                  Понимание цвета — ключ к созданию привлекательных и эффективных дизайнов. 
                  Цвета влияют на эмоции и восприятие информации.
                </p>

                <div className="flex justify-center mb-12">
                  <div className="w-64 h-64">
                    <div className="w-full aspect-square rounded-full bg-gradient-to-br from-red-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 via-purple-500 to-red-500 mb-4" />
                  </div>
                </div>

                <div className="bg-background/50 rounded-2xl p-8">
                  <h3 className="mb-6">Свойства цвета:</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="font-semibold mb-3">Оттенок (Hue)</div>
                      <div className="h-12 rounded-xl bg-gradient-to-r from-red-500 via-green-500 to-blue-500" />
                      <p className="text-sm text-muted-foreground mt-2">
                        Положение цвета на цветовом круге
                      </p>
                    </div>
                    <div>
                      <div className="font-semibold mb-3">Насыщенность (Saturation)</div>
                      <div className="h-12 rounded-xl bg-gradient-to-r from-gray-500 to-blue-500" />
                      <p className="text-sm text-muted-foreground mt-2">
                        Интенсивность цвета — от серого до чистого цвета
                      </p>
                    </div>
                    <div>
                      <div className="font-semibold mb-3">Яркость (Brightness)</div>
                      <div className="h-12 rounded-xl bg-gradient-to-r from-black via-blue-500 to-white" />
                      <p className="text-sm text-muted-foreground mt-2">
                        Количество белого или черного в цвете
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="mb-6 mt-8">Цвет влияет на восприятие</h3>
                <p className="text-lg mb-8">Правильно подобранные цвета влияют на решение о покупке</p>

                <div className="space-y-8">
                  <div className="glass-effect rounded-2xl p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Icon name="Laptop" size={20} />
                      Электроника
                    </h4>
                    <p className="text-muted-foreground mb-4">Синий, фиолетовый, чёрный, серый → доверие и технологичность</p>
                    <ImageCarousel images={['1', '2', '3']} aspectRatio="3/4" />
                  </div>

                  <div className="glass-effect rounded-2xl p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Icon name="Leaf" size={20} />
                      Натуральные товары
                    </h4>
                    <p className="text-muted-foreground mb-4">Зелёный, бежевый, коричневый → экологичность и чистота</p>
                    <ImageCarousel images={['1', '2', '3']} aspectRatio="3/4" />
                  </div>

                  <div className="glass-effect rounded-2xl p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Icon name="Gamepad2" size={20} />
                      Игрушки
                    </h4>
                    <p className="text-muted-foreground mb-4">Яркие основные цвета или пастель → радость и дружелюбие</p>
                    <ImageCarousel images={['1', '2', '3']} aspectRatio="3/4" />
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="schemes" className="space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-effect rounded-3xl p-8"
              >
                <h2 className="mb-4">Цветовые схемы</h2>
                <p className="text-lg mb-8">
                  Проверенные комбинации цветов, которые всегда работают гармонично
                </p>

                <div className="space-y-8">
                  {colorSchemes.map((scheme) => (
                    <div key={scheme.name} className="bg-secondary/50 rounded-2xl p-6">
                      <h3 className="mb-4">{scheme.name}</h3>
                      <div className="grid grid-cols-5 gap-4">
                        {scheme.colors.map((color) => (
                          <div
                            key={color}
                            className="aspect-square rounded-xl hover-lift cursor-pointer"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-background/50 rounded-2xl p-8 mt-8">
                  <h3 className="mb-6">Лайфхаки для работы с цветом:</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Icon name="Palette" size={24} className="text-purple-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold mb-1">Цветовой круг</p>
                        <p className="text-muted-foreground">При подборе цветов пользуйтесь цветовым кругом для гармоничных сочетаний</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Globe" size={24} className="text-pink-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold mb-1">Готовые схемы</p>
                        <p className="text-muted-foreground">Используйте сайты для поиска готовых цветовых схем (Adobe Color, Coolors, Paletton)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="mistakes" className="space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-effect rounded-3xl p-8"
              >
                <h2 className="mb-4">Частые ошибки</h2>
                <p className="text-lg mb-8">
                  Изучите типичные ошибки, чтобы не повторять их в своих работах
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {commonMistakes.map((mistake) => (
                    <div key={mistake.title} className="glass-effect rounded-2xl p-6">
                      <h3 className="mb-4">{mistake.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{mistake.description}</p>
                      <ImageCarousel images={['wrong', 'right']} aspectRatio="3/4" />
                      <div className="mt-3 flex items-center gap-2 text-sm">
                        <Icon name="X" size={16} className="text-red-500" />
                        <span className="text-muted-foreground">Неправильно</span>
                        <Icon name="ArrowRight" size={16} className="mx-2" />
                        <Icon name="Check" size={16} className="text-green-500" />
                        <span className="text-muted-foreground">Правильно</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="practice" className="space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-effect rounded-3xl p-8"
              >
                <h2 className="mb-4">Практика</h2>
                <p className="text-lg mb-8">
                  Поэкспериментируйте с цветами и посмотрите, как они влияют на дизайн карточки товара
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block mb-3 font-semibold">Фон карточки</label>
                      <div className="grid grid-cols-4 gap-3">
                        {['#ffffff', '#f3f4f6', '#1f2937', '#8b5cf6'].map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectedBg(color)}
                            className={`aspect-square rounded-xl hover-lift ${
                              selectedBg === color ? 'ring-4 ring-purple-500' : ''
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block mb-3 font-semibold">Цвет текста</label>
                      <div className="grid grid-cols-4 gap-3">
                        {['#000000', '#4b5563', '#ffffff', '#f3f4f6'].map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectedText(color)}
                            className={`aspect-square rounded-xl hover-lift ${
                              selectedText === color ? 'ring-4 ring-purple-500' : ''
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block mb-3 font-semibold">Акцентный цвет</label>
                      <div className="grid grid-cols-4 gap-3">
                        {['#8b5cf6', '#ec4899', '#10b981', '#f59e0b'].map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectedAccent(color)}
                            className={`aspect-square rounded-xl hover-lift ${
                              selectedAccent === color ? 'ring-4 ring-purple-500' : ''
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        setSelectedBg('#ffffff');
                        setSelectedText('#000000');
                        setSelectedAccent('#8b5cf6');
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Сбросить
                    </Button>
                  </div>

                  <div
                    className="rounded-2xl p-8 transition-colors"
                    style={{ backgroundColor: selectedBg }}
                  >
                    <div className="aspect-square bg-slate-200 rounded-xl mb-4" />
                    <h3
                      className="text-2xl font-bold mb-2"
                      style={{ color: selectedText }}
                    >
                      Название товара
                    </h3>
                    <p
                      className="mb-4 opacity-80"
                      style={{ color: selectedText }}
                    >
                      Краткое описание основных характеристик и преимуществ товара
                    </p>
                    <div className="flex items-center gap-4">
                      <span
                        className="text-3xl font-bold"
                        style={{ color: selectedAccent }}
                      >
                        1 299 ₽
                      </span>
                      <Button
                        style={{ backgroundColor: selectedAccent }}
                        className="text-white"
                      >
                        Купить
                      </Button>
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