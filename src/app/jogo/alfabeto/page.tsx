'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Alfabeto() {
  const [idioma, setIdioma] = useState('pt-BR');
  const alfabeto = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  // Fala a letra usando a voz do navegador
  const falarLetra = (letra: string) => {
    const mensagem = new SpeechSynthesisUtterance(letra);
    mensagem.lang = idioma;
    window.speechSynthesis.cancel(); // evita sobreposição de áudio
    window.speechSynthesis.speak(mensagem);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8 flex flex-col items-center">
      {/* Título */}
      <h1 className="text-4xl font-bold text-blue-800 mb-12 text-center">
        {idioma === 'pt-BR'
          ? 'Vamos aprender o Alfabeto! 🎨'
          : "Let's learn the Alphabet! 🎨"}
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

      {/* Botões do alfabeto */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6 mb-12">
        {alfabeto.map((letra) => (
          <button
            key={letra}
            onClick={() => falarLetra(letra)}
            className="w-28 h-28 md:w-32 md:h-32 bg-white rounded-3xl shadow-xl flex items-center justify-center text-6xl md:text-7xl font-bold text-blue-600 hover:scale-110 active:scale-95 transition-transform border-b-8 border-blue-200"
          >
            {letra}
          </button>
        ))}
      </div>

      {/* Botão voltar para opções */}
      <Link
        href="/jogo"
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-2xl shadow-lg transition-colors flex items-center gap-2 text-xl"
      >
        <span>🏠</span>{' '}
        {idioma === 'pt-BR' ? 'Voltar para Opções' : 'Back to Options'}
      </Link>
    </div>
  );
}
