import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { serviceOrderService } from '../../services/api';

const ClientOrders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

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

  // Filtrar ordens com base no status selecionado
  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Minhas Ordens de Serviço</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-[var(--primary)] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setFilter('all')}
          >
            Todas
          </button>
          <button
            className={`px-4 py-2 rounded-md ${filter === 'aberta' ? 'bg-[var(--primary)] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setFilter('aberta')}
          >
            Abertas
          </button>
          <button
            className={`px-4 py-2 rounded-md ${filter === 'em_andamento' ? 'bg-[var(--primary)] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setFilter('em_andamento')}
          >
            Em Andamento
          </button>
          <button
            className={`px-4 py-2 rounded-md ${filter === 'concluída' ? 'bg-[var(--primary)] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setFilter('concluída')}
          >
            Concluídas
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">
            <p>Carregando ordens de serviço...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-6 text-center">
            <p>Nenhuma ordem de serviço encontrada com o filtro selecionado.</p>
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
                    Última Atualização
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(order.updated_at).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link to={`/cliente/ordens/${order.id}`} className="text-[var(--primary)] hover:text-[var(--primary-dark)]">
                        Ver detalhes
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientOrders;
