import axios from 'axios';

// Configuração base do axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Serviço de autenticação
export const authService = {
  login: async (email: string, password: string) => {
    try {
      // Simulação de login para demonstração
      if (email === 'admin@effe.com' && password === 'admin123') {
        const response = {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIn0.8B3hRJ1Wy-UGxWW4-xPwGQeVENRNkEQM0F8LHmu9vWM',
          user: {
            id: 1,
            username: 'Administrador',
            email: 'admin@effe.com',
            role: 'admin'
          }
        };
        return response;
      } else if (email === 'cliente@effe.com' && password === 'cliente123') {
        const response = {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6ImNsaWVudCJ9.QS91Vn7W9Qg2vUK9-XBYOzrWuGM2W0TbDFZ4q1K3VLI',
          user: {
            id: 2,
            username: 'Cliente Exemplo',
            email: 'cliente@effe.com',
            role: 'client'
          }
        };
        return response;
      }
      
      throw new Error('Credenciais inválidas');
      
      // Implementação real
      // const response = await api.post('/auth/login', { email, password });
      // return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  register: async (userData: any) => {
    try {
      // Simulação de registro para demonstração
      const response = {
        success: true,
        message: 'Usuário registrado com sucesso'
      };
      return response;
      
      // Implementação real
      // const response = await api.post('/auth/register', userData);
      // return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }
};

// Serviço de ordens de serviço
export const serviceOrderService = {
  // Cliente
  getClientOrders: async () => {
    try {
      // Simulação para demonstração
      const orders = [
        {
          id: 1,
          order_number: 'OS-2025-001',
          title: 'Projeto Residencial Vila Mariana',
          description: 'Projeto arquitetônico para residência de 150m² na Vila Mariana.',
          status: 'em_andamento',
          client_id: 2,
          created_at: '2025-01-15T10:30:00Z',
          updated_at: '2025-01-20T14:45:00Z'
        },
        {
          id: 2,
          order_number: 'OS-2025-002',
          title: 'Laudo Técnico Estrutural',
          description: 'Elaboração de laudo técnico para avaliação estrutural de edifício comercial.',
          status: 'concluída',
          client_id: 2,
          created_at: '2025-02-05T09:15:00Z',
          updated_at: '2025-02-15T16:30:00Z'
        },
        {
          id: 3,
          order_number: 'OS-2025-003',
          title: 'Projeto de Reforma Apartamento',
          description: 'Projeto de reforma para apartamento de 90m² no Itaim Bibi.',
          status: 'aberta',
          client_id: 2,
          created_at: '2025-03-10T11:20:00Z',
          updated_at: '2025-03-10T11:20:00Z'
        }
      ];
      
      return { orders };
      
      // Implementação real
      // const response = await api.get('/client/orders');
      // return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getClientOrderById: async (id: number) => {
    try {
      // Simulação para demonstração
      const orders = [
        {
          id: 1,
          order_number: 'OS-2025-001',
          title: 'Projeto Residencial Vila Mariana',
          description: 'Projeto arquitetônico para residência de 150m² na Vila Mariana.',
          status: 'em_andamento',
          client_id: 2,
          created_at: '2025-01-15T10:30:00Z',
          updated_at: '2025-01-20T14:45:00Z'
        },
        {
          id: 2,
          order_number: 'OS-2025-002',
          title: 'Laudo Técnico Estrutural',
          description: 'Elaboração de laudo técnico para avaliação estrutural de edifício comercial.',
          status: 'concluída',
          client_id: 2,
          created_at: '2025-02-05T09:15:00Z',
          updated_at: '2025-02-15T16:30:00Z'
        },
        {
          id: 3,
          order_number: 'OS-2025-003',
          title: 'Projeto de Reforma Apartamento',
          description: 'Projeto de reforma para apartamento de 90m² no Itaim Bibi.',
          status: 'aberta',
          client_id: 2,
          created_at: '2025-03-10T11:20:00Z',
          updated_at: '2025-03-10T11:20:00Z'
        }
      ];
      
      const order = orders.find(o => o.id === id);
      
      if (!order) {
        throw new Error('Ordem de serviço não encontrada');
      }
      
      return { order };
      
      // Implementação real
      // const response = await api.get(`/client/orders/${id}`);
      // return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Admin
  getAllOrders: async () => {
    try {
      // Simulação para demonstração
      const orders = [
        {
          id: 1,
          order_number: 'OS-2025-001',
          title: 'Projeto Residencial Vila Mariana',
          description: 'Projeto arquitetônico para residência de 150m² na Vila Mariana.',
          status: 'em_andamento',
          client_id: 2,
          client_name: 'Cliente Exemplo',
          created_at: '2025-01-15T10:30:00Z',
          updated_at: '2025-01-20T14:45:00Z'
        },
        {
          id: 2,
          order_number: 'OS-2025-002',
          title: 'Laudo Técnico Estrutural',
          description: 'Elaboração de laudo técnico para avaliação estrutural de edifício comercial.',
          status: 'concluída',
          client_id: 2,
          client_name: 'Cliente Exemplo',
          created_at: '2025-02-05T09:15:00Z',
          updated_at: '2025-02-15T16:30:00Z'
        },
        {
          id: 3,
          order_number: 'OS-2025-003',
          title: 'Projeto de Reforma Apartamento',
          description: 'Projeto de reforma para apartamento de 90m² no Itaim Bibi.',
          status: 'aberta',
          client_id: 2,
          client_name: 'Cliente Exemplo',
          created_at: '2025-03-10T11:20:00Z',
          updated_at: '2025-03-10T11:20:00Z'
        },
        {
          id: 4,
          order_number: 'OS-2025-004',
          title: 'Projeto Estrutural Edifício Comercial',
          description: 'Projeto estrutural para edifício comercial de 5 andares.',
          status: 'em_andamento',
          client_id: 3,
          client_name: 'João Silva',
          created_at: '2025-03-15T13:45:00Z',
          updated_at: '2025-03-18T10:20:00Z'
        },
        {
          id: 5,
          order_number: 'OS-2025-005',
          title: 'Laudo de Vistoria Condomínio',
          description: 'Vistoria técnica para avaliação de patologias em condomínio residencial.',
          status: 'aberta',
          client_id: 4,
          client_name: 'Maria Oliveira',
          created_at: '2025-03-20T09:30:00Z',
          updated_at: '2025-03-20T09:30:00Z'
        }
      ];
      
      return { orders };
      
      // Implementação real
      // const response = await api.get('/admin/orders');
      // return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  createOrder: async (orderData: any) => {
    try {
      // Simulação para demonstração
      const newOrder = {
        id: 6,
        order_number: 'OS-2025-006',
        ...orderData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      return { order: newOrder };
      
      // Implementação real
      // const response = await api.post('/admin/orders', orderData);
      // return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  updateOrder: async (id: number, orderData: any) => {
    try {
      // Simulação para demonstração
      const updatedOrder = {
        id,
        ...orderData,
        updated_at: new Date().toISOString()
      };
      
      return { order: updatedOrder };
      
      // Implementação real
      // const response = await api.put(`/admin/orders/${id}`, orderData);
      // return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  deleteOrder: async (id: number) => {
    try {
      // Simulação para demonstração
      return { success: true, message: 'Ordem de serviço excluída com sucesso' };
      
      // Implementação real
      // const response = await api.delete(`/admin/orders/${id}`);
      // return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Serviço de orçamentos
export const budgetService = {
  // Cliente
  getClientBudgets: async () => {
    try {
      // Simulação para demonstração
      const budgets = [
        {
          id: 1,
          service_order_id: 1,
          value: 15000.00,
          description: 'Orçamento para projeto arquitetônico residencial incluindo plantas, cortes, fachadas e detalhamentos.',
          status: 'aprovado',
          created_at: '2025-01-16T14:30:00Z',
          updated_at: '2025-01-18T09:45:00Z'
        },
        {
          id: 2,
          service_order_id: 2,
          value: 5000.00,
          description: 'Orçamento para elaboração de laudo técnico estrutural com visita técnica, análise e relatório detalhado.',
          status: 'aprovado',
          created_at: '2025-02-06T10:15:00Z',
          updated_at: '2025-02-07T16:20:00Z'
        },
        {
          id: 3,
          service_order_id: 3,
          value: 8500.00,
          description: 'Orçamento para projeto de reforma de apartamento incluindo layout, elétrica, hidráulica e acabamentos.',
          status: 'pendente',
          created_at: '2025-03-11T13:40:00Z',
          updated_at: '2025-03-11T13:40:00Z'
        }
      ];
      
      return { budgets };
      
      // Implementação real
      // const response = await api.get('/client/budgets');
      // return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Admin
  getAllBudgets: async () => {
    try {
      // Simulação para demonstração
      const budgets = [
        {
          id: 1,
          service_order_id: 1,
          value: 15000.00,
          description: 'Orçamento para projeto arquitetônico residencial incluindo plantas, cortes, fachadas e detalhamentos.',
          status: 'aprovado',
          created_at: '2025-01-16T14:30:00Z',
          updated_at: '2025-01-18T09:45:00Z'
        },
        {
          id: 2,
          service_order_id: 2,
          value: 5000.00,
          description: 'Orçamento para elaboração de laudo técnico estrutural com visita técnica, análise e relatório detalhado.',
          status: 'aprovado',
          created_at: '2025-02-06T10:15:00Z',
          updated_at: '2025-02-07T16:20:00Z'
        },
        {
          id: 3,
          service_order_id: 3,
          value: 8500.00,
          description: 'Orçamento para projeto de reforma de apartamento incluindo layout, elétrica, hidráulica e acabamentos.',
          status: 'pendente',
          created_at: '2025-03-11T13:40:00Z',
          updated_at: '2025-03-11T13:40:00Z'
        },
        {
          id: 4,
          service_order_id: 4,
          value: 25000.00,
          description: 'Orçamento para projeto estrutural de edifício comercial incluindo fundações, pilares, vigas e lajes.',
          status: 'pendente',
          created_at: '2025-03-16T15:20:00Z',
          updated_at: '2025-03-16T15:20:00Z'
        }
      ];
      
      return { budgets };
      
      // Implementação real
      // const response = await api.get('/admin/budgets');
      // return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  createBudget: async (budgetData: any) => {
    try {
      // Simulação para demonstração
      const newBudget = {
        id: 5,
        ...budgetData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      return { budget: newBudget };
      
      // Implementação real
      // const response = await api.post('/admin/budgets', budgetData);
      // return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  updateBudget: async (id: number, budgetData: any) => {
    try {
      // Simulação para demonstração
      const updatedBudget = {
        id,
        ...budgetData,
        updated_at: new Date().toISOString()
      };
      
      return { budget: updatedBudget };
      
      // Implementação real
      // const response = await api.put(`/admin/budgets/${id}`, budgetData);
      // return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  deleteBudget: async (id: number) => {
    try {
      // Simulação para demonstração
      return { success: true, message: 'Orçamento excluído com sucesso' };
      
      // Implementação real
      // const response = await api.delete(`/admin/budgets/${id}`);
      // return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Serviço de laudos técnicos
export const reportService = {
  // Cliente
  getClientReports: async () => {
    try {
      // Simulação para demonstração
      const reports = [
        {
          id: 1,
          service_order_id: 2,
          title: 'Laudo Técnico Estrutural - Edifício Comercial',
          content: 'Laudo técnico detalhado sobre a avaliação estrutural do edifício comercial, incluindo análise de patologias, verificação de elementos estruturais e recomendações técnicas.',
          report_type: 'estrutural',
          created_at: '2025-02-15T14:30:00Z',
          updated_at: '2025-02-15T14:30:00Z'
        }
      ];
      
      return { reports };
      
      // Implementação real
      // const response = await api.get('/client/reports');
      // return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Admin
  getAllReports: async () => {
    try {
      // Simulação para demonstração
      const reports = [
        {
          id: 1,
          service_order_id: 2,
          title: 'Laudo Técnico Estrutural - Edifício Comercial',
          content: 'Laudo técnico detalhado sobre a avaliação estrutural do edifício comercial, incluindo análise de patologias, verificação de elementos estruturais e recomendações técnicas.',
          report_type: 'estrutural',
          created_at: '2025-02-15T14:30:00Z',
          updated_at: '2025-02-15T14:30:00Z'
        },
        {
          id: 2,
          service_order_id: 5,
          title: 'Laudo de Vistoria - Condomínio Residencial',
          content: 'Vistoria técnica realizada no condomínio residencial para avaliação de patologias nas áreas comuns, incluindo fachada, garagem e áreas de lazer.',
          report_type: 'vistoria',
          created_at: '2025-03-22T10:15:00Z',
          updated_at: '2025-03-22T10:15:00Z'
        }
      ];
      
      return { reports };
      
      // Implementação real
      // const response = await api.get('/admin/reports');
      // return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  createReport: async (reportData: any) => {
    try {
      // Simulação para demonstração
      const newReport = {
        id: 3,
        ...reportData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      return { report: newReport };
      
      // Implementação real
      // const response = await api.post('/admin/reports', reportData);
      // return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  updateReport: async (id: number, reportData: any) => {
    try {
      // Simulação para demonstração
      const updatedReport = {
        id,
        ...reportData,
        updated_at: new Date().toISOString()
      };
      
      return { report: updatedReport };
      
      // Implementação real
      // const response = await api.put(`/admin/reports/${id}`, reportData);
      // return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  deleteReport: async (id: number) => {
    try {
      // Simulação para demonstração
      return { success: true, message: 'Laudo técnico excluído com sucesso' };
      
      // Implementação real
      // const response = await api.delete(`/admin/reports/${id}`);
      // return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Serviço de arquivos
export const fileService = {
  // Cliente
  getClientFiles: async () => {
    try {
      // Simulação para demonstração
      const files = [
        {
          id: 1,
          service_order_id: 1,
          filename: 'projeto_residencial_planta_baixa.pdf',
          file_path: '/uploads/projeto_residencial_planta_baixa.pdf',
          file_type: 'projeto',
          file_size: 2048,
          description: 'Planta baixa do projeto residencial',
          created_at: '2025-01-20T11:30:00Z',
          updated_at: '2025-01-20T11:30:00Z'
        },
        {
          id: 2,
          service_order_id: 1,
          filename: 'projeto_residencial_fachada.pdf',
          file_path: '/uploads/projeto_residencial_fachada.pdf',
          file_type: 'projeto',
          file_size: 1536,
          description: 'Fachada do projeto residencial',
          created_at: '2025-01-20T11:35:00Z',
          updated_at: '2025-01-20T11:35:00Z'
        },
        {
          id: 3,
          service_order_id: 2,
          filename: 'laudo_tecnico_estrutural.pdf',
          file_path: '/uploads/laudo_tecnico_estrutural.pdf',
          file_type: 'laudo',
          file_size: 3072,
          description: 'Laudo técnico estrutural completo',
          created_at: '2025-02-15T15:20:00Z',
          updated_at: '2025-02-15T15:20:00Z'
        }
      ];
      
      return { files };
      
      // Implementação real
      // const response = await api.get('/client/files');
      // return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  downloadClientFile: async (fileId: number) => {
    try {
      // Simulação para demonstração
      // Retorna um blob vazio para simular o download
      return new Blob(['Conteúdo simulado do arquivo'], { type: 'application/pdf' });
      
      // Implementação real
      // const response = await api.get(`/client/files/${fileId}/download`, { responseType: 'blob' });
      // return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Admin
  getAllFiles: async () => {
    try {
      // Simulação para demonstração
      const files = [
        {
          id: 1,
          service_order_id: 1,
          filename: 'projeto_residencial_planta_baixa.pdf',
          file_path: '/uploads/projeto_residencial_planta_baixa.pdf',
          file_type: 'projeto',
          file_size: 2048,
          description: 'Planta baixa do projeto residencial',
          created_at: '2025-01-20T11:30:00Z',
          updated_at: '2025-01-20T11:30:00Z'
        },
        {
          id: 2,
          service_order_id: 1,
          filename: 'projeto_residencial_fachada.pdf',
          file_path: '/uploads/projeto_residencial_fachada.pdf',
          file_type: 'projeto',
          file_size: 1536,
          description: 'Fachada do projeto residencial',
          created_at: '2025-01-20T11:35:00Z',
          updated_at: '2025-01-20T11:35:00Z'
        },
        {
          id: 3,
          service_order_id: 2,
          filename: 'laudo_tecnico_estrutural.pdf',
          file_path: '/uploads/laudo_tecnico_estrutural.pdf',
          file_type: 'laudo',
          file_size: 3072,
          description: 'Laudo técnico estrutural completo',
          created_at: '2025-02-15T15:20:00Z',
          updated_at: '2025-02-15T15:20:00Z'
        },
        {
          id: 4,
          service_order_id: 4,
          filename: 'projeto_estrutural_fundacoes.pdf',
          file_path: '/uploads/projeto_estrutural_fundacoes.pdf',
          file_type: 'projeto',
          file_size: 4096,
          description: 'Projeto de fundações do edifício comercial',
          created_at: '2025-03-18T09:45:00Z',
          updated_at: '2025-03-18T09:45:00Z'
        }
      ];
      
      return { files };
      
      // Implementação real
      // const response = await api.get('/admin/files');
      // return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  uploadFile: async (fileData: FormData) => {
    try {
      // Simulação para demonstração
      const newFile = {
        id: 5,
        service_order_id: parseInt(fileData.get('service_order_id') as string),
        filename: (fileData.get('file') as File).name,
        file_path: `/uploads/${(fileData.get('file') as File).name}`,
        file_type: fileData.get('file_type'),
        file_size: (fileData.get('file') as File).size,
        description: fileData.get('description'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      return { file: newFile };
      
      // Implementação real
      // const response = await api.post('/admin/files', fileData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });
      // return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  deleteFile: async (fileId: number) => {
    try {
      // Simulação para demonstração
      return { success: true, message: 'Arquivo excluído com sucesso' };
      
      // Implementação real
      // const response = await api.delete(`/admin/files/${fileId}`);
      // return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Serviço de pagamentos
export const paymentService = {
  // Cliente
  getClientPayments: async () => {
    try {
      // Simulação para demonstração
      const payments = [
        {
          id: 1,
          budget_id: 1,
          amount: 7500.00,
          payment_method: 'pix',
          status: 'confirmado',
          description: 'Primeira parcela do projeto residencial',
          created_at: '2025-01-19T10:15:00Z',
          updated_at: '2025-01-19T10:20:00Z'
        },
        {
          id: 2,
          budget_id: 1,
          amount: 7500.00,
          payment_method: 'credit_card',
          status: 'confirmado',
          description: 'Segunda parcela do projeto residencial',
          created_at: '2025-02-19T14:30:00Z',
          updated_at: '2025-02-19T14:35:00Z'
        },
        {
          id: 3,
          budget_id: 2,
          amount: 5000.00,
          payment_method: 'bank_transfer',
          status: 'confirmado',
          description: 'Pagamento do laudo técnico estrutural',
          created_at: '2025-02-08T09:45:00Z',
          updated_at: '2025-02-08T10:00:00Z'
        }
      ];
      
      return { payments };
      
      // Implementação real
      // const response = await api.get('/client/payments');
      // return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  createClientPayment: async (paymentData: any) => {
    try {
      // Simulação para demonstração
      const newPayment = {
        id: 4,
        ...paymentData,
        status: 'pendente',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      return { payment: newPayment };
      
      // Implementação real
      // const response = await api.post('/client/payments', paymentData);
      // return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Admin
  getAllPayments: async () => {
    try {
      // Simulação para demonstração
      const payments = [
        {
          id: 1,
          budget_id: 1,
          client_id: 2,
          client_name: 'Cliente Exemplo',
          amount: 7500.00,
          payment_method: 'pix',
          status: 'confirmado',
          description: 'Primeira parcela do projeto residencial',
          created_at: '2025-01-19T10:15:00Z',
          updated_at: '2025-01-19T10:20:00Z'
        },
        {
          id: 2,
          budget_id: 1,
          client_id: 2,
          client_name: 'Cliente Exemplo',
          amount: 7500.00,
          payment_method: 'credit_card',
          status: 'confirmado',
          description: 'Segunda parcela do projeto residencial',
          created_at: '2025-02-19T14:30:00Z',
          updated_at: '2025-02-19T14:35:00Z'
        },
        {
          id: 3,
          budget_id: 2,
          client_id: 2,
          client_name: 'Cliente Exemplo',
          amount: 5000.00,
          payment_method: 'bank_transfer',
          status: 'confirmado',
          description: 'Pagamento do laudo técnico estrutural',
          created_at: '2025-02-08T09:45:00Z',
          updated_at: '2025-02-08T10:00:00Z'
        }
      ];
      
      return { payments };
      
      // Implementação real
      // const response = await api.get('/admin/payments');
      // return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  updatePaymentStatus: async (id: number, status: string) => {
    try {
      // Simulação para demonstração
      const updatedPayment = {
        id,
        status,
        updated_at: new Date().toISOString()
      };
      
      return { payment: updatedPayment };
      
      // Implementação real
      // const response = await api.put(`/admin/payments/${id}/status`, { status });
      // return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api;
