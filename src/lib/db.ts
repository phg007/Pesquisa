import mysql from "mysql2/promise";

export const dbConfig = {
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);

export async function query<T>(
  sql: string,
  params: (string | number | null)[]
): Promise<T> {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [results] = await connection.execute(sql, params);
    return results as T;
  } finally {
    await connection.end();
  }
}
