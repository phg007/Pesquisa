import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    // Tenta ler o corpo JSON da requisição
    const body = await req.json();

    // Verifique se a chave 'nps' existe no corpo da requisição
    if (!body.nps) {
      throw new Error('A chave "nps" está faltando no corpo da requisição.');
    }

    const { nps } = body;

    // Insere o NPS no banco
    const result = await query<{ insertId: number }>(
      'INSERT INTO surveys (nps, created_at) VALUES (?, NOW())',
      [nps]
    );

    // Retorna o ID da pesquisa gerado
    const surveyId = result.insertId;
    return NextResponse.json({ surveyId });
  } catch (error) {
    console.error('Erro no banco de dados:', error);
    return NextResponse.json({ error:" error Ao salvar no banco  "}, { status: 500 });
  }
}
