
import session from 'express-session';
import pgPromise from 'pg-promise';

import dotenv from 'dotenv';

try {
    const result = await dns.lookup(process.env.DB_HOST);

    console.log("DATABASE DNS RESOLVED:", result);
} catch (err) {
    console.error("DATABASE DNS FAILED:", err);
}

// temporariy
import os from 'node:os';
import dns from 'node:dns/promises';

console.log("HOSTNAME:", os.hostname());


dotenv.config();

const pgp = new pgPromise();

export const dbConfig = {
    user: process.env.DB_USERNAME,
    password: String(process.env.DB_PASSWORD),
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
};

console.log('DB config: ', dbConfig);

const db = pgp(dbConfig);



export async function testConnection () {
    try {
        const connect = await db.connect();
        connect.done();

        console.log("Successfully connected to POSTGRES with version: ", connect.client.serverVersion);

        return connect.client.serverVersion;
    } catch (err) {
        console.error('Failed to establish database connection: ', err)
    }
}

export default db;