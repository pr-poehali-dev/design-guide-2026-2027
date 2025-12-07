import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';

const styles = [
  {
    name: 'Минимализм',
    description: 'Чистота, простота, много воздуха. Только самое необходимое.',
    characteristics: [
      'Много белого пространства',
      'Простые шрифты без засечек',
      'Ограниченная цветовая палитра (2-3 цвета)',
      'Четкая типографическая иерархия',
      'Геометрические формы',
    ],
    whenUse: 'Премиум-товары, техника, косметика, ювелирные изделия',
  },
  {
    name: 'Абстракционизм',
    description: 'Яркие формы, динамика, креативность. Привлекает внимание.',
    characteristics: [
      'Геометрические абстрактные фигуры',
      'Смелые цветовые сочетания',
      'Динамичная композиция',
      'Градиенты и текстуры',
      'Нестандартные решения',
    ],
    whenUse: 'Молодежные товары, аксессуары, креативная продукция',
  },
  {
    name: 'Реализм',
    description: 'Детальные фотографии, реалистичная подача товара.',
    characteristics: [
      'Качественная предметная съемка',
      'Естественное освещение',
      'Товар в контексте использования',
      'Реалистичные цвета',
      'Акцент на деталях и текстурах',
    ],
    whenUse: 'Продукты питания, одежда, товары для дома',
  },
  {
    name: 'Неореализм',
    description: 'Микс реальных фото с графическими элементами.',
    characteristics: [
      'Сочетание фото и графики',
      'Стилизованные эффекты',
      'Коллажные композиции',
      'Современная обработка фото',
      'Баланс реализма и креатива',
    ],
    whenUse: 'Спортивные товары, гаджеты, lifestyle-продукты',
  },
];

export default function CardStyles() {
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
            <h1 className="mb-6">Стили карточек для маркетплейсов</h1>
            <p className="text-xl text-muted-foreground">
              Изучите основные стили оформления карточек и выберите подходящий для вашего товара
            </p>
          </motion.div>

          <div className="space-y-8">
            {styles.map((style, index) => (
              <motion.div
                key={style.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-3xl p-8"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="mb-4">{style.name}</h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      {style.description}
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Характеристики:</h3>
                        <ul className="space-y-2">
                          {style.characteristics.map((char) => (
                            <li key={char} className="flex items-start gap-3">
                              <span className="text-accent mt-1">•</span>
                              <span className="text-muted-foreground">{char}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-secondary/50 rounded-xl p-4">
                        <h4 className="font-semibold mb-2">Когда использовать:</h4>
                        <p className="text-sm text-muted-foreground">{style.whenUse}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="aspect-[3/4] bg-secondary/30 rounded-2xl flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <div className="text-4xl mb-2">🎨</div>
                        <div className="text-sm">Пример карточки</div>
                        <div className="text-xs">{style.name}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 glass-effect rounded-3xl p-8"
          >
            <h2 className="mb-6">Как выбрать стиль для своего товара</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Анализ целевой аудитории</div>
                    <p className="text-sm text-muted-foreground">
                      Изучите, какой стиль предпочитает ваша ЦА
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Изучение конкурентов</div>
                    <p className="text-sm text-muted-foreground">
                      Посмотрите, какие стили используют лидеры в вашей нише
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Особенности товара</div>
                    <p className="text-sm text-muted-foreground">
                      Выберите стиль, который лучше всего подчеркнет преимущества
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Тестирование</div>
                    <p className="text-sm text-muted-foreground">
                      Попробуйте разные варианты и выберите лучший по конверсии
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}