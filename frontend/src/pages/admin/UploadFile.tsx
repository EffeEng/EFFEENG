import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fileService, serviceOrderService } from '../../services/api';

const AdminUploadFile: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState({
    service_order_id: '',
    description: '',
    file_type: 'documento'
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
    setFileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert('Por favor, selecione um arquivo para enviar.');
      return;
    }
    
    try {
      setLoading(true);
      
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('service_order_id', fileData.service_order_id);
      formData.append('description', fileData.description);
      formData.append('file_type', fileData.file_type);
      
      await fileService.uploadFile(formData);
      
      setLoading(false);
      alert('Arquivo enviado com sucesso!');
      navigate(`/admin/ordens/${fileData.service_order_id}`);
    } catch (err) {
      console.error('Erro ao enviar arquivo:', err);
      setLoading(false);
      alert('Erro ao enviar arquivo. Por favor, tente novamente.');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Enviar Novo Arquivo</h1>
        <Link to="/admin/arquivos" className="text-[var(--primary)] hover:underline">
          Voltar para lista de arquivos
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
                  value={fileData.service_order_id}
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
                <label htmlFor="file" className="block text-gray-700 font-medium mb-2">
                  Arquivo *
                </label>
                <input
                  type="file"
                  id="file"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  onChange={handleFileChange}
                  required
                />
                {selectedFile && (
                  <p className="mt-2 text-sm text-gray-500">
                    Arquivo selecionado: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                  </p>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="file_type" className="block text-gray-700 font-medium mb-2">
                  Tipo de Arquivo *
                </label>
                <select
                  id="file_type"
                  name="file_type"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  value={fileData.file_type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="documento">Documento</option>
                  <option value="projeto">Projeto</option>
                  <option value="laudo">Laudo</option>
                  <option value="contrato">Contrato</option>
                  <option value="imagem">Imagem</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                  Descrição
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  placeholder="Descrição opcional do arquivo..."
                  value={fileData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--primary-dark)]"
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Enviar Arquivo'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUploadFile;
