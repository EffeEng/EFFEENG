import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { paymentService } from '../../services/api';

const ClientPayments: React.FC = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    budget_id: '',
    payment_method: 'pix',
    amount: '',
    description: ''
  });

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await paymentService.getClientPayments();
        setPayments(response.payments || []);
        setLoading(false);
      } catch (err: any) {
        console.error('Erro ao buscar pagamentos:', err);
        setError('Não foi possível carregar seus pagamentos. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const formattedData = {
        ...paymentData,
        budget_id: parseInt(paymentData.budget_id),
        amount: parseFloat(paymentData.amount)
      };
      
      await paymentService.createClientPayment(formattedData);
      
      // Recarregar pagamentos após o envio
      const response = await paymentService.getClientPayments();
      setPayments(response.payments || []);
      
      // Fechar modal e limpar formulário
      setShowPaymentModal(false);
      setPaymentData({
        budget_id: '',
        payment_method: 'pix',
        amount: '',
        description: ''
      });
      
      setLoading(false);
      alert('Pagamento registrado com sucesso!');
    } catch (err: any) {
      console.error('Erro ao registrar pagamento:', err);
      setLoading(false);
      alert('Não foi possível registrar o pagamento. Por favor, tente novamente mais tarde.');
    }
  };

  // Função para obter a classe de cor com base no status
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmado':
        return 'bg-green-100 text-green-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Meus Pagamentos</h1>
        <button
          onClick={() => setShowPaymentModal(true)}
          className="bg-[var(--primary)] text-white py-2 px-4 rounded hover:bg-[var(--primary-dark)] transition-colors"
        >
          Novo Pagamento
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">
            <p>Carregando pagamentos...</p>
          </div>
        ) : payments.length === 0 ? (
          <div className="p-6 text-center">
            <p>Você ainda não possui pagamentos registrados.</p>
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
                    Orçamento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Método
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">#{payment.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <Link to={`/cliente/orcamentos/${payment.budget_id}`} className="text-[var(--primary)] hover:underline">
                          #{payment.budget_id}
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        R$ {payment.amount.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {payment.payment_method === 'pix' ? 'PIX' :
                         payment.payment_method === 'credit_card' ? 'Cartão de Crédito' :
                         payment.payment_method === 'bank_transfer' ? 'Transferência Bancária' :
                         payment.payment_method}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(payment.status)}`}>
                        {payment.status === 'pendente' ? 'Pendente' :
                         payment.status === 'confirmado' ? 'Confirmado' :
                         payment.status === 'cancelado' ? 'Cancelado' : payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(payment.created_at).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Modal de Novo Pagamento */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Novo Pagamento</h2>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmitPayment}>
              <div className="mb-4">
                <label htmlFor="budget_id" className="block text-gray-700 font-medium mb-2">
                  ID do Orçamento *
                </label>
                <input
                  type="number"
                  id="budget_id"
                  name="budget_id"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  placeholder="Número do orçamento"
                  value={paymentData.budget_id}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="payment_method" className="block text-gray-700 font-medium mb-2">
                  Método de Pagamento *
                </label>
                <select
                  id="payment_method"
                  name="payment_method"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  value={paymentData.payment_method}
                  onChange={handleInputChange}
                  required
                >
                  <option value="pix">PIX</option>
                  <option value="credit_card">Cartão de Crédito</option>
                  <option value="bank_transfer">Transferência Bancária</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
                  Valor (R$) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="amount"
                  name="amount"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  placeholder="0.00"
                  value={paymentData.amount}
                  onChange={handleInputChange}
                  required
                />
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
                  placeholder="Informações adicionais sobre o pagamento"
                  value={paymentData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--primary-dark)]"
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Registrar Pagamento'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientPayments;
