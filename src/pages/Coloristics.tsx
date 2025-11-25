import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export default function Coloristics() {
  const [selectedBg, setSelectedBg] = useState('#ffffff');
  const [selectedText, setSelectedText] = useState('#000000');
  const [selectedAccent, setSelectedAccent] = useState('#8b5cf6');

  const colorSchemes = [
    { name: 'Монохромная', colors: ['#1a1a2e', '#16213e', '#0f3460', '#533483', '#e94560'] },
    { name: 'Комплементарная', colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'] },
    { name: 'Триадная', colors: ['#f38181', '#78e08f', '#786fa6', '#f8b500', '#63cdda'] },
    { name: 'Аналоговая', colors: ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe'] },
  ];

  const commonMistakes = [
    {
      title: 'Неоновые цвета',
      wrong: { bg: '#00ff00', text: '#ff00ff' },
      right: { bg: '#10b981', text: '#8b5cf6' },
      description: 'Слишком яркие неоновые цвета режут глаза',
    },
    {
      title: 'Низкий контраст',
      wrong: { bg: '#cccccc', text: '#bbbbbb' },
      right: { bg: '#ffffff', text: '#1a1a1a' },
      description: 'Текст должен хорошо читаться на фоне',
    },
    {
      title: 'Грязные цвета',
      wrong: { bg: '#7a6f5d', text: '#8b7e6a' },
      right: { bg: '#f8f9fa', text: '#212529' },
      description: 'Избегайте мутных, невыразительных оттенков',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 -z-10 animated-gradient opacity-5" />
      <Header />

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
            <TabsList className="glass-effect p-2">
              <TabsTrigger value="theory">Теория цвета</TabsTrigger>
              <TabsTrigger value="schemes">Цветовые схемы</TabsTrigger>
              <TabsTrigger value="mistakes">Частые ошибки</TabsTrigger>
              <TabsTrigger value="practice">Практика</TabsTrigger>
            </TabsList>

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

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="p-6 bg-secondary/50 rounded-2xl">
                    <div className="w-full aspect-square bg-gradient-to-br from-red-500 via-yellow-500 to-blue-500 rounded-xl mb-4" />
                    <h3 className="mb-2">Цветовой круг</h3>
                    <p className="text-sm text-muted-foreground">
                      Основной инструмент для понимания взаимосвязи цветов
                    </p>
                  </div>

                  <div className="p-6 bg-secondary/50 rounded-2xl">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="aspect-square bg-red-500 rounded-lg" />
                      <div className="aspect-square bg-blue-500 rounded-lg" />
                      <div className="aspect-square bg-yellow-500 rounded-lg" />
                    </div>
                    <h3 className="mb-2">Первичные цвета</h3>
                    <p className="text-sm text-muted-foreground">
                      Красный, синий и желтый — основа всех остальных цветов
                    </p>
                  </div>

                  <div className="p-6 bg-secondary/50 rounded-2xl">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="aspect-square bg-orange-500 rounded-lg" />
                      <div className="aspect-square bg-green-500 rounded-lg" />
                      <div className="aspect-square bg-purple-500 rounded-lg" />
                    </div>
                    <h3 className="mb-2">Вторичные цвета</h3>
                    <p className="text-sm text-muted-foreground">
                      Получаются смешиванием первичных цветов
                    </p>
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
                      <div className="grid grid-cols-5 gap-4 mb-4">
                        {scheme.colors.map((color) => (
                          <div
                            key={color}
                            className="aspect-square rounded-xl hover-lift cursor-pointer"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {scheme.colors.map((color) => (
                          <code key={color} className="text-xs px-2 py-1 bg-background rounded">
                            {color}
                          </code>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-background/50 rounded-2xl p-8 mt-8">
                  <h3 className="mb-6">Как выбрать схему:</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center font-bold flex-shrink-0">
                        1
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Монохромная — для элегантности</div>
                        <p className="text-sm text-muted-foreground">
                          Оттенки одного цвета создают спокойный профессиональный вид
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center font-bold flex-shrink-0">
                        2
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Комплементарная — для контраста</div>
                        <p className="text-sm text-muted-foreground">
                          Противоположные цвета привлекают максимум внимания
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center font-bold flex-shrink-0">
                        3
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Триадная — для баланса</div>
                        <p className="text-sm text-muted-foreground">
                          Три равноудаленных цвета создают живую гармонию
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center font-bold flex-shrink-0">
                        4
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Аналоговая — для мягкости</div>
                        <p className="text-sm text-muted-foreground">
                          Соседние цвета на круге выглядят естественно
                        </p>
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
                <h2 className="mb-4">Распространенные ошибки</h2>
                <p className="text-lg mb-8">
                  Учитесь на чужих ошибках — избегайте этих частых проблем в колористике
                </p>

                <div className="space-y-6">
                  {commonMistakes.map((mistake) => (
                    <div key={mistake.title} className="bg-secondary/50 rounded-2xl p-6">
                      <h3 className="mb-4">{mistake.title}</h3>
                      <p className="text-sm text-muted-foreground mb-6">{mistake.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <div className="text-sm font-semibold text-destructive mb-2 flex items-center gap-2">
                            <span>❌</span> Неправильно
                          </div>
                          <div
                            className="aspect-[3/2] rounded-xl p-6 flex items-center justify-center"
                            style={{ backgroundColor: mistake.wrong.bg }}
                          >
                            <div
                              className="text-2xl font-bold"
                              style={{ color: mistake.wrong.text }}
                            >
                              Карточка товара
                            </div>
                          </div>
                          <div className="mt-2 flex gap-2">
                            <code className="text-xs px-2 py-1 bg-background rounded">
                              {mistake.wrong.bg}
                            </code>
                            <code className="text-xs px-2 py-1 bg-background rounded">
                              {mistake.wrong.text}
                            </code>
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-semibold text-green-600 mb-2 flex items-center gap-2">
                            <span>✅</span> Правильно
                          </div>
                          <div
                            className="aspect-[3/2] rounded-xl p-6 flex items-center justify-center"
                            style={{ backgroundColor: mistake.right.bg }}
                          >
                            <div
                              className="text-2xl font-bold"
                              style={{ color: mistake.right.text }}
                            >
                              Карточка товара
                            </div>
                          </div>
                          <div className="mt-2 flex gap-2">
                            <code className="text-xs px-2 py-1 bg-background rounded">
                              {mistake.right.bg}
                            </code>
                            <code className="text-xs px-2 py-1 bg-background rounded">
                              {mistake.right.text}
                            </code>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-background/50 rounded-2xl p-8 mt-8">
                  <h3 className="mb-4">Золотые правила колористики:</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-accent">•</span>
                      <span>Используйте не более 3-5 цветов в одном дизайне</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent">•</span>
                      <span>Проверяйте контраст текста — он должен быть минимум 4.5:1</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent">•</span>
                      <span>Избегайте чистых насыщенных цветов для больших площадей</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent">•</span>
                      <span>Учитывайте психологию цвета при выборе палитры</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="practice" className="space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-effect rounded-3xl p-8"
              >
                <h2 className="mb-4">Интерактивная практика</h2>
                <p className="text-lg mb-8">
                  Экспериментируйте с цветами и создайте свою карточку товара
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="mb-4">Выберите цвета:</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Фон</label>
                        <div className="flex gap-2">
                          {['#ffffff', '#f8f9fa', '#e9ecef', '#1a1a2e', '#16213e'].map((color) => (
                            <button
                              key={color}
                              onClick={() => setSelectedBg(color)}
                              className={`w-12 h-12 rounded-xl hover-lift ${
                                selectedBg === color ? 'ring-2 ring-accent ring-offset-2' : ''
                              }`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Текст</label>
                        <div className="flex gap-2">
                          {['#000000', '#212529', '#495057', '#ffffff', '#f8f9fa'].map((color) => (
                            <button
                              key={color}
                              onClick={() => setSelectedText(color)}
                              className={`w-12 h-12 rounded-xl hover-lift ${
                                selectedText === color ? 'ring-2 ring-accent ring-offset-2' : ''
                              }`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Акцент</label>
                        <div className="flex gap-2">
                          {['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'].map((color) => (
                            <button
                              key={color}
                              onClick={() => setSelectedAccent(color)}
                              className={`w-12 h-12 rounded-xl hover-lift ${
                                selectedAccent === color ? 'ring-2 ring-accent ring-offset-2' : ''
                              }`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4">Предпросмотр карточки:</h3>
                    <div
                      className="aspect-[3/4] rounded-2xl p-6 flex flex-col"
                      style={{ backgroundColor: selectedBg }}
                    >
                      <div className="flex-1 bg-muted/20 rounded-xl mb-4" />
                      <h4
                        className="text-2xl font-bold mb-2"
                        style={{ color: selectedText }}
                      >
                        Название товара
                      </h4>
                      <p
                        className="text-sm mb-4 opacity-70"
                        style={{ color: selectedText }}
                      >
                        Описание товара и его основные характеристики
                      </p>
                      <div className="flex items-center justify-between">
                        <div
                          className="text-xl font-bold"
                          style={{ color: selectedText }}
                        >
                          2 990 ₽
                        </div>
                        <Button
                          size="sm"
                          className="hover-lift"
                          style={{ 
                            backgroundColor: selectedAccent,
                            color: '#ffffff'
                          }}
                        >
                          Купить
                        </Button>
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
