import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fileService } from '../../services/api';

const ClientFiles: React.FC = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fileService.getClientFiles();
        setFiles(response.files || []);
        setLoading(false);
      } catch (err: any) {
        console.error('Erro ao buscar arquivos:', err);
        setError('Não foi possível carregar seus arquivos. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Meus Arquivos</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-10">
          <p>Carregando arquivos...</p>
        </div>
      ) : files.length === 0 ? (
        <div className="text-center py-10">
          <p>Você ainda não possui arquivos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file) => (
            <div key={file.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-[var(--primary)] mr-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold truncate" title={file.filename}>
                    {file.filename}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {(file.file_size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Tipo:</span>
                  <span className="text-sm px-2 py-1 bg-gray-100 rounded">
                    {file.file_type}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Data:</span>
                  <span className="text-sm">
                    {new Date(file.created_at).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Ordem de Serviço:</span>
                  <Link to={`/cliente/ordens/${file.service_order_id}`} className="text-sm text-[var(--primary)] hover:underline">
                    #{file.service_order_id}
                  </Link>
                </div>
              </div>
              
              <button
                onClick={() => handleDownloadFile(file.id)}
                className="w-full bg-[var(--primary)] text-white py-2 px-4 rounded hover:bg-[var(--primary-dark)] transition-colors"
              >
                Baixar Arquivo
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientFiles;
