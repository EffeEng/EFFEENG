# Documentação do Projeto EFFE Engenharia e Construções

## Visão Geral

Este projeto consiste em um site completo e responsivo para o escritório de engenharia EFFE Engenharia e Construções, especializado em projetos arquitetônicos, estruturais, convênios de condomínio e elaboração de laudos técnicos.

O sistema possui três áreas principais:
1. **Área Pública**: Apresentação da empresa, serviços, projetos e formulário de contato
2. **Área do Cliente**: Acesso restrito para clientes acompanharem seus projetos, ordens de serviço, orçamentos e laudos
3. **Área Administrativa**: Gerenciamento completo de usuários, ordens de serviço, orçamentos, laudos e arquivos

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

### Backend (Flask)

Localizado na pasta `/backend/effe_app`, o backend é construído com Flask e oferece:
- Autenticação JWT segura
- APIs RESTful para todas as funcionalidades
- Modelos de dados para usuários, ordens de serviço, orçamentos, laudos e pagamentos
- Integração com banco de dados MySQL

### Frontend (React)

Localizado na pasta `/frontend/effe_site`, o frontend é construído com React e TypeScript, oferecendo:
- Design responsivo com Tailwind CSS
- Páginas públicas informativas
- Painéis de cliente e administrador
- Integração com APIs de pagamento

## Requisitos Técnicos

### Backend
- Python 3.8+
- Flask
- Flask-SQLAlchemy
- Flask-JWT-Extended
- MySQL

### Frontend
- Node.js 14+
- React 18+
- TypeScript
- Tailwind CSS

## Instalação

### Backend

1. Navegue até a pasta do backend:
```bash
cd backend/effe_app
```

2. Crie e ative um ambiente virtual:
```bash
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
```

3. Instale as dependências:
```bash
pip install -r requirements.txt
```

4. Configure o banco de dados MySQL:
```bash
# Crie um banco de dados MySQL chamado 'effe_db'
# Edite as variáveis de ambiente no arquivo .env ou configure diretamente em src/main.py
```

5. Inicie o servidor:
```bash
python src/main.py
```

### Frontend

1. Navegue até a pasta do frontend:
```bash
cd frontend/effe_site
```

2. Instale as dependências:
```bash
npm install
```

3. Configure a URL da API:
```bash
# Edite o arquivo .env ou src/services/api.ts para apontar para o backend
```

4. Inicie o servidor de desenvolvimento:
```bash
npm start
```

5. Para build de produção:
```bash
npm run build
```

## Deploy

### Backend

1. Configure um servidor web (Nginx, Apache) para servir a aplicação Flask
2. Configure o servidor de banco de dados MySQL
3. Use Gunicorn ou uWSGI como servidor WSGI
4. Configure variáveis de ambiente para produção

### Frontend

1. Gere os arquivos de build:
```bash
cd frontend/effe_site
npm run build
```

2. Hospede os arquivos estáticos gerados na pasta `build` em um servidor web ou CDN

## Estrutura de Arquivos

### Backend
```
backend/effe_app/
├── venv/                  # Ambiente virtual Python
├── requirements.txt       # Dependências do projeto
└── src/
    ├── main.py            # Ponto de entrada da aplicação
    ├── auth.py            # Autenticação JWT
    ├── models/            # Modelos de dados
    │   ├── user.py
    │   ├── service_order.py
    │   ├── budget.py
    │   ├── technical_report.py
    │   ├── payment.py
    │   └── project_file.py
    └── routes/            # Rotas da API
        ├── auth.py
        ├── service_order.py
        ├── budget.py
        ├── technical_report.py
        ├── payment.py
        └── project_file.py
```

### Frontend
```
frontend/effe_site/
├── public/                # Arquivos públicos
├── src/                   # Código fonte
│   ├── components/        # Componentes reutilizáveis
│   │   ├── layout/        # Componentes de layout
│   │   ├── public/        # Componentes da área pública
│   │   ├── client/        # Componentes da área do cliente
│   │   └── admin/         # Componentes da área administrativa
│   ├── contexts/          # Contextos React
│   │   └── AuthContext.tsx
│   ├── pages/             # Páginas da aplicação
│   │   ├── public/        # Páginas públicas
│   │   ├── client/        # Páginas do cliente
│   │   └── admin/         # Páginas administrativas
│   ├── services/          # Serviços e APIs
│   │   └── api.ts
│   ├── App.tsx            # Componente principal
│   └── index.tsx          # Ponto de entrada
└── package.json           # Dependências e scripts
```

## Funcionalidades

### Área Pública
- Página inicial com design moderno
- Seção "Quem Somos" com informações da empresa
- Seção "Serviços" detalhando os serviços oferecidos
- Galeria de projetos
- Formulário de contato
- Depoimentos de clientes

### Área do Cliente
- Login seguro
- Dashboard com resumo de atividades
- Visualização de ordens de serviço e status
- Download de arquivos e laudos
- Visualização de orçamentos
- Sistema de pagamentos online

### Área Administrativa
- Gerenciamento de usuários
- Criação e edição de ordens de serviço
- Geração de orçamentos
- Upload de arquivos e laudos
- Relatórios de andamento e financeiros

## Credenciais de Demonstração

Para fins de teste, o sistema possui as seguintes credenciais pré-configuradas:

### Administrador
- Email: admin@effe.com
- Senha: admin123

### Cliente
- Email: cliente@effe.com
- Senha: cliente123

## Suporte e Contato

Para suporte técnico ou dúvidas sobre o sistema, entre em contato através do email: suporte@effe.com.br

---

© 2025 EFFE Engenharia e Construções. Todos os direitos reservados.
