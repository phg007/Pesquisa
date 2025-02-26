import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      surveyId,
      aspectRatings,
      selectedStore,
      selectedCompetitor,
      priceComparison,
      feedback,
    } = body;
    console.log(body);
    if (!surveyId) {
      return NextResponse.json(
        { message: "Nota NPS obrigatória, acesse pelo email ou QRcode" },
        { status: 400 }
      );
    }

    await query<void>(
      `UPDATE surveys SET 
        aspect_ratings = ?,
        other_supermarket = ?,
        other_supermarket_specify = ?,
        price_comparison = ?,
        feedback = ?
      
      WHERE id = ?`,
      [
        JSON.stringify(aspectRatings),
        selectedStore,
        selectedCompetitor,
        priceComparison,
        feedback,
        surveyId,
      ]
    );

    return NextResponse.json(
      { message: "Survey submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting survey:", error);
    return NextResponse.json(
      { message: "Error submitting survey" },
      { status: 500 }
    );
  }
}
