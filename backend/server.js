import express from 'express';
import cors from 'cors';
import db from './config/db.js';

// Routes
import user from './routes/user.js';
import card from './routes/card.js';
import cat from './routes/category.js';

import { testConnection } from './config/db.js';

const app = express();
app.use(express.json());
app.use(cors());

// Initializing routes
app.use('/user', user);
app.use('/card', card);
app.use('/category', cat);


app.get('/', (req, res) => {
    res.send('Hello world!');
});


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running is http://localhost:${PORT}`);
    testConnection();
});