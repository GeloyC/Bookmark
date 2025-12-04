import express from 'express';
import db from '../config/db.js';




const cat = express();
cat.use(express.json());

cat.post('/', async (req, res) => {
    const { category_name, user_id } = req.body;
    // const { user_id } = req.params;

    try {   
        const [rows] = await db.query("SELECT * FROM category WHERE category_name = ?", [category_name]);

        if (rows.length > 0) {
            res.json({
                Error: 'Category already exist, please add a different category.',
                category: category_name
            })

            window.location.reload();
        } else {
            const [row] = await db.query(`
                INSERT INTO category (user_id, category_name) VALUES (?, ?)`,
                [user_id, category_name]
            );

            res.json({
                success: true,
                message: 'Created new category successfully!',  
                category_name: category_name,
                user_id,
                changedRows: 1
            });
        }

        
        
    } catch(err) {
        console.error('Error creating category: ', err);
    }
}); 


cat.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;

    try {
        const [rows] = await db.query(`
            SELECT * FROM category WHERE user_id = ?;
            `, [user_id])

        res.json(rows);
    } catch(err) {
        console.log('Error fetching categories: ', err);
    }
});




export default cat;