import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div>
      <section className="bg-[var(--primary)] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Quem Somos</h1>
          <p className="text-xl max-w-3xl">
            A EFFE Engenharia e Construções é uma empresa especializada em projetos arquitetônicos, 
            estruturais, convênios de condomínio e elaboração de laudos técnicos.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Nossa História</h2>
              <p className="mb-4">
                Fundada em 2010 por um grupo de engenheiros e arquitetos com vasta experiência no mercado, 
                a EFFE Engenharia nasceu com o propósito de oferecer soluções completas e inovadoras em 
                engenharia e construção.
              </p>
              <p className="mb-4">
                Ao longo dos anos, construímos uma reputação sólida baseada na excelência técnica, 
                comprometimento com prazos e atenção aos detalhes. Nossa equipe multidisciplinar 
                trabalha em conjunto para garantir que cada projeto seja executado com o mais alto 
                padrão de qualidade.
              </p>
              <p>
                Hoje, somos reconhecidos como referência no mercado, atendendo clientes em todo o 
                Brasil e contribuindo para o desenvolvimento de projetos que transformam o ambiente 
                urbano e a vida das pessoas.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="bg-[var(--secondary)] p-4 rounded-lg shadow-lg">
                <img 
                  src="/placeholder-office.jpg" 
                  alt="Escritório EFFE Engenharia" 
                  className="w-full h-auto rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--secondary)]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Nossos Valores</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-[var(--primary)] mb-4 flex justify-center">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Excelência</h3>
              <p className="text-gray-600">
                Buscamos a excelência em tudo o que fazemos, desde o atendimento ao cliente até a 
                entrega final do projeto, garantindo sempre o mais alto padrão de qualidade.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-[var(--primary)] mb-4 flex justify-center">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Colaboração</h3>
              <p className="text-gray-600">
                Acreditamos no poder do trabalho em equipe e na colaboração com nossos clientes para 
                alcançar os melhores resultados e superar expectativas.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-[var(--primary)] mb-4 flex justify-center">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Inovação</h3>
              <p className="text-gray-600">
                Estamos sempre em busca de soluções inovadoras e sustentáveis, utilizando as mais 
                recentes tecnologias e metodologias para oferecer o melhor aos nossos clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Nossa Equipe</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden w-48 h-48 mx-auto">
                <img 
                  src="/placeholder-person1.jpg" 
                  alt="João Silva" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">João Silva</h3>
              <p className="text-[var(--primary)]">Diretor de Engenharia</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden w-48 h-48 mx-auto">
                <img 
                  src="/placeholder-person2.jpg" 
                  alt="Maria Oliveira" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Maria Oliveira</h3>
              <p className="text-[var(--primary)]">Arquiteta Chefe</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden w-48 h-48 mx-auto">
                <img 
                  src="/placeholder-person3.jpg" 
                  alt="Carlos Santos" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Carlos Santos</h3>
              <p className="text-[var(--primary)]">Engenheiro Estrutural</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden w-48 h-48 mx-auto">
                <img 
                  src="/placeholder-person4.jpg" 
                  alt="Ana Pereira" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Ana Pereira</h3>
              <p className="text-[var(--primary)]">Gerente de Projetos</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Vamos trabalhar juntos?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Entre em contato conosco para discutir seu próximo projeto e descobrir como podemos ajudar a transformar suas ideias em realidade.
          </p>
          <a href="/contato" className="btn bg-white text-[var(--primary)] hover:bg-gray-100">
            Fale Conosco
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
