import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'client'
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Simulação de chamada à API - será substituída pela integração real
        // const response = await axios.get('/api/admin/users');
        // setUsers(response.data.users);
        
        // Dados simulados para demonstração
        setUsers([
          { id: 1, username: 'Cliente Exemplo', email: 'cliente@effe.com', role: 'client', created_at: '2025-01-15T10:30:00Z' },
          { id: 2, username: 'Administrador', email: 'admin@effe.com', role: 'admin', created_at: '2025-01-10T08:15:00Z' },
          { id: 3, username: 'João Silva', email: 'joao@exemplo.com', role: 'client', created_at: '2025-02-20T14:45:00Z' },
          { id: 4, username: 'Maria Oliveira', email: 'maria@exemplo.com', role: 'client', created_at: '2025-03-05T09:20:00Z' },
          { id: 5, username: 'Carlos Santos', email: 'carlos@exemplo.com', role: 'client', created_at: '2025-03-12T16:10:00Z' }
        ]);
        
        setLoading(false);
      } catch (err: any) {
        console.error('Erro ao buscar usuários:', err);
        setError('Não foi possível carregar a lista de usuários. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Simulação de chamada à API - será substituída pela integração real
      // await axios.post('/api/admin/users', newUserData);
      
      // Simulação de adição de usuário para demonstração
      const newUser = {
        id: users.length + 1,
        ...newUserData,
        created_at: new Date().toISOString()
      };
      
      setUsers([...users, newUser]);
      
      // Limpar formulário e fechar modal
      setNewUserData({
        username: '',
        email: '',
        password: '',
        role: 'client'
      });
      setShowAddUserModal(false);
      
      setLoading(false);
      alert('Usuário adicionado com sucesso!');
    } catch (err: any) {
      console.error('Erro ao adicionar usuário:', err);
      setLoading(false);
      alert('Erro ao adicionar usuário. Por favor, tente novamente.');
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.')) {
      try {
        setLoading(true);
        
        // Simulação de chamada à API - será substituída pela integração real
        // await axios.delete(`/api/admin/users/${userId}`);
        
        // Simulação de exclusão para demonstração
        setUsers(users.filter(user => user.id !== userId));
        
        setLoading(false);
        alert('Usuário excluído com sucesso!');
      } catch (err: any) {
        console.error('Erro ao excluir usuário:', err);
        setLoading(false);
        alert('Erro ao excluir usuário. Por favor, tente novamente.');
      }
    }
  };

  // Filtrar usuários com base no termo de busca
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Usuários</h1>
        <button
          onClick={() => setShowAddUserModal(true)}
          className="bg-[var(--primary)] text-white py-2 px-4 rounded hover:bg-[var(--primary-dark)] transition-colors"
        >
          Adicionar Usuário
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por nome, email ou tipo..."
          className="w-full md:w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">
            <p>Carregando usuários...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-6 text-center">
            <p>Nenhum usuário encontrado com os filtros selecionados.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data de Criação
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">#{user.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.username}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role === 'admin' ? 'Administrador' : 'Cliente'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(user.created_at).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <Link to={`/admin/usuarios/${user.id}`} className="text-[var(--primary)] hover:text-[var(--primary-dark)]">
                          Ver
                        </Link>
                        <Link to={`/admin/usuarios/${user.id}/editar`} className="text-[var(--primary)] hover:text-[var(--primary-dark)]">
                          Editar
                        </Link>
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Modal de Adicionar Usuário */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Adicionar Novo Usuário</h2>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleAddUser}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                  Nome completo *
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  placeholder="Nome do usuário"
                  value={newUserData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  placeholder="email@exemplo.com"
                  value={newUserData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  Senha *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  placeholder="********"
                  value={newUserData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
                  Tipo de Usuário *
                </label>
                <select
                  id="role"
                  name="role"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  value={newUserData.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="client">Cliente</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--primary-dark)]"
                  disabled={loading}
                >
                  {loading ? 'Adicionando...' : 'Adicionar Usuário'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
