import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: Request) {
  try {
    // Tenta ler o corpo JSON da requisição

    const body = await req.json();

    // Verifique se a chave 'nps' existe no corpo da requisição
    if (!body.nps) {
      throw new Error('A chave "nps" está faltando no corpo da requisição.');
    }

    const { nps } = body;
    const { loja } = body;
    const otherSupermarket = loja === "loja" ? "" : loja;
    const { source } = body;

    // Insere o NPS no banco
    const result = await query<{ insertId: number }>(
      "INSERT INTO surveys (nps, other_supermarket , created_at, tipo) VALUES (?,?, NOW(),?)",
      [nps, otherSupermarket, source]
    );

    // Retorna o ID da pesquisa gerado
    const surveyId = result.insertId;
    return NextResponse.json({ surveyId });
  } catch (error) {
    console.error("Erro no banco de dados:", error);
    return NextResponse.json(
      { error: " error Ao salvar no banco  " },
      { status: 500 }
    );
  }
}
