'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// Adicionado o 'Ç' à lista
const ALFABETO = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÇ'.split('');
const NUMEROS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * Componente auxiliar para tratar erros de imagem individualmente
 */
const LibrasImage = ({
  src,
  alt,
  fallbackText,
}: {
  src: string;
  alt: string;
  fallbackText: string;
}) => {
  const [hasError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setImgError(false);
    setIsLoading(true);
  }, [src]);

  if (hasError) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-slate-800 rounded-xl">
        <span className="text-4xl font-black text-blue-500/40 uppercase">
          {fallbackText}
        </span>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 rounded-xl animate-pulse z-10">
          <span className="text-4xl font-black text-slate-600 uppercase">
            {fallbackText}
          </span>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className={`object-contain filter brightness-110 transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onError={() => setImgError(true)}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </>
  );
};

const LibrasIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10 11V6a2 2 0 0 1 4 0v11a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V9.5a1.5 1.5 0 0 1 3 0V11" />
    <path d="M10 11V8.5a1.5 1.5 0 0 1 3 0V11" />
    <path d="M14 11V9a1.5 1.5 0 0 1 3 0v4.5" />
  </svg>
);

const AlfabetoLibras = () => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<{ label: string; src: string } | null>(null);

  const falarLabel = (texto: string) => {
    const mensagem = new SpeechSynthesisUtterance(texto);
    mensagem.lang = 'pt-BR';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(mensagem);
  };

  const modalContentRef = useRef<HTMLDivElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  // Função para tratar o nome do arquivo (especialmente o Ç)
  const getLetterImgPath = (letra: string) => {
    const nomeArquivo = letra === 'Ç' ? 'cedilha' : letra.toLowerCase();
    return `/libras/alfabeto/${nomeArquivo}.jpg`;
  };

  useEffect(() => {
    if (selectedItem) {
      lastFocusedElementRef.current = document.activeElement as HTMLElement;
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') setSelectedItem(null);
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    } else {
      lastFocusedElementRef.current?.focus();
    }
  }, [selectedItem]);

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-100 p-6 md:p-12">
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-300" onClick={() => setSelectedItem(null)}>
          <div ref={modalContentRef} className="bg-slate-900 p-6 rounded-3xl border border-slate-700 max-w-md w-full flex flex-col items-center gap-6 shadow-2xl" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="w-full flex justify-between items-start">
              <div className="flex flex-col">
                <h3 id="modal-title" className="text-3xl font-black text-blue-400">{selectedItem.label}</h3>
                <button onClick={() => falarLabel(selectedItem.label)} className="text-left text-sm text-blue-500 hover:text-blue-400 transition-colors">Ouvir pronúncia 🔊</button>
              </div>
              <button onClick={() => setSelectedItem(null)} className="text-slate-400 hover:text-white text-2xl transition-transform hover:rotate-90 duration-200">✕</button>
            </div>

            <div className="w-full aspect-square bg-white rounded-2xl flex items-center justify-center p-4 relative overflow-hidden">
              <LibrasImage src={selectedItem.src} alt={`Sinal de Libras para ${selectedItem.label}`} fallbackText="?" />
            </div>

            <button onClick={() => setSelectedItem(null)} className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-900/20">
              Entendi! 🤟
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-start mb-8">
          <button onClick={() => router.push('/jogo')} className="bg-slate-800 hover:bg-slate-700 px-5 py-2 rounded-2xl shadow-md hover:scale-105 transition-all font-bold text-blue-400 flex items-center gap-2 border border-slate-700">
            ⬅ Voltar para Opções
          </button>
        </div>

        <header className="mb-16 text-center flex flex-col items-center">
          <div className="bg-blue-500/10 p-4 rounded-3xl mb-4 border border-blue-500/20 shadow-inner">
            <LibrasIcon className="w-12 h-12 text-blue-400" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent uppercase">
            Dicionário Visual LIBRAS
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Toque em um sinal para ver detalhes</p>
        </header>

        {/* Seção Alfabeto */}
        <section className="mb-20">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] mb-8 flex items-center gap-4">
            Letras <span className="h-[1px] bg-slate-800 flex-1"></span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {ALFABETO.map((letra) => (
              <button key={letra} className="group relative text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl transition-all active:scale-95"
                onClick={() => setSelectedItem({ label: letra, src: getLetterImgPath(letra) })}>
                <div className="relative bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col items-center transition-all duration-300 group-hover:-translate-y-2 group-hover:border-slate-600 group-hover:shadow-xl group-hover:shadow-blue-900/10">
                  <div className="w-full aspect-square bg-white rounded-xl mb-4 flex items-center justify-center p-2 relative overflow-hidden">
                    <LibrasImage src={getLetterImgPath(letra)} alt={`Sinal da letra ${letra}`} fallbackText={letra} />
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 w-full py-2 rounded-lg text-center transition-colors group-hover:bg-blue-500/20">
                    <span className="text-2xl font-black text-blue-400">{letra}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Seção Números */}
        <section>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] mb-8 flex items-center gap-4">
            Números <span className="h-[1px] bg-slate-800 flex-1"></span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
            {NUMEROS.map((num) => (
              <button key={num} className="group relative text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-2xl transition-all active:scale-95"
                onClick={() => setSelectedItem({ label: `Número ${num}`, src: `/libras/numeros/${num}.jpg` })}>
                <div className="relative bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col items-center transition-all duration-300 group-hover:-translate-y-2 group-hover:border-slate-600 group-hover:shadow-xl group-hover:shadow-emerald-900/10">
                  <div className="w-full aspect-square bg-white rounded-xl mb-4 flex items-center justify-center p-2 relative overflow-hidden">
                    <LibrasImage src={`/libras/numeros/${num}.jpg`} alt={`Sinal do número ${num}`} fallbackText={num} />
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 w-full py-2 rounded-lg text-center transition-colors group-hover:bg-emerald-500/20">
                    <span className="text-2xl font-black text-emerald-400">{num}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AlfabetoLibras;
