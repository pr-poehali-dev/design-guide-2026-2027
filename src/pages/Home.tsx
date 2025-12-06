import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const sections = [
  {
    id: 'typography',
    title: 'Типографика',
    description: 'Изучите основы шрифтового дизайна, правила подбора и сочетания шрифтов для карточек товаров',
    icon: 'Type',
  },
  {
    id: 'composition',
    title: 'Композиция',
    description: 'Освойте принципы расположения элементов, баланс и акценты в дизайне карточек',
    icon: 'Layout',
  },
  {
    id: 'coloristics',
    title: 'Колористика',
    description: 'Научитесь работать с цветом, создавать гармоничные палитры и привлекать внимание покупателей',
    icon: 'Palette',
  },
  {
    id: 'card-styles',
    title: 'Стили карточек',
    description: 'Познакомьтесь с различными стилями оформления карточек для разных категорий товаров',
    icon: 'Grid3x3',
  },
  {
    id: 'theory',
    title: 'Теория дизайна',
    description: 'Узнайте фундаментальные принципы визуального дизайна и психологию восприятия',
    icon: 'BookOpen',
  },
];

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSectionClick = (sectionId: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!user?.hasSubscription && !user?.isAdmin) {
      navigate('/subscribe');
      return;
    }

    navigate(`/${sectionId}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 animated-gradient -z-10" />
      
      <div className="relative z-10">
        <Navigation />

        <main className="container mx-auto px-4 py-12">
          <section
            className={`max-w-4xl mx-auto mb-16 transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="glass-effect p-8 md:p-12 rounded-3xl bg-slate-50">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Станьте профессиональным дизайнером карточек для маркетплейсов
              </h1>
              
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  В эпоху электронной коммерции качество визуального оформления товара напрямую влияет на продажи. 
                  Профессиональный дизайнер карточек для маркетплейсов — это востребованная специальность с высоким 
                  доходом и возможностью удаленной работы.
                </p>
                
                <p>
                  <strong>Наш обучающий сайт-гид</strong> создан для тех, кто хочет освоить новую профессию с нуля или 
                  систематизировать имеющиеся знания. Мы собрали весь необходимый материал, структурировали его по темам 
                  и подготовили практические примеры.
                </p>
                
                <p>
                  Вы научитесь создавать карточки, которые привлекают внимание покупателей, выделяются среди конкурентов 
                  и увеличивают конверсию. Каждый раздел содержит теоретическую базу, примеры работ и практические 
                  рекомендации от действующих специалистов.
                </p>
                
                <div className="flex flex-wrap gap-4 mt-8">
                  {!isAuthenticated ? (
                    <>
                      <Button onClick={() => navigate('/register')} size="lg" className="gap-2">
                        <Icon name="Sparkles" size={20} />
                        Начать обучение
                      </Button>
                      <Button onClick={() => navigate('/login')} variant="outline" size="lg">
                        Войти
                      </Button>
                    </>
                  ) : !user?.hasSubscription && !user?.isAdmin ? (
                    <Button onClick={() => navigate('/subscribe')} size="lg" className="gap-2">
                      <Icon name="Crown" size={20} />
                      Купить подписку
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Разделы обучения</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  className={`glass-effect p-6 rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => handleSectionClick(section.id)}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                      <Icon name={section.icon} size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                      <p className="text-sm opacity-80">{section.description}</p>
                    </div>
                  </div>
                  
                  {!user?.hasSubscription && !user?.isAdmin && (
                    <div className="flex items-center gap-2 text-sm text-yellow-400 mt-4">
                      <Icon name="Lock" size={16} />
                      <span>Требуется подписка</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}