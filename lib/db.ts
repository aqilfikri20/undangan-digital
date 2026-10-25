import mysql, { type Pool } from 'mysql2/promise';

const globalForMysql = globalThis as typeof globalThis & { undangyukPool?: Pool };

export function getDb() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL belum diatur. Salin .env.example menjadi .env lalu isi koneksi MySQL.');
  if (!globalForMysql.undangyukPool) {
    const url = new URL(process.env.DATABASE_URL);
    globalForMysql.undangyukPool = mysql.createPool({
      host: url.hostname,
      port: Number(url.port || 3306),
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      database: decodeURIComponent(url.pathname.replace(/^\//, '')),
      waitForConnections: true,
      connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
      maxIdle: 5,
      idleTimeout: 60000,
      charset: 'utf8mb4',
    });
  }
  return globalForMysql.undangyukPool;
}
