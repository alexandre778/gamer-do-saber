'use client';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function Home() {
  const [nome, setNome] = useState('');
  const router = useRouter();

  const iniciar = (e: FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) return alert('Digite seu nome!');
    localStorage.setItem('nome', nome);
    router.push('/jogo');
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 to-pink-400">
      <h1 className="text-4xl font-bold text-white mb-6">🎮 Gamer do Saber</h1>

      <form onSubmit={iniciar} className="flex flex-col items-center">
        <input
          className="p-3 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          aria-label="Digite seu nome"
        />

        <button
          type="submit"
          className="mt-4 bg-yellow-400 px-6 py-3 rounded-2xl text-xl hover:scale-110 active:scale-95 transition"
        >
          Começar 🚀
        </button>
      </form>
    </div>
  );
}
