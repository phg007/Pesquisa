import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 54375,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Create a connection to the database
    const connection = await mysql.createConnection(dbConfig);
    console.log(connection);

 
    // Insert survey data into the database
    await connection.execute(
      'INSERT INTO surveys (customer_name, purchase_date, nps, aspect_ratings, other_supermarket, other_supermarket_specify, price_comparison, feedback) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        body.customerName || "Não se Aplica",
        body.purchaseDate ,
        body.nps,
        JSON.stringify(body.aspectRatings), // Certifique-se de usar JSON válido para esta coluna
        body.selectedStore , // Substituir undefined por null
        body.selectedStore || null,
        body.selectedCompetitor || null,
        body.feedback || null
      ]
    );

    // Close the database connection
    await connection.end();

    return NextResponse.json({ message: 'Survey submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error submitting survey:', error);
  
    return NextResponse.json({ message: 'Error submitting survey' }, { status: 500 });
  }
}

