import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in the .env file');
}

// Use a connection pool instead of a single client.
// This is more robust and resilient to connection drops, which is common
// in serverless environments.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Recommended settings for serverless/edge environments
  // to prevent idle connections from being terminated unexpectedly.
  max: 1, // Using a single connection in the pool for this simple app
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});

// The pool is passed to drizzle. Drizzle will request a client from the pool
// for each query and release it back to the pool when the query is done.
export const db = drizzle(pool);
