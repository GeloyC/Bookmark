import express from 'express';
import db from '../config/db.js';
import axios from 'axios';
import * as cheerio from 'cheerio';

const card = express();
card.use(express.json());

card.post('/', async (req, res) => {
    const { card_holder_id, category, link, description } = req.body;

    try {
        // Check first if a link was already in the database regardless of category
        const [rows] = await db.query(`SELECT * FROM card WHERE link = ?`, [link]);

        if (rows.length > 0) {
            return res.json({
                error: `This link already exist!`,
                success: false
            });
        } else {
            if (!link) {
                return res.json({
                    error: "Invalid or empty url!",
                    success: false
                })
            }

            // get the HTML data of the link
            const { data } = await axios.get(link); // using this as the reference in the query

            const $ = cheerio.load(data);
            const title = $("title").text();
    
            const [row] = await db.query(`
                INSERT INTO card (card_holder_id, category, title, link, description) VALUES (?, ?, ?, ?, ?)  
                `, [card_holder_id, category, title, link, description]);
    
            res.json({
                success: true,
                title:title,
            });
        }
    } catch(err) {
        console.error("Failed to add link: ", err);
        res.json({
            error: "The link you entered is invalid. Please check the URL and try again"
        });
    }
});


card.get('/:card_holder_id/list', async (req, res) => {
    const { card_holder_id } = req.params;

    try {
        const [row] = await db.query(`
            SELECT 
                card_id, category, title, link, description, 
                DATE_FORMAT(date_created, '%Y-%m-%d') AS date_created
            FROM card
            WHERE card_holder_id = ?;
            `, [card_holder_id]);

        if (row.length === 0) {
            return res.status(200).json({
                success: false,
                message: "No links found for this user.",
                data: []
            }); 
        }

        return res.status(200).json({
            success: true,
            data: row
        });

    } catch(err) {
        console.error('Server: Error fetching links: ', err);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching links."
        });
    }
});


card.delete('/:card_id', async (req, res) => {
    const { card_id } = req.params;

    try {
        const [row] = await db.query(`
            DELETE FROM card WHERE card_id = ?;
            `, [card_id]);

        res.json({
            sucess:true,
            message: "Link deleted successfully!"
        });

    } catch (err) {
        console.error("Error deleting selected link: ", err);
        res.json({
            sucess:false,
            error: "Failed to delete link!"
        });
    }
});

export default card;