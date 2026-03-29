'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Cores() {
  const [idioma, setIdioma] = useState('pt-BR');
  const cores = [
    { nome: 'Vermelho', en: 'Red', classe: 'bg-red-500' },
    { nome: 'Azul', en: 'Blue', classe: 'bg-blue-500' },
    { nome: 'Amarelo', en: 'Yellow', classe: 'bg-yellow-400' },
    { nome: 'Verde', en: 'Green', classe: 'bg-green-500' },
    { nome: 'Laranja', en: 'Orange', classe: 'bg-orange-500' },
    { nome: 'Roxo', en: 'Purple', classe: 'bg-purple-600' },
    { nome: 'Rosa', en: 'Pink', classe: 'bg-pink-500' },
    { nome: 'Marrom', en: 'Brown', classe: 'bg-amber-900' },
    { nome: 'Preto', en: 'Black', classe: 'bg-black' },
    { nome: 'Cinza', en: 'Gray', classe: 'bg-gray-500' },
    { nome: 'Ciano', en: 'Cyan', classe: 'bg-cyan-400' },
    { nome: 'Lima', en: 'Lime', classe: 'bg-lime-500' },
    {
      nome: 'Branco',
      en: 'White',
      classe: 'bg-white !text-black border-2 border-gray-200',
    },
  ];

  // Fala o nome da cor usando a voz do navegador
  const falarCor = (nome: string) => {
    const mensagem = new SpeechSynthesisUtterance(nome);
    mensagem.lang = idioma;
    window.speechSynthesis.cancel(); // evita sobreposição de áudio
    window.speechSynthesis.speak(mensagem);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8 flex flex-col items-center">
      {/* Título */}
      <h1 className="text-4xl font-bold text-blue-800 mb-12 text-center">
        Vamos aprender as Cores! 🎨
      </h1>

      {/* Botões de idioma */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setIdioma('pt-BR')}
          className={`px-6 py-2 rounded-xl font-bold shadow-md transition-all ${
            idioma === 'pt-BR'
              ? 'bg-blue-600 text-white scale-105'
              : 'bg-white text-blue-600 border-2 border-blue-200 hover:bg-blue-50'
          }`}
        >
          🇧🇷 Português
        </button>
        <button
          onClick={() => setIdioma('en-US')}
          className={`px-6 py-2 rounded-xl font-bold shadow-md transition-all ${
            idioma === 'en-US'
              ? 'bg-blue-600 text-white scale-105'
              : 'bg-white text-blue-600 border-2 border-blue-200 hover:bg-blue-50'
          }`}
        >
          🇺🇸 Inglês
        </button>
      </div>

      {/* Botões das cores */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {cores.map((cor) => {
          const nomeExibido = idioma === 'pt-BR' ? cor.nome : cor.en;
          return (
            <button
              key={cor.nome}
              onClick={() => falarCor(nomeExibido)}
              className={`${cor.classe} w-32 h-32 md:w-40 md:h-40 rounded-3xl shadow-xl flex items-center justify-center text-white text-xl md:text-2xl font-bold hover:scale-110 active:scale-95 transition-transform border-b-8 border-black/20`}
            >
              {nomeExibido}
            </button>
          );
        })}
      </div>

      {/* Botão voltar para opções */}
      <Link
        href="/jogo"
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-2xl shadow-lg transition-colors flex items-center gap-2 text-xl"
      >
        <span>🏠</span> Voltar para Opções
      </Link>
    </div>
  );
}
