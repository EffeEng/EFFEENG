import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, userRole, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="EFFE Engenharia e Construções" 
              className="h-12 mr-3"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/120x48/0078BE/FFFFFF?text=EFFE';
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-[var(--primary)] font-medium">
              Início
            </Link>
            <Link to="/quem-somos" className="text-gray-700 hover:text-[var(--primary)] font-medium">
              Quem Somos
            </Link>
            <Link to="/servicos" className="text-gray-700 hover:text-[var(--primary)] font-medium">
              Serviços
            </Link>
            <Link to="/projetos" className="text-gray-700 hover:text-[var(--primary)] font-medium">
              Projetos
            </Link>
            <Link to="/contato" className="text-gray-700 hover:text-[var(--primary)] font-medium">
              Contato
            </Link>
            
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-[var(--primary)] font-medium">
                  Minha Conta
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  {userRole === 'admin' ? (
                    <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Painel Administrativo
                    </Link>
                  ) : (
                    <Link to="/cliente" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Meu Painel
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sair
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="bg-[var(--primary)] text-white px-4 py-2 rounded hover:bg-[var(--primary-dark)] transition-colors">
                Acessar
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="mt-4 md:hidden">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-[var(--primary)] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                Início
              </Link>
              <Link to="/quem-somos" className="text-gray-700 hover:text-[var(--primary)] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                Quem Somos
              </Link>
              <Link to="/servicos" className="text-gray-700 hover:text-[var(--primary)] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                Serviços
              </Link>
              <Link to="/projetos" className="text-gray-700 hover:text-[var(--primary)] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                Projetos
              </Link>
              <Link to="/contato" className="text-gray-700 hover:text-[var(--primary)] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                Contato
              </Link>
              
              {isAuthenticated ? (
                <>
                  {userRole === 'admin' ? (
                    <Link to="/admin" className="text-gray-700 hover:text-[var(--primary)] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                      Painel Administrativo
                    </Link>
                  ) : (
                    <Link to="/cliente" className="text-gray-700 hover:text-[var(--primary)] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                      Meu Painel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left text-gray-700 hover:text-[var(--primary)] font-medium py-2"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <Link to="/login" className="bg-[var(--primary)] text-white px-4 py-2 rounded hover:bg-[var(--primary-dark)] transition-colors inline-block" onClick={() => setMobileMenuOpen(false)}>
                  Acessar
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
