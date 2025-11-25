import { motion } from 'framer-motion';
import Header from '@/components/Header';
import CourseCard from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const courses = [
  {
    title: 'Композиция',
    description: 'Виды симметрии в карточках, визуальный вес элементов, фокусные центры и направляющие',
    icon: 'Layout',
    link: '/composition',
  },
  {
    title: 'Типографика',
    description: 'Кернинг, трекинг, интерлиньяж, начертания, виды шрифтов и правила их использования',
    icon: 'Type',
    link: '/typography',
  },
  {
    title: 'Колористика',
    description: 'Теория цвета, цветовые схемы, правильные сочетания и распространенные ошибки',
    icon: 'Palette',
    link: '/coloristics',
  },
  {
    title: 'Стили карточек',
    description: 'Минимализм, абстракционизм, реализм, неореализм для маркетплейсов',
    icon: 'Image',
    link: '/card-styles',
  },
  {
    title: 'Теория инфографики',
    description: 'Размеры для маркетплейсов, программы для создания, полезные ресурсы',
    icon: 'BookOpen',
    link: '/theory',
  },
];

export default function Index() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 -z-10 animated-gradient opacity-10" />
      
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto text-center mb-32"
          >
            <h1 className="mb-8 leading-none">
              Дизайн карточек
              <br />
              для маркетплейсов
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                легко
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Научитесь создавать эффективные карточки товаров с нуля. 
              Теория + практика с интерактивными заданиями.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Button size="lg" asChild className="glass-effect hover-lift text-lg px-8 py-6 rounded-2xl">
                <Link to="#courses">К программе</Link>
              </Button>
            </div>
          </motion.section>

          <section id="courses" className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="mb-6">Что вы изучите</h2>
              <p className="text-xl text-muted-foreground max-w-3xl">
                5 комплексных разделов с теорией и практикой. Каждый урок включает 
                интерактивные упражнения для закрепления навыков.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <CourseCard key={course.title} {...course} index={index} />
              ))}
            </div>
          </section>

          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 max-w-4xl mx-auto"
          >
            <div className="glass-effect rounded-3xl p-12 text-center">
              <h2 className="mb-6">Готовы начать?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Получите доступ ко всем материалам курса за 2000₽
              </p>
              <Button size="lg" asChild className="glass-effect hover-lift text-lg px-12 py-6 rounded-2xl">
                <Link to="/subscribe">Купить подписку</Link>
              </Button>
            </div>
          </motion.section>
        </div>
      </main>

      <footer className="border-t py-12 mt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="text-2xl font-black mb-2">Designeasy</div>
              <p className="text-sm text-muted-foreground">
                Образовательная платформа для дизайнеров маркетплейсов
              </p>
            </div>
            
            <div className="flex gap-8">
              <Link to="/contacts" className="text-sm hover:text-accent transition-colors">
                Контакты
              </Link>
              <Link to="/search" className="text-sm hover:text-accent transition-colors">
                Поиск
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
