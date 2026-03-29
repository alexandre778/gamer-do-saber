'use client';

import { useRouter } from 'next/navigation';

interface OpcaoProps {
  titulo: string;
  tipo: 'vogais' | 'consoantes' | 'alfabeto' | 'numeros' | 'cores' | 'tabuada';
}

export default function Opcao({ titulo, tipo }: OpcaoProps) {
  const router = useRouter();

  const icones = {
    vogais: '🔤',
    consoantes: '🔡',
    alfabeto: '📚',
    numeros: '🔢',
    cores: '🎨',
    tabuada: '✖️',
  };

  // 🔊 Som de clique (efeito game) - Mantendo consistência com o Sidebar
  const tocarSomClick = () => {
    const AudioContextClass =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.1);
  };

  const irParaJogo = () => {
    tocarSomClick();
    router.push(`/jogo/${tipo}`);
  };

  return (
    <div
      onClick={irParaJogo}
      className="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-lg hover:scale-105 transition-transform cursor-pointer flex flex-col items-center gap-2 md:gap-4 border-b-4 md:border-b-8 border-blue-200 w-full"
    >
      <span className="text-4xl md:text-6xl">{icones[tipo]}</span>
      <h3 className="text-xl md:text-2xl font-bold text-blue-800 text-center">
        {titulo}
      </h3>
    </div>
  );
}
