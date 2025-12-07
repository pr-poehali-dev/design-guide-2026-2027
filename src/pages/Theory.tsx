import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const marketplaceSizes = [
  { name: 'Wildberries', sizes: ['900×1200 px', '1080×1440 px'], format: 'JPG, PNG' },
  { name: 'Ozon', sizes: ['1200×1600 px', '900×1200 px'], format: 'JPG, PNG' },
  { name: 'Яндекс.Маркет', sizes: ['900×1200 px', '600×800 px'], format: 'JPG' },
];

const programs = [
  {
    name: 'Figma',
    description: 'Профессиональный инструмент для создания дизайнов',
    pros: ['Работает в браузере', 'Бесплатная версия', 'Удобные компоненты', 'Командная работа'],
    level: 'Рекомендуем',
  },
  {
    name: 'Photoshop',
    description: 'Мощный редактор для работы с изображениями',
    pros: ['Профессиональная обработка фото', 'Множество эффектов', 'Индустриальный стандарт'],
    level: 'Продвинутый',
  },
  {
    name: 'Canva',
    description: 'Простой онлайн-редактор для начинающих',
    pros: ['Очень простой интерфейс', 'Готовые шаблоны', 'Не требует установки'],
    level: 'Для начинающих',
  },
];

const resources = [
  {
    category: 'Нейросети для изображений',
    items: [
      { name: 'Remove.bg', description: 'Удаление фона с изображений' },
      { name: 'Upscale.media', description: 'Увеличение разрешения фото' },
      { name: 'Cleanup.pictures', description: 'Удаление объектов с фото' },
    ],
  },
  {
    category: 'Стоковые фото',
    items: [
      { name: 'Unsplash', description: 'Бесплатные качественные фотографии' },
      { name: 'Pexels', description: 'Большая библиотека бесплатных фото' },
      { name: 'Freepik', description: 'Фото, векторы, иллюстрации' },
    ],
  },
  {
    category: 'Цветовые схемы',
    items: [
      { name: 'Coolors', description: 'Генератор цветовых палитр' },
      { name: 'Adobe Color', description: 'Создание и подбор цветов' },
      { name: 'Color Hunt', description: 'Готовые цветовые палитры' },
    ],
  },
  {
    category: 'Шрифты',
    items: [
      { name: 'Google Fonts', description: 'Бесплатные шрифты для веб и печати' },
      { name: 'Font Squirrel', description: 'Коммерческие бесплатные шрифты' },
      { name: 'DaFont', description: 'Огромная коллекция шрифтов' },
    ],
  },
];

export default function Theory() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user?.hasSubscription && !user?.isAdmin) {
      navigate('/subscribe');
    }
  }, [user, navigate]);

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
            <h1 className="mb-6">Теория инфографики</h1>
            <p className="text-xl text-[#1d1d1d]">Технические требования, программы и полезные ресурсы для создания макетов

Макет – набор изображений состоящий из обложки и технических слайдов товара</p>
          </motion.div>

          <Tabs defaultValue="sizes" className="space-y-12">
            <div className="overflow-x-auto pb-2">
              <TabsList className="glass-effect p-2 w-max">
                <TabsTrigger value="sizes">Размеры карточек</TabsTrigger>
                <TabsTrigger value="programs">Программы</TabsTrigger>
                <TabsTrigger value="resources">Полезные ресурсы</TabsTrigger>
                <TabsTrigger value="essence">Суть инфографики</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="sizes" className="space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-effect rounded-3xl p-8"
              >
                <h2 className="mb-8">Стандартные размеры для маркетплейсов</h2>
                
                <div className="space-y-6">
                  {marketplaceSizes.map((marketplace) => (
                    <div key={marketplace.name} className="bg-secondary/50 rounded-2xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold">{marketplace.name}</h3>
                        <span className="text-sm bg-accent/20 px-3 py-1 rounded-full">
                          {marketplace.format}
                        </span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        {marketplace.sizes.map((size) => (
                          <div
                            key={size}
                            className="bg-background rounded-xl p-4 text-center font-mono"
                          >
                            {size}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-background/50 rounded-2xl p-6">
                  <h3 className="mb-4">Важные требования:</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-accent">•</span>
                      <span>Оптимальное разрешение изображений 72 DPI </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent">•</span>
                      <span>Используйте цветовое пространство sRGB для создания макетов</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent">•</span>
                      <span>Рекомендуемое количество слайдов в макете – не менее 5</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent">•</span>
                      <span>Товар важно изображать достоверно </span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="programs" className="space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-effect rounded-3xl p-8"
              >
                <h2 className="mb-8">Программы для создания макетов</h2>
                
                <div className="space-y-6">
                  {programs.map((program) => (
                    <div key={program.name} className="bg-secondary/50 rounded-2xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{program.name}</h3>
                          <p className="text-muted-foreground">{program.description}</p>
                        </div>
                        <span className="text-xs bg-accent/20 px-3 py-1 rounded-full whitespace-nowrap">
                          {program.level}
                        </span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        {program.pros.map((pro) => (
                          <div key={pro} className="flex items-center gap-2 text-sm">
                            <span className="text-green-600">✓</span>
                            <span>{pro}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-effect rounded-3xl p-8"
              >
                <h2 className="mb-8">Полезные ресурсы для дизайнера</h2>
                
                <div className="space-y-8">
                  {resources.map((section) => (
                    <div key={section.category}>
                      <h3 className="mb-4">{section.category}</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {section.items.map((item) => (
                          <div
                            key={item.name}
                            className="bg-secondary/50 rounded-xl p-4 hover-lift cursor-pointer"
                          >
                            <div className="font-semibold mb-1">{item.name}</div>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="essence" className="space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-effect rounded-3xl p-8"
              >
                <h2 className="mb-8">Что такое инфографика для маркетплейсов?</h2>
                
                <div className="space-y-6">
                  <div className="bg-secondary/50 rounded-2xl p-6">
                    <p className="text-lg leading-relaxed">
                      Инфографика на карточке товара — это визуальное представление информации 
                      о продукте. Она помогает покупателю быстро понять ключевые характеристики 
                      и преимущества товара без долгого чтения текста.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-background/50 rounded-2xl p-6">
                      <h3 className="mb-4 text-green-600">Хорошая инфографика:</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span>✓</span>
                          <span>Понятная за 3-5 секунд</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>✓</span>
                          <span>Выделяет главные преимущества</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>✓</span>
                          <span>Использует иконки и схемы</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>✓</span>
                          <span>Читаема на мобильных устройствах</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>✓</span>
                          <span>Соответствует стилю бренда</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-background/50 rounded-2xl p-6">
                      <h3 className="mb-4 text-destructive">Плохая инфографика:</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span>✗</span>
                          <span>Перегружена информацией</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>✗</span>
                          <span>Мелкий нечитаемый текст</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>✗</span>
                          <span>Низкое качество изображений</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>✗</span>
                          <span>Слишком много цветов</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>✗</span>
                          <span>Противоречивые шрифты</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-accent/10 rounded-2xl p-6">
                    <h3 className="mb-4">Основные элементы инфографики:</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📊</div>
                        <div className="font-semibold mb-1">Данные</div>
                        <p className="text-sm text-muted-foreground">Характеристики товара</p>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl mb-2">🎨</div>
                        <div className="font-semibold mb-1">Визуал</div>
                        <p className="text-sm text-muted-foreground">Иконки, цвета, графика</p>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl mb-2">📝</div>
                        <div className="font-semibold mb-1">Текст</div>
                        <p className="text-sm text-muted-foreground">Короткие пояснения</p>
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