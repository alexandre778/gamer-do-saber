'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Numeros() {
  const [idioma, setIdioma] = useState('pt-BR');
  const numeros = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  // Fala o número usando a voz do navegador
  const falarNumero = (num: string) => {
    const mensagem = new SpeechSynthesisUtterance(num);
    mensagem.lang = idioma;
    window.speechSynthesis.cancel(); // evita sobreposição de áudio
    window.speechSynthesis.speak(mensagem);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8 flex flex-col items-center">
      {/* Título */}
      <h1 className="text-4xl font-bold text-blue-800 mb-12 text-center">
        Vamos aprender os Números! 🎨
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

      {/* Botões dos números */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
        {numeros.map((num) => (
          <button
            key={num}
            onClick={() => falarNumero(num)}
            className="w-32 h-32 bg-white rounded-3xl shadow-xl flex items-center justify-center text-7xl font-bold text-blue-600 hover:scale-110 active:scale-95 transition-transform border-b-8 border-blue-200"
          >
            {num}
          </button>
        ))}
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
