"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function NPSPage() {
  const [nps, setNps] = useState<number | null>(null);
  const [loja, setLoja] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const handleNPS = async () => {
      try {
        const npsParam = params.nps as string;
        const lojaParam = params.Loja as string;

        if (!npsParam || !lojaParam) {
          throw new Error("Missing NPS or loja parameter");
        }

        const parsedNps = Number.parseInt(npsParam, 10);
        if (isNaN(parsedNps)) {
          throw new Error(`Invalid NPS value: ${npsParam}`);
        }

        setNps(parsedNps);
        setLoja(lojaParam);

        const response = await fetch("/api/save-nps", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nps: parsedNps, loja: lojaParam }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorText}`
          );
        }

        const data = await response.json();
        if (!data.surveyId) {
          throw new Error("Survey ID not returned from API");
        }

        router.push(
          `/?Id=${data.surveyId}&store=${encodeURIComponent(lojaParam)}`
   
        );
      } catch (error) {
        console.error("Erro ao processar o NPS:", error);
         setError(error instanceof Error ? error.message : String(error));
      }
    };

    handleNPS();
  }, [router, params]);

  if (error) {
    return (
      <div>
        <h1>Erro</h1>
        <p>{error}</p>
        <button onClick={() => router.push("/")}>
          Voltar para a página inicial
        </button>
      </div>
    );
  }

  return (
    <div>
      {nps !== null && loja !== null ? (
        <p>
          NPS recebido: {nps} para a loja: {loja}
        </p>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
