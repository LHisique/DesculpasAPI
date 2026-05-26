import React from 'react';

function SobreProjeto() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-bold mb-6 text-brand border-b pb-2">Sobre o Projeto</h2>
      
      <div className="space-y-6 text-gray-700">
        <p>
          O <strong>Sistema de Desculpas</strong> foi concebido como parte da avaliação (B2) da disciplina. 
          O objetivo é colocar em prática conceitos modernos de desenvolvimento Web abordando as camadas de Frontend e Backend.
        </p>
        
        <h3 className="text-xl font-semibold text-gray-800">Tecnologias Utilizadas</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Front-end:</strong> React, Vite, Tailwind CSS para estilização e Axios para consumo de API.</li>
          <li><strong>Back-end:</strong> PHP Orientado a Objetos (POO), arquitetura baseada na classe Db/PDO para segurança.</li>
          <li><strong>Banco de Dados:</strong> MySQL relacional, organizando Usuários e Desculpas de forma independente.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-4">Arquitetura</h3>
        <p>
          O sistema separa claramente as responsabilidades. O Front-end atua apenas na interface, enquanto o Back-end fornece endpoints em formato JSON (API Restful), garantindo que a aplicação seja escalável e de fácil manutenção.
        </p>
      </div>
    </div>
  );
}

export default SobreProjeto;
