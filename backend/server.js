import express from 'express';
import cors from 'cors';
import db from './config/db.js';
import dotenv from 'dotenv';

import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { dbConfig } from './config/db.js'; // db credentials

// Routes
import user from './routes/user.js';
import card from './routes/card.js';
import group from './routes/group.js';

import { testConnection } from './config/db.js';

dotenv.config();
const app = express();

app.set('trust proxy', 1);

const PostgreSession = new connectPgSimple(session);
const sessionStore = new PostgreSession({
    conObject: {
        user: process.env.DB_USERNAME,
        password: String(process.env.DB_PASSWORD),
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_NAME,
    },
    tableName: 'user_session'
})

app.use(
    session({
        store: sessionStore,
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true, // replace to true for HTTPS
            sameSite: 'none'
        }
    }) 
);

app.use((req, res, next) => {
    console.log('Session ID:', req.sessionID);
    console.log('Cookie:', req.headers.cookie);
    console.log('Session:', req.session);
    console.log('Current user:', req.session.user);

    next();
});

app.use(express.json());
app.use(
    cors({
        origin: [
            'http://localhost:5173',
            'https://bookmark-ubat.onrender.com'
        ],
        credentials: true
    })
);

// Initializing routes
app.use('/user', user);
app.use('/card', card);
app.use('/group', group);


const PORT = process.env.PORT || 5000;;

app.listen(PORT, () => {
    console.log(`Server is running is http://localhost:${PORT}`);
    testConnection();
});