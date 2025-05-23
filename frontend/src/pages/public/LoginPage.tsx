import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/api';

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await authService.login(email, password);
      login(response.token, response.user.role);
      
      // Redirecionar com base no papel do usuário
      if (response.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/cliente');
      }
    } catch (err: any) {
      console.error('Erro de login:', err);
      setError(err.response?.data?.message || 'Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.');
      setLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await authService.register(username, email, password);
      setActiveTab('login');
      setEmail('');
      setPassword('');
      setUsername('');
      setLoading(false);
      // Mostrar mensagem de sucesso
      alert('Registro realizado com sucesso! Por favor, faça login.');
    } catch (err: any) {
      console.error('Erro de registro:', err);
      setError(err.response?.data?.message || 'Ocorreu um erro ao tentar registrar. Por favor, tente novamente.');
      setLoading(false);
    }
  };
  
  return (
    <div className="py-16 bg-[var(--secondary)]">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex">
            <button
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === 'login'
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === 'register'
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('register')}
            >
              Cadastro
            </button>
          </div>
          
          <div className="p-8">
            {activeTab === 'login' ? (
              <>
                <h2 className="text-2xl font-bold mb-6 text-center">Acesse sua conta</h2>
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                )}
                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                      Senha
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[var(--primary)] text-white py-2 px-4 rounded-md hover:bg-[var(--primary-dark)] transition-colors"
                    disabled={loading}
                  >
                    {loading ? 'Entrando...' : 'Entrar'}
                  </button>
                </form>
                <div className="mt-4 text-center">
                  <a href="#" className="text-[var(--primary)] hover:underline">
                    Esqueceu sua senha?
                  </a>
                </div>
                <div className="mt-6 text-center text-sm text-gray-600">
                  <p>Para fins de demonstração:</p>
                  <p>Cliente: cliente@effe.com / cliente123</p>
                  <p>Admin: admin@effe.com / admin123</p>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6 text-center">Crie sua conta</h2>
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                )}
                <form onSubmit={handleRegister}>
                  <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      placeholder="Seu nome completo"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="register-email" className="block text-gray-700 font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="register-email"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="register-password" className="block text-gray-700 font-medium mb-2">
                      Senha
                    </label>
                    <input
                      type="password"
                      id="register-password"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[var(--primary)] text-white py-2 px-4 rounded-md hover:bg-[var(--primary-dark)] transition-colors"
                    disabled={loading}
                  >
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
