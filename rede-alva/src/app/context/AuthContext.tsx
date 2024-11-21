'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const login = async (email: string, senha: string) => {
    try {
      const response = await fetch('http://localhost:8080/register/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        
        const token = await response.text(); 
        setIsAuthenticated(true);
        localStorage.setItem('authToken', token);
        router.push('/cadastro'); 
      } else {
        const errorMessage = await response.text();
        alert(`Erro no login: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      alert('Erro no servidor. Tente novamente mais tarde.');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    router.push('/login/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
