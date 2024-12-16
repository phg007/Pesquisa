import mysql from 'mysql2/promise';

export const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 54375,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
 
 
};

export async function query<T>(sql: string, params: (string | number | null)[]): Promise<T> {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [results] = await connection.execute(sql, params);
    return results as T;
  } finally {
    await connection.end();
  }
}

