"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function NPSPage() {
  const [nps, setNps] = useState<number | null>(null);
  const [param, setParam] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams(); // Captura os parâmetros da URL

  useEffect(() => {
    const handleNPS = async () => {
      try {
        if (!params?.nps) return; // Verifica se o parâmetro está presente

        const parsedNps = parseInt(params.nps as string, 10);
        setNps(parsedNps);
        setParam(params.param as string);

        const response = await fetch("/api/save-nps", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nps: parsedNps }),
        });

        if (response.ok) {
          const { surveyId } = await response.json();
          router.push(`/?Id=${surveyId}&param=${params.param}`);
        } else {
          throw new Error("Erro ao salvar NPS");
        }
      } catch (error) {
        console.error("Erro ao processar o NPS:", error);
        router.push("/");
      }
    };

    handleNPS();
  }, [params, router]);

  return (
    <div>
      {nps !== null ? <p>NPS recebido: {nps}</p> : <p>Carregando...</p>}
    </div>
  );
}
