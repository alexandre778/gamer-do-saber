'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Tabuada() {
  const [idAtivo, setIdAtivo] = useState<string | null>(null);

  const multiplicandos = [1, 2, 3, 4, 5];
  const multiplicadores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Função para falar a conta
  const falar = (texto: string) => {
    const msg = new SpeechSynthesisUtterance(texto);
    msg.lang = 'pt-BR';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
  };

  // Quando clicar na conta
  const calcular = (a: number, b: number) => {
    const res = a * b;
    const texto = `${a} vezes ${b} é igual a ${res}`;
    setIdAtivo(`${a}-${b}`);
    falar(texto);
  };

  return (
    <div className="min-h-screen bg-green-50 p-8 flex flex-col items-center">
      {/* Título */}
      <h1 className="text-4xl font-bold text-green-800 mb-10 text-center">
        🔢 Tabuada do 1 ao 5
      </h1>

      {/* Colunas de Tabuada */}
      <div className="flex flex-wrap justify-center gap-6 mb-12">
        {multiplicandos.map((a) => (
          <div
            key={a}
            className="flex flex-col gap-3 bg-white p-4 rounded-3xl shadow-xl border-b-8 border-green-200"
          >
            <h2 className="text-2xl font-extrabold text-green-600 text-center mb-2">
              Tabuada do {a}
            </h2>
            {multiplicadores.map((b) => (
              <button
                key={`${a}-${b}`}
                onClick={() => calcular(a, b)}
                className="bg-green-50 min-w-[140px] h-14 rounded-xl text-lg font-bold text-green-700 hover:scale-105 active:scale-95 transition-transform border-2 border-green-100 px-2"
              >
                {a} x {b}
                {idAtivo === `${a}-${b}` ? ` = ${a * b}` : ''}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Botão voltar */}
      <Link
        href="/jogo"
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-2xl shadow-lg transition"
      >
        ⬅ Voltar para Opções
      </Link>
    </div>
  );
}
