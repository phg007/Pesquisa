import { type NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(
  request: NextRequest,
  context: { params: Record<string, string | undefined> } // Garante que `params` é tratado corretamente
) {
  const { param } = await context.params; // Aguarda `params`

  if (!param) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const htmlFilePath = path.resolve(process.cwd(), "public", "html-nps.html");
    let htmlContent = await fs.readFile(htmlFilePath, "utf-8");

    htmlContent = htmlContent.replace(
      /(https:\/\/pesquisadesatisfacao\.martminas\.com\.br\/\d+)/g,
      `http://localhost:3000/$1/${param}`
    );

    return new NextResponse(htmlContent, {
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    console.error("Erro ao ler o arquivo HTML:", error);
    return new NextResponse("Erro interno ao processar o HTML", {
      status: 500,
    });
  }
}
