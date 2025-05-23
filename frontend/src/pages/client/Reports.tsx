import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { reportService } from '../../services/api';

const ClientReports: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await reportService.getClientReports();
        setReports(response.reports || []);
        setLoading(false);
      } catch (err: any) {
        console.error('Erro ao buscar laudos técnicos:', err);
        setError('Não foi possível carregar seus laudos técnicos. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Meus Laudos Técnicos</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">
            <p>Carregando laudos técnicos...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="p-6 text-center">
            <p>Você ainda não possui laudos técnicos.</p>
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
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ordem de Serviço
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
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">#{report.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{report.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {report.report_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <Link to={`/cliente/ordens/${report.service_order_id}`} className="text-[var(--primary)] hover:underline">
                          #{report.service_order_id}
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(report.created_at).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link to={`/cliente/ordens/${report.service_order_id}`} className="text-[var(--primary)] hover:text-[var(--primary-dark)]">
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

export default ClientReports;
