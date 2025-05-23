import React, { useEffect, useState } from 'react';
import { serviceOrderService } from '../../services/api';

const ClientDashboard: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await serviceOrderService.getClientOrders();
        setOrders(response.orders || []);
        setLoading(false);
      } catch (err: any) {
        console.error('Erro ao buscar ordens de serviço:', err);
        setError('Não foi possível carregar suas ordens de serviço. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Função para obter a classe de cor com base no status
  const getStatusClass = (status: string) => {
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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Painel do Cliente</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-[var(--primary)] mb-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-1">Ordens de Serviço</h3>
          <p className="text-3xl font-bold">{loading ? '...' : orders.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-[var(--primary)] mb-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-1">Laudos Técnicos</h3>
          <p className="text-3xl font-bold">{loading ? '...' : '0'}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-[var(--primary)] mb-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-1">Pagamentos</h3>
          <p className="text-3xl font-bold">{loading ? '...' : '0'}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Ordens de Serviço Recentes</h2>
        </div>
        
        {loading ? (
          <div className="p-6 text-center">
            <p>Carregando ordens de serviço...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="p-6 text-center">
            <p>Você ainda não possui ordens de serviço.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Número
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.order_number}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(order.status)}`}>
                        {order.status === 'aberta' ? 'Aberta' : 
                         order.status === 'em_andamento' ? 'Em Andamento' : 
                         order.status === 'concluída' ? 'Concluída' : order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href={`/cliente/ordens/${order.id}`} className="text-[var(--primary)] hover:text-[var(--primary-dark)]">
                        Ver detalhes
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Atividades Recentes</h2>
        </div>
        <div className="p-6">
          <p className="text-center text-gray-500">Nenhuma atividade recente para exibir.</p>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
