import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ProgressContextType {
  visitedSections: string[];
  markSectionAsVisited: (sectionId: string) => void;
  getProgress: () => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const TOTAL_SECTIONS = 6;

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [visitedSections, setVisitedSections] = useState<string[]>(() => {
    const stored = localStorage.getItem('course-progress');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('course-progress', JSON.stringify(visitedSections));
  }, [visitedSections]);

  const markSectionAsVisited = (sectionId: string) => {
    setVisitedSections((prev) => {
      if (prev.includes(sectionId)) return prev;
      return [...prev, sectionId];
    });
  };

  const getProgress = () => {
    return Math.round((visitedSections.length / TOTAL_SECTIONS) * 100);
  };

  return (
    <ProgressContext.Provider value={{ visitedSections, markSectionAsVisited, getProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
}
