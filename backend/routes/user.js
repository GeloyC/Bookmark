import express from 'express';
import db from '../config/db.js';
import bcrypt from 'bcrypt';

const user = express();
user.use(express.json());

user.get('/', async (req, res) => {
    const [response] = await db.query(`
        SELECT * FROM user;    
    `); 

    res.json(response);
});


user.post('/signup', async (req, res) => {
    const { name, username, password } = req.body;

    try {
        const hashed_password = await bcrypt.hash(password, 10);

        await db.query(`
            INSERT INTO user (name, username, password) VALUES (?, ?, ?) 
            `, [name, username, hashed_password]);


        res.json({message: 'New user registered!'});
    } catch(err) {
        console.error('Failed to signup: ', err);
    }
});


user.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [row] = await db.query(`
            SELECT id FROM user WHERE username = ? AND password = ?   
        `, [username, password]);

        const user = row[0];
        console.log(user)
        return res.status(200).json({
            id: user.id
            
        })


    } catch (err) {
        console.error(`Login unsucessful due to error: `, err);
    }
});

user.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await db.query(`
            SELECT username FROM user WHERE id = ?
            `, [id]);

        console.log(rows)

        // ALWAYS get the first row of the retrieved data list to get a single output
        return res.status(200).send(rows[0])
    } catch(err) {
        console.error('Failed to fetch user: ', err);
    }
})


export default user;