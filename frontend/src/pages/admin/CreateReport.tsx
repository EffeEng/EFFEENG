import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { serviceOrderService, reportService } from '../../services/api';

const AdminCreateReport: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('ordem');
  
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [reportData, setReportData] = useState({
    service_order_id: orderId || '',
    title: '',
    content: '',
    report_type: 'vistoria'
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
    setReportData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const formattedData = {
        ...reportData,
        service_order_id: parseInt(reportData.service_order_id)
      };
      
      await reportService.createReport(formattedData);
      
      setLoading(false);
      alert('Laudo técnico criado com sucesso!');
      navigate(`/admin/ordens/${reportData.service_order_id}`);
    } catch (err) {
      console.error('Erro ao criar laudo técnico:', err);
      setLoading(false);
      alert('Erro ao criar laudo técnico. Por favor, tente novamente.');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Novo Laudo Técnico</h1>
        <Link to="/admin/laudos" className="text-[var(--primary)] hover:underline">
          Voltar para lista de laudos
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
                  value={reportData.service_order_id}
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
                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                  Título do Laudo *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  placeholder="Título do laudo técnico"
                  value={reportData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="report_type" className="block text-gray-700 font-medium mb-2">
                  Tipo de Laudo *
                </label>
                <select
                  id="report_type"
                  name="report_type"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  value={reportData.report_type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="vistoria">Vistoria</option>
                  <option value="avaliacao">Avaliação</option>
                  <option value="patologia">Patologia</option>
                  <option value="reforma">Reforma</option>
                  <option value="seguro">Seguro</option>
                  <option value="pericia">Perícia</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
                  Conteúdo do Laudo *
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={10}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  placeholder="Descreva detalhadamente o conteúdo do laudo técnico..."
                  value={reportData.content}
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
                  {loading ? 'Criando...' : 'Criar Laudo Técnico'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCreateReport;
