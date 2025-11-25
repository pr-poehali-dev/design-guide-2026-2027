import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/icon';
import { LucideIcon } from 'lucide-react';

interface CourseCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
  index: number;
}

export default function CourseCard({ title, description, icon, link, index }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={link}>
        <div className="group relative p-8 rounded-3xl glass-effect hover-lift cursor-pointer h-full">
          <div className="mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon name={icon} size={32} className="text-primary" />
            </div>
          </div>

          <h3 className="text-2xl font-black mb-3">{title}</h3>
          <p className="text-muted-foreground text-base leading-relaxed">
            {description}
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary">
            Начать обучение
            <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
