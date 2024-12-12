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
    // Parse JSON body
    const body = await request.json();

    // Validate if body is not null or empty
    if (!body || typeof body !== 'object') {
      console.error('Invalid body:', body);
      return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }

    // Log the received data
    console.log('Received body:', body);

    // Validate individual fields
    const {
      aspectRatings = null,
      selectedStore = null,
      selectedCompetitor = null,
      priceComparison = null,
      feedback = null,
    } = body;

    console.log('aspectRatings:', aspectRatings);
    console.log('otherSupermarket:', selectedStore);
    console.log('otherSupermarketSpecify:', selectedCompetitor);
    console.log('priceComparison:', priceComparison);
    console.log('feedback:', feedback);

    // Create a connection to the database
    const connection = await mysql.createConnection(dbConfig);

    // Insert data into the database
    const [result] = await connection.execute(
      'INSERT INTO surveys (aspect_ratings, other_supermarket, other_supermarket_specify, price_comparison, feedback) VALUES (?, ?, ?, ?, ?)',
      [aspectRatings, selectedStore, selectedCompetitor, priceComparison, feedback]
    );

    console.log('Insert result:', result);

    // Close the connection
    await connection.end();

    return NextResponse.json(
      { message: 'Survey submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting survey:', error);
    return NextResponse.json(
      { message: 'Error submitting survey' },
      { status: 500 }
    );
  }
}
