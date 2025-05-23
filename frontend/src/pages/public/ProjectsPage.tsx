import React from 'react';

const ProjectsPage: React.FC = () => {
  return (
    <div>
      <section className="bg-[var(--primary)] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Nossos Projetos</h1>
          <p className="text-xl max-w-3xl">
            Conheça alguns dos nossos projetos e veja como podemos transformar suas ideias em realidade.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="/placeholder-project1.jpg" 
                alt="Residencial Vila Nova" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <span className="inline-block bg-[var(--primary)] text-white text-sm px-3 py-1 rounded-full mb-3">
                  Projeto Arquitetônico
                </span>
                <h3 className="text-xl font-bold mb-2">Residencial Vila Nova</h3>
                <p className="text-gray-600 mb-4">
                  Projeto arquitetônico e estrutural para condomínio residencial com 24 unidades, 
                  incluindo áreas de lazer e convivência.
                </p>
                <button className="text-[var(--primary)] font-medium hover:underline" onClick={() => alert('Detalhes do projeto seriam exibidos aqui')}>
                  Ver detalhes →
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="/placeholder-project2.jpg" 
                alt="Centro Empresarial Horizonte" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <span className="inline-block bg-[var(--primary)] text-white text-sm px-3 py-1 rounded-full mb-3">
                  Projeto Estrutural
                </span>
                <h3 className="text-xl font-bold mb-2">Centro Empresarial Horizonte</h3>
                <p className="text-gray-600 mb-4">
                  Projeto estrutural e consultoria técnica para edifício comercial de 12 andares, 
                  com soluções inovadoras para otimização de espaço.
                </p>
                <button className="text-[var(--primary)] font-medium hover:underline" onClick={() => alert('Detalhes do projeto seriam exibidos aqui')}>
                  Ver detalhes →
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="/placeholder-project3.jpg" 
                alt="Condomínio Parque das Flores" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <span className="inline-block bg-[var(--primary)] text-white text-sm px-3 py-1 rounded-full mb-3">
                  Laudo Técnico
                </span>
                <h3 className="text-xl font-bold mb-2">Condomínio Parque das Flores</h3>
                <p className="text-gray-600 mb-4">
                  Laudo técnico e projeto de recuperação estrutural para condomínio residencial com 
                  problemas de infiltração e fissuras.
                </p>
                <button className="text-[var(--primary)] font-medium hover:underline" onClick={() => alert('Detalhes do projeto seriam exibidos aqui')}>
                  Ver detalhes →
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="/placeholder-project4.jpg" 
                alt="Edifício Comercial Aurora" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <span className="inline-block bg-[var(--primary)] text-white text-sm px-3 py-1 rounded-full mb-3">
                  Projeto Arquitetônico
                </span>
                <h3 className="text-xl font-bold mb-2">Edifício Comercial Aurora</h3>
                <p className="text-gray-600 mb-4">
                  Projeto arquitetônico para edifício comercial com fachada moderna e sustentável, 
                  incluindo sistema de captação de água da chuva.
                </p>
                <button className="text-[var(--primary)] font-medium hover:underline" onClick={() => alert('Detalhes do projeto seriam exibidos aqui')}>
                  Ver detalhes →
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="/placeholder-project5.jpg" 
                alt="Residência Moderna" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <span className="inline-block bg-[var(--primary)] text-white text-sm px-3 py-1 rounded-full mb-3">
                  Projeto Completo
                </span>
                <h3 className="text-xl font-bold mb-2">Residência Moderna</h3>
                <p className="text-gray-600 mb-4">
                  Projeto arquitetônico e estrutural para residência de alto padrão, com design 
                  contemporâneo e integração com a natureza.
                </p>
                <button className="text-[var(--primary)] font-medium hover:underline" onClick={() => alert('Detalhes do projeto seriam exibidos aqui')}>
                  Ver detalhes →
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="/placeholder-project6.jpg" 
                alt="Shopping Center Plaza" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <span className="inline-block bg-[var(--primary)] text-white text-sm px-3 py-1 rounded-full mb-3">
                  Convênio de Condomínio
                </span>
                <h3 className="text-xl font-bold mb-2">Shopping Center Plaza</h3>
                <p className="text-gray-600 mb-4">
                  Gestão técnica e consultoria para shopping center, incluindo plano de manutenção 
                  preventiva e corretiva das instalações.
                </p>
                <button className="text-[var(--primary)] font-medium hover:underline" onClick={() => alert('Detalhes do projeto seriam exibidos aqui')}>
                  Ver detalhes →
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button 
              className="btn btn-primary"
              onClick={() => alert('Mais projetos seriam carregados aqui')}
            >
              Carregar mais projetos
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--secondary)]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Categorias de Projetos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-[var(--primary)] mb-4 flex justify-center">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Residenciais</h3>
              <p className="text-gray-600 mb-4">
                Casas, apartamentos e condomínios residenciais.
              </p>
              <button className="text-[var(--primary)] font-medium hover:underline" onClick={() => alert('Projetos residenciais seriam exibidos aqui')}>
                Ver projetos
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-[var(--primary)] mb-4 flex justify-center">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Comerciais</h3>
              <p className="text-gray-600 mb-4">
                Escritórios, lojas e edifícios comerciais.
              </p>
              <button className="text-[var(--primary)] font-medium hover:underline" onClick={() => alert('Projetos comerciais seriam exibidos aqui')}>
                Ver projetos
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-[var(--primary)] mb-4 flex justify-center">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Industriais</h3>
              <p className="text-gray-600 mb-4">
                Galpões, fábricas e instalações industriais.
              </p>
              <button className="text-[var(--primary)] font-medium hover:underline" onClick={() => alert('Projetos industriais seriam exibidos aqui')}>
                Ver projetos
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-[var(--primary)] mb-4 flex justify-center">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Institucionais</h3>
              <p className="text-gray-600 mb-4">
                Escolas, hospitais e edifícios públicos.
              </p>
              <button className="text-[var(--primary)] font-medium hover:underline" onClick={() => alert('Projetos institucionais seriam exibidos aqui')}>
                Ver projetos
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Tem um projeto em mente?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Entre em contato conosco para discutir seu próximo projeto e descobrir como podemos ajudar a transformar suas ideias em realidade.
          </p>
          <a href="/contato" className="btn bg-white text-[var(--primary)] hover:bg-gray-100">
            Solicitar Orçamento
          </a>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
