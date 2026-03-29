'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Tabuada() {
  const [resultado, setResultado] = useState<string | null>(null);

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
    setResultado(`${a} x ${b} = ${res}`);
    falar(texto);
  };

  return (
    <div className="min-h-screen bg-green-50 p-8 flex flex-col items-center">
      {/* Título */}
      <h1 className="text-4xl font-bold text-green-800 mb-10 text-center">
        🔢 Tabuada do 1 ao 5
      </h1>

      {/* Grid de contas */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        {multiplicandos.map((a) =>
          multiplicadores.map((b) => (
            <button
              key={`${a}-${b}`}
              onClick={() => calcular(a, b)}
              className="bg-white w-24 h-20 rounded-2xl shadow-md text-xl font-bold text-green-700 hover:scale-110 transition"
            >
              {a} x {b}
            </button>
          )),
        )}
      </div>

      {/* Resultado */}
      {resultado && (
        <div className="text-3xl font-bold text-green-900 mb-8 bg-white px-6 py-4 rounded-xl shadow-lg">
          {resultado}
        </div>
      )}

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
