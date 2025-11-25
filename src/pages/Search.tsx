import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const searchData = [
  { title: 'Композиция', description: 'Виды симметрии, визуальный вес, фокусные центры', link: '/composition', category: 'Раздел' },
  { title: 'Типографика', description: 'Кернинг, трекинг, интерлиньяж, начертания', link: '/typography', category: 'Раздел' },
  { title: 'Колористика', description: 'Теория цвета, цветовые схемы', link: '/coloristics', category: 'Раздел' },
  { title: 'Стили карточек', description: 'Минимализм, абстракционизм, реализм', link: '/card-styles', category: 'Раздел' },
  { title: 'Теория инфографики', description: 'Размеры, программы, ресурсы', link: '/theory', category: 'Раздел' },
  { title: 'Визуальный вес', description: 'Как элементы привлекают внимание', link: '/composition', category: 'Тема' },
  { title: 'Цветовые схемы', description: 'Монохромная, комплементарная, триадная', link: '/coloristics', category: 'Тема' },
  { title: 'Направляющие', description: 'Сетки для выравнивания элементов', link: '/composition', category: 'Тема' },
];

export default function Search() {
  const [query, setQuery] = useState('');

  const filteredResults = searchData.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 -z-10 animated-gradient opacity-5" />
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="mb-8 text-center">Поиск по курсу</h1>
            
            <div className="glass-effect rounded-2xl p-2">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" 
                />
                <Input
                  type="search"
                  placeholder="Введите что ищете..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-12 h-12 text-lg border-0 bg-transparent"
                />
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            {query === '' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-muted-foreground"
              >
                <Icon name="Search" size={48} className="mx-auto mb-4 opacity-20" />
                <p>Начните вводить запрос для поиска</p>
              </motion.div>
            ) : filteredResults.length > 0 ? (
              filteredResults.map((result, index) => (
                <motion.div
                  key={result.title + result.link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={result.link}>
                    <div className="glass-effect rounded-2xl p-6 hover-lift cursor-pointer">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold">{result.title}</h3>
                            <span className="text-xs bg-accent/20 px-2 py-1 rounded-full">
                              {result.category}
                            </span>
                          </div>
                          <p className="text-muted-foreground">{result.description}</p>
                        </div>
                        <Icon name="ArrowRight" size={20} className="text-muted-foreground flex-shrink-0 mt-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-effect rounded-2xl p-12 text-center"
              >
                <Icon name="SearchX" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground">
                  Попробуйте изменить запрос или воспользуйтесь навигацией
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
