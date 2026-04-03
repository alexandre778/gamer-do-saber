'use client';

import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();

  // 🔊 Som de clique (efeito game)
  const tocarSomClick = () => {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
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

  const ir = (rota: string) => {
    tocarSomClick(); // 🔊 toca som
    router.push(rota); // 🚀 navega
  };

  return (
    <div className="w-full md:w-64 md:h-screen bg-blue-900 text-white p-4 flex flex-col gap-2 md:gap-4 overflow-y-auto border-b-4 md:border-b-0 md:border-r-4 border-blue-800">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-2 md:mb-4">
        🎮 Menu
      </h2>

      <div className="flex md:flex-col flex-row flex-wrap gap-2 md:gap-4 justify-center">
        <button
          onClick={() => ir('/jogo/vogais')}
          className="btn flex-1 min-w-[120px] md:w-full py-2 md:py-3 text-sm md:text-base"
        >
          🔤 Vogais
        </button>
        <button
          onClick={() => ir('/jogo/consoantes')}
          className="btn flex-1 min-w-[120px] md:w-full py-2 md:py-3 text-sm md:text-base"
        >
          🔡 Consoantes
        </button>
        <button
          onClick={() => ir('/jogo/alfabeto')}
          className="btn flex-1 min-w-[120px] md:w-full py-2 md:py-3 text-sm md:text-base"
        >
          📚 Alfabeto
        </button>
        <button
          onClick={() => ir('/jogo/numeros')}
          className="btn flex-1 min-w-[120px] md:w-full py-2 md:py-3 text-sm md:text-base"
        >
          🔢 Números
        </button>
        <button
          onClick={() => ir('/jogo/cores')}
          className="btn flex-1 min-w-[120px] md:w-full py-2 md:py-3 text-sm md:text-base"
        >
          🎨 Cores
        </button>
        <button
          onClick={() => ir('/jogo/tabuada')}
          className="btn flex-1 min-w-[120px] md:w-full py-2 md:py-3 text-sm md:text-base"
        >
          ✖️ Tabuada
        </button>
        <button
          onClick={() => ir('/jogo/libras')}
          className="btn flex-1 min-w-[120px] md:w-full py-2 md:py-3 text-sm md:text-base"
        >
          🤟 Libras
        </button>
      </div>
    </div>
  );
}
