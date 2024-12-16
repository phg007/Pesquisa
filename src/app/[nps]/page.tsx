'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Params {
  nps: string;
}

export default function NPSPage({ params }: { params: Promise<Params> }) {
  const [nps, setNps] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleNPS = async () => {
      try {
        // Garante que o código só executa no cliente
        if (typeof window === 'undefined') return;

        const resolvedParams = await params; // Espera a promise ser resolvida
        const parsedNps = parseInt(resolvedParams.nps, 10);
        setNps(parsedNps);

        const response = await fetch('/api/save-nps', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nps: parsedNps }),
        });

        if (response.ok) {
          const { surveyId } = await response.json();
          router.push(`/?Id=${surveyId}`);
        } else {
          throw new Error('Erro ao salvar NPS');
        }
      } catch (error) {
        console.error('Erro ao processar o NPS:', error);
        router.push('/');
      }
    };

    handleNPS();
  }, [params, router]);

  return (
    <div>
      {nps !== null ? (
        <p>NPS recebido: {nps}</p>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
