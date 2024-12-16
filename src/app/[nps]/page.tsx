'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NPSPage({ params }: { params: Promise<{ nps: string }> }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nps, setNps] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Função para lidar com a Promise
    const getParams = async () => {
      try {
        const resolvedParams = await params;  // Espera a Promise ser resolvida
        const parsedNps = parseInt(resolvedParams.nps, 10);

        // Atualiza o estado com o valor de NPS
        setNps(parsedNps);

        // Envia o NPS para a API
        const response = await fetch('/api/save-nps', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nps: parsedNps }),
        });

        if (response.ok) {
          const { surveyId } = await response.json();
          // Redireciona para a página principal com o `surveyId`
          router.push(`/?Id=${surveyId}`);
        } else {
          console.error('Erro ao salvar NPS.');
          router.push('/'); // Redireciona em caso de erro
        }
      } catch (error) {
        console.error('Erro na API:', error);
        router.push('/');
      }
    };

    getParams();
  }, [params, router]);

 
}
