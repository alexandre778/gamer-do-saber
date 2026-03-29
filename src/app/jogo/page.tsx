'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Opcao from '../../components/Opcao';

export default function Jogo() {
  const [nome, setNome] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem('nome');
    if (!storedName) {
      router.push('/');
    } else {
      setNome(storedName);
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-blue-100 text-center p-6">
      <div className="flex justify-start max-w-5xl mx-auto mb-6">
        <button
          onClick={() => router.push('/')}
          className="bg-white px-5 py-2 rounded-2xl shadow-md hover:scale-105 transition-transform font-bold text-blue-600 flex items-center gap-2"
        >
          ⬅ Voltar
        </button>
      </div>

      <h1 className="text-4xl font-bold text-blue-900 mb-2">Olá, {nome}! 👋</h1>
      <h2 className="text-xl text-blue-700 mb-10">
        Escolha uma opção para começar!
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <Opcao titulo="Vogais" tipo="vogais" />
        <Opcao titulo="Consoantes" tipo="consoantes" />
        <Opcao titulo="Alfabeto" tipo="alfabeto" />
        <Opcao titulo="Números" tipo="numeros" />
        <Opcao titulo="Cores" tipo="cores" />
        <Opcao titulo="Tabuada" tipo="tabuada" />
      </div>
    </div>
  );
}
