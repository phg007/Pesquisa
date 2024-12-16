import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { nps } = await req.json();

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
    return NextResponse.json({ error: 'Erro ao salvar no banco' }, { status: 500 });
  }
}
