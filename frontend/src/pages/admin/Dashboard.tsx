import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { serviceOrderService, budgetService, reportService, fileService } from '../../services/api';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalBudgets: 0,
    approvedBudgets: 0,
    totalReports: 0,
    totalFiles: 0,
    totalUsers: 5 // Valor fixo para demonstração
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [recentBudgets, setRecentBudgets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Buscar ordens de serviço
        const ordersResponse = await serviceOrderService.getAllOrders();
        const orders = ordersResponse.orders || [];
        
        // Buscar orçamentos
        const budgetsResponse = await budgetService.getAllBudgets();
        const budgets = budgetsResponse.budgets || [];
        
        // Buscar laudos
        const reportsResponse = await reportService.getAllReports();
        const reports = reportsResponse.reports || [];
        
        // Buscar arquivos
        const filesResponse = await fileService.getAllFiles();
        const files = filesResponse.files || [];
        
        // Calcular estatísticas
        const pendingOrders = orders.filter(order => order.status !== 'concluída').length;
        const completedOrders = orders.filter(order => order.status === 'concluída').length;
        const approvedBudgets = budgets.filter(budget => budget.status === 'aprovado').length;
        
        // Atualizar estatísticas
        setStats({
          totalOrders: orders.length,
          pendingOrders,
          completedOrders,
          totalBudgets: budgets.length,
          approvedBudgets,
          totalReports: reports.length,
          totalFiles: files.length,
          totalUsers: 5 // Valor fixo para demonstração
        });
        
        // Ordenar ordens por data de criação (mais recentes primeiro)
        const sortedOrders = [...orders].sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        
        // Ordenar orçamentos por data de criação (mais recentes primeiro)
        const sortedBudgets = [...budgets].sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        
        // Definir ordens e orçamentos recentes (5 mais recentes)
        setRecentOrders(sortedOrders.slice(0, 5));
        setRecentBudgets(sortedBudgets.slice(0, 5));
        
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar dados do dashboard:', err);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Função para obter a classe de cor com base no status da ordem
  const getOrderStatusClass = (status: string) => {
    switch (status) {
      case 'aberta':
        return 'bg-blue-100 text-blue-800';
      case 'em_andamento':
        return 'bg-yellow-100 text-yellow-800';
      case 'concluída':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Função para obter a classe de cor com base no status do orçamento
  const getBudgetStatusClass = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'aprovado':
        return 'bg-green-100 text-green-800';
      case 'rejeitado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Painel Administrativo</h1>
        <div className="text-center py-10">
          <p>Carregando dados do dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Painel Administrativo</h1>
      
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Ordens de Serviço</h3>
            <div className="text-[var(--primary)]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{stats.totalOrders}</div>
          <div className="flex justify-between text-sm">
            <span className="text-green-600">{stats.completedOrders} concluídas</span>
            <span className="text-yellow-600">{stats.pendingOrders} pendentes</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Orçamentos</h3>
            <div className="text-[var(--primary)]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{stats.totalBudgets}</div>
          <div className="flex justify-between text-sm">
            <span className="text-green-600">{stats.approvedBudgets} aprovados</span>
            <span className="text-yellow-600">{stats.totalBudgets - stats.approvedBudgets} pendentes/rejeitados</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Laudos Técnicos</h3>
            <div className="text-[var(--primary)]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{stats.totalReports}</div>
          <div className="text-sm text-gray-500">Total de laudos emitidos</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Usuários</h3>
            <div className="text-[var(--primary)]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{stats.totalUsers}</div>
          <div className="text-sm text-gray-500">Clientes e administradores</div>
        </div>
      </div>
      
      {/* Seção de Atividades Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ordens de Serviço Recentes */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-lg font-semibold">Ordens de Serviço Recentes</h3>
            <Link to="/admin/ordens" className="text-[var(--primary)] hover:underline text-sm">
              Ver todas
            </Link>
          </div>
          
          <div className="p-6">
            {recentOrders.length === 0 ? (
              <div className="text-center py-4">
                <p>Nenhuma ordem de serviço encontrada.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
                    <div>
                      <Link to={`/admin/ordens/${order.id}`} className="font-medium text-gray-900 hover:text-[var(--primary)]">
                        #{order.order_number} - {order.title}
                      </Link>
                      <div className="text-sm text-gray-500">
                        Cliente: {order.client_name || `Cliente ${order.client_id}`}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getOrderStatusClass(order.status)}`}>
                        {order.status === 'aberta' ? 'Aberta' : 
                         order.status === 'em_andamento' ? 'Em Andamento' : 
                         order.status === 'concluída' ? 'Concluída' : order.status}
                      </span>
                      <span className="ml-3 text-xs text-gray-500">
                        {new Date(order.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Orçamentos Recentes */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-lg font-semibold">Orçamentos Recentes</h3>
            <Link to="/admin/orcamentos" className="text-[var(--primary)] hover:underline text-sm">
              Ver todos
            </Link>
          </div>
          
          <div className="p-6">
            {recentBudgets.length === 0 ? (
              <div className="text-center py-4">
                <p>Nenhum orçamento encontrado.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentBudgets.map((budget) => (
                  <div key={budget.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
                    <div>
                      <Link to={`/admin/orcamentos/${budget.id}`} className="font-medium text-gray-900 hover:text-[var(--primary)]">
                        Orçamento #{budget.id}
                      </Link>
                      <div className="text-sm text-gray-500">
                        Ordem: #{budget.service_order_id}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900 mr-3">
                        R$ {budget.value.toFixed(2)}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getBudgetStatusClass(budget.status)}`}>
                        {budget.status === 'pendente' ? 'Pendente' : 
                         budget.status === 'aprovado' ? 'Aprovado' : 
                         budget.status === 'rejeitado' ? 'Rejeitado' : budget.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Links Rápidos */}
      <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Ações Rápidas</h3>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/admin/ordens/nova" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
            <div className="text-[var(--primary)] mr-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <span>Nova Ordem de Serviço</span>
          </Link>
          
          <Link to="/admin/orcamentos/novo" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
            <div className="text-[var(--primary)] mr-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <span>Novo Orçamento</span>
          </Link>
          
          <Link to="/admin/laudos/novo" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
            <div className="text-[var(--primary)] mr-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <span>Novo Laudo Técnico</span>
          </Link>
          
          <Link to="/admin/usuarios" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
            <div className="text-[var(--primary)] mr-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
            </div>
            <span>Gerenciar Usuários</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
