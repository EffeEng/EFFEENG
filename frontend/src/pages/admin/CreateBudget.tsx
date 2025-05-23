import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { serviceOrderService, budgetService } from '../../services/api';

const AdminCreateBudget: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('ordem');
  
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [budgetData, setBudgetData] = useState({
    service_order_id: orderId || '',
    value: '',
    description: '',
    status: 'pendente'
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await serviceOrderService.getAllOrders();
        setOrders(response.orders || []);
        setLoadingOrders(false);
      } catch (err) {
        console.error('Erro ao buscar ordens de serviço:', err);
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBudgetData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const formattedData = {
        ...budgetData,
        service_order_id: parseInt(budgetData.service_order_id),
        value: parseFloat(budgetData.value)
      };
      
      await budgetService.createBudget(formattedData);
      
      setLoading(false);
      alert('Orçamento criado com sucesso!');
      navigate(`/admin/ordens/${budgetData.service_order_id}`);
    } catch (err) {
      console.error('Erro ao criar orçamento:', err);
      setLoading(false);
      alert('Erro ao criar orçamento. Por favor, tente novamente.');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Novo Orçamento</h1>
        <Link to="/admin/orcamentos" className="text-[var(--primary)] hover:underline">
          Voltar para lista de orçamentos
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          {loadingOrders ? (
            <div className="text-center py-10">
              <p>Carregando ordens de serviço...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="service_order_id" className="block text-gray-700 font-medium mb-2">
                  Ordem de Serviço *
                </label>
                <select
                  id="service_order_id"
                  name="service_order_id"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  value={budgetData.service_order_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione uma ordem de serviço</option>
                  {orders.map(order => (
                    <option key={order.id} value={order.id}>
                      #{order.order_number} - {order.title}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="value" className="block text-gray-700 font-medium mb-2">
                  Valor (R$) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="value"
                  name="value"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  placeholder="0.00"
                  value={budgetData.value}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
                  Status *
                </label>
                <select
                  id="status"
                  name="status"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  value={budgetData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="pendente">Pendente</option>
                  <option value="aprovado">Aprovado</option>
                  <option value="rejeitado">Rejeitado</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                  Descrição *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  placeholder="Descreva os detalhes do orçamento..."
                  value={budgetData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--primary-dark)]"
                  disabled={loading}
                >
                  {loading ? 'Criando...' : 'Criar Orçamento'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCreateBudget;
