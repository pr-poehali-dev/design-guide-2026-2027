import { useProgress } from '@/contexts/ProgressContext';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/icon';

export default function ProgressBar() {
  const { getProgress } = useProgress();
  const progress = getProgress();

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 glass-effect rounded-2xl p-3 md:p-4 shadow-lg max-w-[280px] md:max-w-xs">
      <div className="flex items-center gap-2 md:gap-3 mb-2">
        <Icon name="TrendingUp" size={18} className="text-purple-500 flex-shrink-0" />
        <span className="font-semibold text-xs md:text-sm">Прогресс изучения</span>
      </div>
      
      <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden mb-2">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <p className="text-xs text-muted-foreground text-right">
        {progress}% завершено
      </p>
    </div>
  );
}