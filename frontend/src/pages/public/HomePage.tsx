import React from 'react';

// Componentes da página inicial
const Hero = () => (
  <section className="bg-[var(--primary)] text-white py-20">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Soluções completas em Engenharia e Construção
          </h1>
          <p className="text-xl mb-8">
            Projetos arquitetônicos, estruturais, laudos técnicos e convênios de condomínio com excelência e qualidade.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/contato" className="btn bg-white text-[var(--primary)] hover:bg-gray-100">
              Solicite um orçamento
            </a>
            <a href="/servicos" className="btn border border-white text-white hover:bg-white hover:text-[var(--primary)]">
              Conheça nossos serviços
            </a>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="bg-white p-2 rounded-lg shadow-lg">
            <img 
              src="/placeholder-building.jpg" 
              alt="Projeto EFFE Engenharia" 
              className="w-full h-auto rounded"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Services = () => (
  <section className="py-16 bg-[var(--secondary)]">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Nossos Serviços</h2>
        <p className="text-lg max-w-3xl mx-auto">
          Oferecemos soluções completas em engenharia para atender às suas necessidades com qualidade e eficiência.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="text-[var(--primary)] mb-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Projetos Arquitetônicos</h3>
          <p className="text-gray-600">
            Desenvolvimento de projetos residenciais, comerciais e industriais com foco em funcionalidade e estética.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="text-[var(--primary)] mb-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Projetos Estruturais</h3>
          <p className="text-gray-600">
            Cálculos e projetos estruturais para garantir segurança e durabilidade em suas construções.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="text-[var(--primary)] mb-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Laudos Técnicos</h3>
          <p className="text-gray-600">
            Elaboração de laudos técnicos para avaliação de imóveis, perícias e vistorias com rigor técnico.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="text-[var(--primary)] mb-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Convênios de Condomínio</h3>
          <p className="text-gray-600">
            Gestão técnica e consultoria para condomínios, incluindo manutenção preventiva e corretiva.
          </p>
        </div>
      </div>
      
      <div className="text-center mt-10">
        <a href="/servicos" className="btn btn-primary">
          Ver todos os serviços
        </a>
      </div>
    </div>
  </section>
);

const Projects = () => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Projetos Realizados</h2>
        <p className="text-lg max-w-3xl mx-auto">
          Conheça alguns dos nossos projetos e veja como podemos transformar suas ideias em realidade.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          <img 
            src="/placeholder-project1.jpg" 
            alt="Projeto Residencial" 
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">Residencial Vila Nova</h3>
            <p className="text-gray-600 mb-4">
              Projeto arquitetônico e estrutural para condomínio residencial com 24 unidades.
            </p>
            <a href="/projetos" className="text-[var(--primary)] font-medium hover:underline">
              Ver detalhes →
            </a>
          </div>
        </div>
        
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          <img 
            src="/placeholder-project2.jpg" 
            alt="Projeto Comercial" 
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">Centro Empresarial Horizonte</h3>
            <p className="text-gray-600 mb-4">
              Projeto estrutural e consultoria técnica para edifício comercial de 12 andares.
            </p>
            <a href="/projetos" className="text-[var(--primary)] font-medium hover:underline">
              Ver detalhes →
            </a>
          </div>
        </div>
        
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          <img 
            src="/placeholder-project3.jpg" 
            alt="Laudo Técnico" 
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">Condomínio Parque das Flores</h3>
            <p className="text-gray-600 mb-4">
              Laudo técnico e projeto de recuperação estrutural para condomínio residencial.
            </p>
            <a href="/projetos" className="text-[var(--primary)] font-medium hover:underline">
              Ver detalhes →
            </a>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-10">
        <a href="/projetos" className="btn btn-primary">
          Ver todos os projetos
        </a>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-16 bg-[var(--secondary)]">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">O que nossos clientes dizem</h2>
        <p className="text-lg max-w-3xl mx-auto">
          A satisfação de nossos clientes é o nosso maior reconhecimento.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="text-yellow-400 flex">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            "A EFFE Engenharia superou todas as nossas expectativas. O projeto estrutural foi entregue no prazo e com excelente qualidade técnica. Recomendo fortemente."
          </p>
          <div className="font-medium">
            <p className="text-[var(--primary)]">Carlos Silva</p>
            <p className="text-gray-500 text-sm">Construtora Horizonte</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="text-yellow-400 flex">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            "O laudo técnico elaborado pela EFFE foi fundamental para identificarmos os problemas estruturais do nosso condomínio. Profissionais extremamente competentes."
          </p>
          <div className="font-medium">
            <p className="text-[var(--primary)]">Ana Oliveira</p>
            <p className="text-gray-500 text-sm">Síndica do Condomínio Parque das Flores</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="text-yellow-400 flex">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            "Contratamos a EFFE para o projeto arquitetônico da nossa casa e ficamos impressionados com a criatividade e atenção aos detalhes. O resultado final superou nossas expectativas."
          </p>
          <div className="font-medium">
            <p className="text-[var(--primary)]">Roberto e Márcia Santos</p>
            <p className="text-gray-500 text-sm">Clientes Residenciais</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ContactCTA = () => (
  <section className="py-16 bg-[var(--primary)] text-white">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Pronto para iniciar seu projeto?</h2>
      <p className="text-xl mb-8 max-w-3xl mx-auto">
        Entre em contato conosco hoje mesmo e descubra como podemos ajudar a transformar suas ideias em realidade.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <a href="/contato" className="btn bg-white text-[var(--primary)] hover:bg-gray-100">
          Solicitar orçamento
        </a>
        <a href="/contato" className="btn border border-white text-white hover:bg-white hover:text-[var(--primary)]">
          Fale conosco
        </a>
      </div>
    </div>
  </section>
);

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Projects />
      <Testimonials />
      <ContactCTA />
    </div>
  );
};

export default HomePage;
