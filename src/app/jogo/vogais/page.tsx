'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Vogais() {
  const [idioma, setIdioma] = useState('pt-BR');
  const vogais = ['A', 'E', 'I', 'O', 'U'];

  // Fala a vogal usando a voz do navegador
  const falarVogal = (letra: string) => {
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
          ? 'Vamos aprender as Vogais! 🎨'
          : "Let's learn the Vowels! 🎨"}
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

      {/* Botões das vogais */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
        {vogais.map((letra) => (
          <button
            key={letra}
            onClick={() => falarVogal(letra)}
            className="w-32 h-32 bg-white rounded-3xl shadow-xl flex items-center justify-center text-7xl font-bold text-blue-600 hover:scale-110 active:scale-95 transition-transform border-b-8 border-blue-200"
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
