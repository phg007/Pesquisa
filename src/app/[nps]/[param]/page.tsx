"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Params {
  nps: string;
  param: string;
}

export default function NPSPage({ params }: { params: Params }) {
  const [nps, setNps] = useState<number | null>(null);
  const [param, setParam] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleNPS = async () => {
      try {
        if (typeof window === "undefined") return;

        const parsedNps = parseInt(params.nps, 10);
        setNps(parsedNps);
        setParam(params.param);

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
