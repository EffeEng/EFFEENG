import React from 'react';

const ServicesPage: React.FC = () => {
  return (
    <div>
      <section className="bg-[var(--primary)] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Nossos Serviços</h1>
          <p className="text-xl max-w-3xl">
            Oferecemos soluções completas em engenharia para atender às suas necessidades com qualidade e eficiência.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="text-[var(--primary)] mb-4">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Projetos Arquitetônicos</h2>
              <p className="mb-4 text-gray-600">
                Desenvolvemos projetos arquitetônicos completos para residências, edifícios comerciais, 
                industriais e institucionais, com foco na funcionalidade, estética e sustentabilidade.
              </p>
              <p className="mb-4 text-gray-600">
                Nossa equipe de arquitetos trabalha em estreita colaboração com os clientes para 
                entender suas necessidades e transformar suas ideias em projetos viáveis e inovadores.
              </p>
              <h3 className="text-xl font-semibold mb-2">O que incluímos:</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li>Estudo preliminar e anteprojeto</li>
                <li>Projeto legal para aprovação em órgãos competentes</li>
                <li>Projeto executivo detalhado</li>
                <li>Maquetes eletrônicas e renderizações 3D</li>
                <li>Acompanhamento técnico durante a execução</li>
              </ul>
            </div>
            <div className="bg-[var(--secondary)] p-4 rounded-lg shadow-lg self-center">
              <img 
                src="/placeholder-architecture.jpg" 
                alt="Projeto Arquitetônico" 
                className="w-full h-auto rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="order-2 md:order-1 bg-[var(--secondary)] p-4 rounded-lg shadow-lg self-center">
              <img 
                src="/placeholder-structural.jpg" 
                alt="Projeto Estrutural" 
                className="w-full h-auto rounded"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="text-[var(--primary)] mb-4">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Projetos Estruturais</h2>
              <p className="mb-4 text-gray-600">
                Realizamos cálculos e projetos estruturais para garantir a segurança, estabilidade e 
                durabilidade das construções, utilizando as mais avançadas ferramentas de análise e dimensionamento.
              </p>
              <p className="mb-4 text-gray-600">
                Nossos engenheiros estruturais possuem vasta experiência em diferentes tipos de estruturas, 
                desde residências até edifícios de grande porte.
              </p>
              <h3 className="text-xl font-semibold mb-2">O que incluímos:</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li>Análise estrutural completa</li>
                <li>Dimensionamento de elementos estruturais</li>
                <li>Projetos em concreto armado, aço e madeira</li>
                <li>Detalhamento para execução</li>
                <li>Memoriais de cálculo</li>
                <li>Acompanhamento técnico durante a execução</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="text-[var(--primary)] mb-4">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Laudos Técnicos</h2>
              <p className="mb-4 text-gray-600">
                Elaboramos laudos técnicos para avaliação de imóveis, perícias e vistorias, com rigor 
                técnico e imparcialidade, atendendo às normas técnicas e legislações vigentes.
              </p>
              <p className="mb-4 text-gray-600">
                Nossos laudos são reconhecidos por sua qualidade e precisão, sendo aceitos por órgãos 
                públicos, seguradoras e em processos judiciais.
              </p>
              <h3 className="text-xl font-semibold mb-2">Tipos de laudos:</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li>Laudos de vistoria e inspeção predial</li>
                <li>Laudos de avaliação de imóveis</li>
                <li>Laudos de patologia das construções</li>
                <li>Laudos de reforma e recuperação estrutural</li>
                <li>Laudos para seguro e financiamento</li>
                <li>Laudos periciais para processos judiciais</li>
              </ul>
            </div>
            <div className="bg-[var(--secondary)] p-4 rounded-lg shadow-lg self-center">
              <img 
                src="/placeholder-report.jpg" 
                alt="Laudo Técnico" 
                className="w-full h-auto rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="order-2 md:order-1 bg-[var(--secondary)] p-4 rounded-lg shadow-lg self-center">
              <img 
                src="/placeholder-condo.jpg" 
                alt="Convênio de Condomínio" 
                className="w-full h-auto rounded"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="text-[var(--primary)] mb-4">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Convênios de Condomínio</h2>
              <p className="mb-4 text-gray-600">
                Oferecemos serviços de gestão técnica e consultoria para condomínios, incluindo 
                manutenção preventiva e corretiva, vistorias periódicas e planos de manutenção.
              </p>
              <p className="mb-4 text-gray-600">
                Nossa equipe multidisciplinar trabalha para garantir a segurança, conforto e 
                valorização do patrimônio dos condomínios.
              </p>
              <h3 className="text-xl font-semibold mb-2">Serviços incluídos:</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li>Inspeções prediais periódicas</li>
                <li>Elaboração de planos de manutenção</li>
                <li>Assessoria técnica para síndicos e administradores</li>
                <li>Projetos de reforma e modernização</li>
                <li>Laudos técnicos para assembleias</li>
                <li>Acompanhamento de obras e serviços</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Precisa de um serviço personalizado?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Entre em contato conosco para discutir suas necessidades específicas e descobrir como podemos ajudar.
          </p>
          <a href="/contato" className="btn bg-white text-[var(--primary)] hover:bg-gray-100">
            Solicitar Orçamento
          </a>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
