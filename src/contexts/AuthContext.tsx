import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  hasSubscription: boolean;
  isAdmin: boolean;
  progress: {
    [key: string]: number;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  adminLogin: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  updateProgress: (sectionId: string, progress: number) => void;
  purchaseSubscription: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const mockUser: User = {
      id: '1',
      email,
      name: 'Пользователь',
      role: 'user',
      hasSubscription: false,
      isAdmin: false,
      progress: {},
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const register = async (email: string, name: string, password: string) => {
    const mockUser: User = {
      id: '1',
      email,
      name,
      role: 'user',
      hasSubscription: false,
      isAdmin: false,
      progress: {},
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const adminLogin = async (username: string, password: string): Promise<boolean> => {
    if (username === 'admin' && password === '123456') {
      const adminUser: User = {
        id: 'admin',
        email: 'admin@site.com',
        name: 'Администратор',
        role: 'admin',
        hasSubscription: true,
        isAdmin: true,
        progress: {},
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return true;
    }
    return false;
  };

  const updateProgress = (sectionId: string, progress: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        progress: {
          ...user.progress,
          [sectionId]: progress,
        },
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const purchaseSubscription = () => {
    if (user) {
      const updatedUser = {
        ...user,
        hasSubscription: true,
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    adminLogin,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
    updateProgress,
    purchaseSubscription,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}