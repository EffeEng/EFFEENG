import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { serviceOrderService, budgetService, reportService, fileService } from '../../services/api';

const ClientOrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);
  const [budget, setBudget] = useState<any>(null);
  const [reports, setReports] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (!id) return;
        
        // Buscar detalhes da ordem de serviço
        const orderResponse = await serviceOrderService.getClientOrderDetail(parseInt(id));
        setOrder(orderResponse.order);
        
        // Buscar orçamento relacionado
        try {
          const budgetResponse = await budgetService.getClientBudgets();
          const orderBudget = budgetResponse.budgets.find((b: any) => b.service_order_id === parseInt(id));
          if (orderBudget) {
            setBudget(orderBudget);
          }
        } catch (err) {
          console.error('Erro ao buscar orçamento:', err);
        }
        
        // Buscar laudos relacionados
        try {
          const reportsResponse = await reportService.getClientReports();
          const orderReports = reportsResponse.reports.filter((r: any) => r.service_order_id === parseInt(id));
          setReports(orderReports || []);
        } catch (err) {
          console.error('Erro ao buscar laudos:', err);
        }
        
        // Buscar arquivos relacionados
        try {
          const filesResponse = await fileService.getClientFiles();
          const orderFiles = filesResponse.files.filter((f: any) => f.service_order_id === parseInt(id));
          setFiles(orderFiles || []);
        } catch (err) {
          console.error('Erro ao buscar arquivos:', err);
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

  const handleApproveBudget = async () => {
    try {
      if (!budget) return;
      
      await budgetService.approveClientBudget(budget.id);
      
      // Atualizar orçamento após aprovação
      const budgetResponse = await budgetService.getClientBudgetDetail(budget.id);
      setBudget(budgetResponse.budget);
      
      alert('Orçamento aprovado com sucesso!');
    } catch (err) {
      console.error('Erro ao aprovar orçamento:', err);
      alert('Não foi possível aprovar o orçamento. Por favor, tente novamente mais tarde.');
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
          <Link to="/cliente/ordens" className="text-[var(--primary)] hover:underline">
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
          <Link to="/cliente/ordens" className="text-[var(--primary)] hover:underline">
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
        <Link to="/cliente/ordens" className="text-[var(--primary)] hover:underline">
          Voltar para lista de ordens
        </Link>
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
                      {budget ? `R$ ${budget.value.toFixed(2)}` : 'Não disponível'}
                    </div>
                    <div>
                      <span className="font-medium">Laudos Técnicos:</span>{' '}
                      {reports.length}
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
          
          {activeTab === 'budget' && (
            <div>
              {budget ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Detalhes do Orçamento</h3>
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
                    
                    {budget.status === 'pendente' && (
                      <div className="flex justify-end">
                        <button
                          onClick={handleApproveBudget}
                          className="bg-[var(--primary)] text-white py-2 px-4 rounded hover:bg-[var(--primary-dark)] transition-colors"
                        >
                          Aprovar Orçamento
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <p>Nenhum orçamento disponível para esta ordem de serviço.</p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'reports' && (
            <div>
              <h3 className="text-lg font-semibold mb-6">Laudos Técnicos</h3>
              
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
                        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                          {report.report_type}
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <p>{report.content}</p>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          onClick={() => setActiveTab('files')}
                          className="text-[var(--primary)] hover:underline"
                        >
                          Ver arquivos relacionados
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'files' && (
            <div>
              <h3 className="text-lg font-semibold mb-6">Arquivos</h3>
              
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
                        <button
                          onClick={() => handleDownloadFile(file.id)}
                          className="text-[var(--primary)] hover:underline text-sm"
                        >
                          Baixar
                        </button>
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

export default ClientOrderDetail;
