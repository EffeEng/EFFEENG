import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { serviceOrderService, budgetService, reportService, fileService } from '../../services/api';

const AdminOrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [budget, setBudget] = useState<any>(null);
  const [reports, setReports] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('details');
  const [editMode, setEditMode] = useState(false);
  const [orderData, setOrderData] = useState({
    title: '',
    description: '',
    status: 'aberta'
  });

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (!id) return;
        
        // Buscar detalhes da ordem de serviço
        const orderResponse = await serviceOrderService.getAllOrders();
        const foundOrder = orderResponse.orders.find((o: any) => o.id === parseInt(id));
        
        if (foundOrder) {
          setOrder(foundOrder);
          setOrderData({
            title: foundOrder.title,
            description: foundOrder.description,
            status: foundOrder.status
          });
          
          // Buscar orçamento relacionado
          try {
            const budgetResponse = await budgetService.getAllBudgets();
            const orderBudget = budgetResponse.budgets.find((b: any) => b.service_order_id === parseInt(id));
            if (orderBudget) {
              setBudget(orderBudget);
            }
          } catch (err) {
            console.error('Erro ao buscar orçamento:', err);
          }
          
          // Buscar laudos relacionados
          try {
            const reportsResponse = await reportService.getAllReports();
            const orderReports = reportsResponse.reports.filter((r: any) => r.service_order_id === parseInt(id));
            setReports(orderReports || []);
          } catch (err) {
            console.error('Erro ao buscar laudos:', err);
          }
          
          // Buscar arquivos relacionados
          try {
            const filesResponse = await fileService.getAllFiles();
            const orderFiles = filesResponse.files.filter((f: any) => f.service_order_id === parseInt(id));
            setFiles(orderFiles || []);
          } catch (err) {
            console.error('Erro ao buscar arquivos:', err);
          }
        } else {
          setError('Ordem de serviço não encontrada.');
        }
        
        setLoading(false);
      } catch (err: any) {
        console.error('Erro ao buscar detalhes da ordem:', err);
        setError('Não foi possível carregar os detalhes da ordem de serviço. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveOrder = async () => {
    try {
      setLoading(true);
      
      await serviceOrderService.updateOrder(parseInt(id!), orderData);
      
      // Atualizar dados da ordem após salvar
      const orderResponse = await serviceOrderService.getAllOrders();
      const updatedOrder = orderResponse.orders.find((o: any) => o.id === parseInt(id!));
      
      if (updatedOrder) {
        setOrder(updatedOrder);
      }
      
      setEditMode(false);
      setLoading(false);
      alert('Ordem de serviço atualizada com sucesso!');
    } catch (err) {
      console.error('Erro ao atualizar ordem:', err);
      setLoading(false);
      alert('Erro ao atualizar ordem de serviço. Por favor, tente novamente.');
    }
  };

  const handleDeleteOrder = async () => {
    if (window.confirm('Tem certeza que deseja excluir esta ordem de serviço? Esta ação não pode ser desfeita.')) {
      try {
        setLoading(true);
        
        await serviceOrderService.deleteOrder(parseInt(id!));
        
        setLoading(false);
        alert('Ordem de serviço excluída com sucesso!');
        navigate('/admin/ordens');
      } catch (err) {
        console.error('Erro ao excluir ordem:', err);
        setLoading(false);
        alert('Erro ao excluir ordem de serviço. Por favor, tente novamente.');
      }
    }
  };

  const handleDeleteFile = async (fileId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este arquivo? Esta ação não pode ser desfeita.')) {
      try {
        await fileService.deleteFile(fileId);
        
        // Atualizar lista de arquivos após exclusão
        setFiles(files.filter(f => f.id !== fileId));
        
        alert('Arquivo excluído com sucesso!');
      } catch (err) {
        console.error('Erro ao excluir arquivo:', err);
        alert('Erro ao excluir arquivo. Por favor, tente novamente.');
      }
    }
  };

  const handleDownloadFile = async (fileId: number) => {
    try {
      const blob = await fileService.downloadClientFile(fileId);
      const file = files.find(f => f.id === fileId);
      
      // Criar URL para download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Erro ao baixar arquivo:', err);
      alert('Não foi possível baixar o arquivo. Por favor, tente novamente mais tarde.');
    }
  };

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

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Detalhes da Ordem de Serviço</h1>
        <div className="text-center py-10">
          <p>Carregando detalhes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Detalhes da Ordem de Serviço</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <div className="text-center">
          <Link to="/admin/ordens" className="text-[var(--primary)] hover:underline">
            Voltar para lista de ordens
          </Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Detalhes da Ordem de Serviço</h1>
        <div className="text-center py-10">
          <p>Ordem de serviço não encontrada.</p>
          <Link to="/admin/ordens" className="text-[var(--primary)] hover:underline">
            Voltar para lista de ordens
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ordem de Serviço #{order.order_number}</h1>
        <div className="flex space-x-3">
          <Link to="/admin/ordens" className="text-[var(--primary)] hover:underline">
            Voltar para lista de ordens
          </Link>
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="text-[var(--primary)] hover:underline"
            >
              Editar
            </button>
          )}
          <button
            onClick={handleDeleteOrder}
            className="text-red-600 hover:underline"
          >
            Excluir
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="border-b">
          <nav className="flex">
            <button
              className={`px-6 py-3 font-medium ${activeTab === 'details' ? 'bg-[var(--primary)] text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('details')}
            >
              Detalhes
            </button>
            <button
              className={`px-6 py-3 font-medium ${activeTab === 'budget' ? 'bg-[var(--primary)] text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('budget')}
            >
              Orçamento
            </button>
            <button
              className={`px-6 py-3 font-medium ${activeTab === 'reports' ? 'bg-[var(--primary)] text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('reports')}
            >
              Laudos Técnicos
            </button>
            <button
              className={`px-6 py-3 font-medium ${activeTab === 'files' ? 'bg-[var(--primary)] text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('files')}
            >
              Arquivos
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'details' && (
            <div>
              {editMode ? (
                <div>
                  <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                      Título
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      value={orderData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      value={orderData.status}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="aberta">Aberta</option>
                      <option value="em_andamento">Em Andamento</option>
                      <option value="concluída">Concluída</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                      Descrição
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={5}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      value={orderData.description}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setEditMode(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSaveOrder}
                      className="px-4 py-2 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--primary-dark)]"
                    >
                      Salvar Alterações
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Informações Gerais</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="font-medium">Título:</span> {order.title}
                        </div>
                        <div>
                          <span className="font-medium">Status:</span>{' '}
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(order.status)}`}>
                            {order.status === 'aberta' ? 'Aberta' : 
                             order.status === 'em_andamento' ? 'Em Andamento' : 
                             order.status === 'concluída' ? 'Concluída' : order.status}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">Cliente:</span>{' '}
                          <Link to={`/admin/clientes/${order.client_id}`} className="text-[var(--primary)] hover:underline">
                            {order.client_name || `Cliente ${order.client_id}`}
                          </Link>
                        </div>
                        <div>
                          <span className="font-medium">Data de Criação:</span>{' '}
                          {new Date(order.created_at).toLocaleDateString('pt-BR')}
                        </div>
                        <div>
                          <span className="font-medium">Última Atualização:</span>{' '}
                          {new Date(order.updated_at).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Resumo</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="font-medium">Orçamento:</span>{' '}
                          {budget ? (
                            <Link to={`/admin/orcamentos/${budget.id}`} className="text-[var(--primary)] hover:underline">
                              R$ {budget.value.toFixed(2)}
                            </Link>
                          ) : (
                            <Link to={`/admin/orcamentos/novo?ordem=${order.id}`} className="text-[var(--primary)] hover:underline">
                              Criar orçamento
                            </Link>
                          )}
                        </div>
                        <div>
                          <span className="font-medium">Laudos Técnicos:</span>{' '}
                          {reports.length > 0 ? (
                            <span>{reports.length}</span>
                          ) : (
                            <Link to={`/admin/laudos/novo?ordem=${order.id}`} className="text-[var(--primary)] hover:underline">
                              Criar laudo
                            </Link>
                          )}
                        </div>
                        <div>
                          <span className="font-medium">Arquivos:</span>{' '}
                          {files.length}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Descrição</h3>
                    <div className="bg-gray-50 p-4 rounded">
                      <p>{order.description}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'budget' && (
            <div>
              {budget ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Detalhes do Orçamento</h3>
                    <div className="flex space-x-3">
                      <Link to={`/admin/orcamentos/${budget.id}/editar`} className="text-[var(--primary)] hover:underline">
                        Editar
                      </Link>
                      <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        budget.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' :
                        budget.status === 'aprovado' ? 'bg-green-100 text-green-800' :
                        budget.status === 'rejeitado' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {budget.status === 'pendente' ? 'Pendente' :
                         budget.status === 'aprovado' ? 'Aprovado' :
                         budget.status === 'rejeitado' ? 'Rejeitado' : budget.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <span className="font-medium">Valor Total:</span>
                        <div className="text-3xl font-bold text-[var(--primary)] mt-1">
                          R$ {budget.value.toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Data de Criação:</span>
                        <div className="mt-1">
                          {new Date(budget.created_at).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <span className="font-medium">Descrição:</span>
                      <div className="mt-2 p-4 bg-white rounded border">
                        <p>{budget.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <p>Nenhum orçamento disponível para esta ordem de serviço.</p>
                  <Link to={`/admin/orcamentos/novo?ordem=${order.id}`} className="text-[var(--primary)] hover:underline">
                    Criar orçamento
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'reports' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Laudos Técnicos</h3>
                <Link to={`/admin/laudos/novo?ordem=${order.id}`} className="text-[var(--primary)] hover:underline">
                  Novo Laudo
                </Link>
              </div>
              
              {reports.length === 0 ? (
                <div className="text-center py-10">
                  <p>Nenhum laudo técnico disponível para esta ordem de serviço.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {reports.map((report) => (
                    <div key={report.id} className="bg-gray-50 p-6 rounded shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xl font-semibold">{report.title}</h4>
                          <p className="text-sm text-gray-500">
                            {new Date(report.created_at).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <div className="flex space-x-3 items-center">
                          <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                            {report.report_type}
                          </span>
                          <Link to={`/admin/laudos/${report.id}/editar`} className="text-[var(--primary)] hover:underline">
                            Editar
                          </Link>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p>{report.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'files' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Arquivos</h3>
                <Link to={`/admin/arquivos/novo?ordem=${order.id}`} className="text-[var(--primary)] hover:underline">
                  Enviar Arquivo
                </Link>
              </div>
              
              {files.length === 0 ? (
                <div className="text-center py-10">
                  <p>Nenhum arquivo disponível para esta ordem de serviço.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {files.map((file) => (
                    <div key={file.id} className="bg-gray-50 p-4 rounded shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="text-[var(--primary)] mr-3">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium truncate" title={file.filename}>
                            {file.filename}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {(file.file_size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs px-2 py-1 bg-gray-200 rounded">
                          {file.file_type}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleDownloadFile(file.id)}
                            className="text-[var(--primary)] hover:underline text-sm"
                          >
                            Baixar
                          </button>
                          <button
                            onClick={() => handleDeleteFile(file.id)}
                            className="text-red-600 hover:underline text-sm"
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
