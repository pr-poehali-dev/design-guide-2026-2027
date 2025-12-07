import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from '@/contexts/ProgressContext';
import Navigation from "@/components/Navigation";
import ProgressBar from '@/components/ProgressBar';
import Icon from "@/components/ui/icon";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageCarousel from "@/components/ImageCarousel";

export default function Typography() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { markSectionAsVisited } = useProgress();

  useEffect(() => {
    if (!user?.hasSubscription && !user?.isAdmin) {
      navigate("/subscribe");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user?.hasSubscription || user?.isAdmin) {
      markSectionAsVisited('typography');
    }
  }, [user, markSectionAsVisited]);

  const [kerning, setKerning] = useState([0]);
  const [tracking, setTracking] = useState([0]);
  const [lineHeight, setLineHeight] = useState([1.5]);

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
            <p className="text-xl text-muted-foreground">
              Работа с текстом, один из важнейших аспектов грамотного дизайна.
              Правильная работа со шрифтами помогает быстро и понятно донести
              важную информацию до покупателя
            </p>
          </motion.div>

          <div className="glass-effect rounded-3xl p-8 bg-slate-50 mb-12">
            <h2 className="mb-6">Зачем изучать типографику?</h2>
            <p className="text-lg mb-8">
              В дизайне, особенно в инфографике для маркетплейсов, где важна конверсия, типографика:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-6 bg-background/60 rounded-2xl">
                <Icon name="Eye" size={32} className="text-purple-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Управляет вниманием</h3>
                  <p className="text-muted-foreground">Ведет взгляд по ключевым данным — цена, выгода, особенности</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-background/60 rounded-2xl">
                <Icon name="Layers" size={32} className="text-pink-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Создает иерархию</h3>
                  <p className="text-muted-foreground">Показывает, что важнее: заголовок → подзаголовок → текст</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-background/60 rounded-2xl">
                <Icon name="Shield" size={32} className="text-purple-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Формирует доверие</h3>
                  <p className="text-muted-foreground">Профессиональная работа со шрифтами повышает качество восприятия</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-background/60 rounded-2xl">
                <Icon name="Sparkles" size={32} className="text-pink-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Передает настроение</h3>
                  <p className="text-muted-foreground">Шрифт может быть динамичным, надежным, роскошным или дружелюбным</p>
                </div>
              </div>
            </div>
          </div>

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
                <p className="text-lg mb-8 font-normal">
                  Расстояние между двумя конкретными буквами в слове
                </p>

                <div className="bg-background/60 rounded-2xl p-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Icon name="AlertCircle" size={24} className="text-purple-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold mb-1">Главное правило</p>
                        <p className="text-muted-foreground">Кернинг обязателен для всех крупных надписей: заголовков, логотипов, ключевых цифр</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Eye" size={24} className="text-pink-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold mb-1">Как проверять</p>
                        <p className="text-muted-foreground">Прищурьтесь или отведите взгляд. Пробелы между буквами должны казаться одинаковыми</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Lightbulb" size={24} className="text-purple-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold mb-1">Простое упражнение</p>
                        <p className="text-muted-foreground">Читайте слово задом наперед. Это помогает сфокусироваться на форме и расстояниях</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="text-center p-6 rounded-2xl bg-[#ffffff]">
                    <div className="text-sm text-muted-foreground mb-2">
                      Отрицательный
                    </div>
                    <div
                      className="text-3xl font-bold"
                      style={{ letterSpacing: "-0.05em" }}
                    >
                      ПРИМЕР
                    </div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-[#ffffff]">
                    <div className="text-sm text-muted-foreground mb-2">
                      Стандартный
                    </div>
                    <div
                      className="text-3xl font-bold"
                      style={{ letterSpacing: "0" }}
                    >
                      ПРИМЕР
                    </div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-[#ffffff]">
                    <div className="text-sm text-muted-foreground mb-2">
                      Положительный
                    </div>
                    <div
                      className="text-3xl font-bold"
                      style={{ letterSpacing: "0.1em" }}
                    >
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
                      <span className="text-sm min-w-32">
                        Кернинг: {kerning[0].toFixed(2)}em
                      </span>
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
                  Равномерное увеличение или уменьшение пробелов между всеми
                  символами в выделенном фрагменте
                </p>

                <div className="bg-background/60 rounded-2xl p-6 mb-8">
                  <h3 className="font-semibold mb-4">Правила трекинга:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Icon name="ArrowUp" size={20} className="text-purple-500 flex-shrink-0 mt-1" />
                      <p>Увеличивайте для ЗАГОЛОВКОВ, написанных ЗАГЛАВНЫМИ БУКВАМИ (КАПСОМ), чтобы улучшить читаемость</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="ArrowDown" size={20} className="text-pink-500 flex-shrink-0 mt-1" />
                      <p>Уменьшайте очень аккуратно и минимально для плотных заголовков, если шрифт изначально слишком "воздушный"</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Minus" size={20} className="text-purple-500 flex-shrink-0 mt-1" />
                      <p>Для основного текста почти всегда оставляйте трекинг "по умолчанию" (0)</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="text-center p-6 rounded-2xl bg-[#ffffff]">
                    <div className="text-sm text-muted-foreground mb-2">
                      Плотный
                    </div>
                    <div
                      className="text-2xl"
                      style={{ letterSpacing: "-0.03em" }}
                    >
                      дизайн карточек
                    </div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-[#ffffff]">
                    <div className="text-sm text-muted-foreground mb-2">
                      Нормальный
                    </div>
                    <div className="text-2xl" style={{ letterSpacing: "0" }}>
                      дизайн карточек
                    </div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-[#ffffff]">
                    <div className="text-sm text-muted-foreground mb-2">
                      Разреженный
                    </div>
                    <div
                      className="text-2xl"
                      style={{ letterSpacing: "0.1em" }}
                    >
                      дизайн карточек
                    </div>
                  </div>
                </div>

                <div className="bg-background/50 rounded-2xl p-8">
                  <h3 className="mb-6 font-semibold">Интерактивный пример:</h3>
                  <div
                    className="text-3xl mb-8 text-center"
                    style={{ letterSpacing: `${tracking[0]}em` }}
                  >
                    Эффективные карточки для маркетплейсов создаются с учетом
                    композиции и цвета
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-sm min-w-32">
                        Трекинг: {tracking[0].toFixed(2)}em
                      </span>
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
                  Расстояние между базовыми линиями соседних строк текста
                </p>

                <div className="bg-background/60 rounded-2xl p-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Icon name="Info" size={24} className="text-purple-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold mb-1">Правило</p>
                        <p className="text-muted-foreground">Чем длиннее строка и мельче шрифт — тем больше интерлиньяж (120–150%)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="CheckCircle" size={24} className="text-pink-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold mb-1">Как проверить</p>
                        <p className="text-muted-foreground">Текст должен "дышать", строки не касаются друг друга</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="text-center p-6 rounded-2xl bg-[#ffffff]">
                    <div className="text-sm text-muted-foreground mb-2">
                      Малый (1.2)
                    </div>
                    <div className="text-base" style={{ lineHeight: "1.2" }}>
                      Текст с маленьким интерлиньяжем может быть трудным для чтения
                    </div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-[#ffffff]">
                    <div className="text-sm text-muted-foreground mb-2">
                      Оптимальный (1.5)
                    </div>
                    <div className="text-base" style={{ lineHeight: "1.5" }}>
                      Оптимальный интерлиньяж делает текст комфортным для чтения
                    </div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-[#ffffff]">
                    <div className="text-sm text-muted-foreground mb-2">
                      Большой (2.0)
                    </div>
                    <div className="text-base" style={{ lineHeight: "2.0" }}>
                      Слишком большой интерлиньяж разрывает связность текста
                    </div>
                  </div>
                </div>

                <div className="bg-background/50 rounded-2xl p-8">
                  <h3 className="mb-6 font-semibold">Интерактивный пример:</h3>
                  <div
                    className="text-xl mb-8 max-w-3xl mx-auto"
                    style={{ lineHeight: lineHeight[0] }}
                  >
                    Правильный интерлиньяж критически важен для удобства чтения.
                    Слишком малое расстояние между строками затрудняет восприятие
                    текста, а слишком большое — разрывает визуальную связь между
                    строками. Найдите баланс, который делает текст комфортным для
                    чтения.
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-sm min-w-32">
                        Интерлиньяж: {lineHeight[0].toFixed(1)}
                      </span>
                      <Slider
                        value={lineHeight}
                        onValueChange={setLineHeight}
                        min={1}
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
                  Варианты толщины и стиля шрифта в рамках одного семейства
                </p>

                <div className="bg-background/60 rounded-2xl p-6 mb-8">
                  <h3 className="font-semibold mb-4">Правило использования:</h3>
                  <div className="space-y-3">
                    <p>Используйте контраст насыщенности внутри одного семейства для создания иерархии:</p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div className="flex items-start gap-3">
                        <Icon name="Heading" size={20} className="text-purple-500 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-bold">Заголовок/главная цифра</p>
                          <p className="text-sm text-muted-foreground">Bold / ExtraBold</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Type" size={20} className="text-pink-500 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold">Подзаголовок</p>
                          <p className="text-sm text-muted-foreground">Semibold</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="AlignLeft" size={20} className="text-purple-500 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-normal">Основной текст</p>
                          <p className="text-sm text-muted-foreground">Regular</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Minus" size={20} className="text-pink-500 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-light italic">Второстепенное</p>
                          <p className="text-sm text-muted-foreground">Light или Italic</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">* Курсив: использовать ограниченно</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-8 rounded-2xl bg-[#ffffff]">
                    <div className="text-sm text-muted-foreground mb-3">
                      300 - Light
                    </div>
                    <div className="text-4xl font-light">
                      Легкое начертание
                    </div>
                  </div>
                  <div className="p-8 rounded-2xl bg-[#ffffff]">
                    <div className="text-sm text-muted-foreground mb-3">
                      500 - Medium
                    </div>
                    <div className="text-4xl font-medium">
                      Среднее начертание
                    </div>
                  </div>
                  <div className="p-8 rounded-2xl bg-[#ffffff]">
                    <div className="text-sm text-muted-foreground mb-3">
                      600 - Semibold
                    </div>
                    <div className="text-4xl font-semibold">
                      Полужирное
                    </div>
                  </div>
                  <div className="p-8 rounded-2xl bg-[#ffffff]">
                    <div className="text-sm text-muted-foreground mb-3">
                      800 - ExtraBold
                    </div>
                    <div className="text-4xl font-extrabold">
                      Очень жирное
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="fonts" className="space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-12"
              >
                <div className="glass-effect rounded-3xl p-8">
                  <h2 className="mb-4">Антиква (Serif)</h2>
                  <p className="text-lg mb-6 text-muted-foreground">
                    Шрифты с засечками. Ассоциируются с традицией, надежностью, премиальностью
                  </p>
                  <ImageCarousel images={['1', '2', '3']} aspectRatio="3/4" />
                </div>

                <div className="glass-effect rounded-3xl p-8">
                  <h2 className="mb-4">Гротеск (Sans-serif)</h2>
                  <p className="text-lg mb-6 text-muted-foreground">
                    Шрифты без засечек. Современные, чистые, универсальные
                  </p>
                  <ImageCarousel images={['1', '2', '3']} aspectRatio="3/4" />
                </div>

                <div className="glass-effect rounded-3xl p-8">
                  <h2 className="mb-4">Рукописные (Script)</h2>
                  <p className="text-lg mb-6 text-muted-foreground">
                    Имитация письма от руки. Элегантность, индивидуальность, творчество
                  </p>
                  <ImageCarousel images={['1', '2', '3']} aspectRatio="3/4" />
                </div>

                <div className="glass-effect rounded-3xl p-8">
                  <h2 className="mb-4">Декоративные (Display)</h2>
                  <p className="text-lg mb-6 text-muted-foreground">
                    Яркие, необычные шрифты для акцентов. Привлекают внимание, передают настроение
                  </p>
                  <ImageCarousel images={['1', '2', '3']} aspectRatio="3/4" />
                </div>

                <div className="glass-effect rounded-3xl p-8">
                  <h2 className="mb-4">Моноширинные (Monospace)</h2>
                  <p className="text-lg mb-6 text-muted-foreground">
                    Все символы одинаковой ширины. Технический, точный стиль
                  </p>
                  <ImageCarousel images={['1', '2', '3']} aspectRatio="3/4" />
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