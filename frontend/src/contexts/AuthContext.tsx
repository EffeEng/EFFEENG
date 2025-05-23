import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  token: string | null;
  login: (token: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Verificar se há token salvo ao iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('userRole');
    
    if (storedToken && storedRole) {
      setToken(storedToken);
      setUserRole(storedRole);
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  const login = (token: string, role: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    setToken(token);
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setToken(null);
    setUserRole(null);
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
