import db from "../config/db.js";
import { getFromCheerio } from "../service/scrapers/cheerio.js";


export const createLink = async (req, res, next) => {
    try {
        const {  
            card_holder_id,
            group_name,
            group_id,
            link
        } = req.body;

        const checkLink = await db.oneOrNone(
            `SELECT * FROM cards 
            WHERE link = $1`,
            [ link ]
        );

        if (checkLink) {
            return res.status(409).json({
                success: false,
                message: 'Link already existed'
            });
        };

        console.log('Incoming link: ', link);
        let title = await getFromCheerio(link);
        console.log('Cheerio Title: ', title);
        
        const newCard = await db.one(
            `INSERT INTO cards
                (
                    card_holder_id,
                    group_name,
                    group_id,
                    title,
                    link
                ) VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5
                ) RETURNING *`,
                [
                    card_holder_id,
                    group_name,
                    group_id,
                    title,
                    link
                ]
        );

        return res.status(200).json({
            success: true,
            message: 'Card created successfully!',
            data: newCard
        });

    } catch (err) {
        next(err);
    }
}

export const updateLinkById = async (req, res, next) => {
    try {
        const { title }  = req.body;
        const id = req.params.id;

        if (!title || null || title == "") {
            return res.status(404).json({
                success: false,
                message: 'Title is required'
            });
        }

        const updatedTitle = await db.one(
            `UPDATE cards
            SET title = $1
            WHERE id = $2
            RETURNING title`,
            [ title, id ]
        );
        

        return res.status(200).json({
            success: true,
            data: updatedTitle.title
        });

    } catch (err) {
        next(err);
    }
}


export const getCardsByGroup = async (req, res, next) => {
    try {
        const group_name = req.query.groups;

        const allCard = await db.manyOrNone(
            `SELECT * FROM cards
            WHERE group_name = $1
            ORDER BY date_created DESC`,
            [ group_name ]
        );

        return res.status(200).json({
            success: true,
            data: allCard
        });

    } catch (err) {
        next(err);
    }
}


export const deleteCard = async (req, res, next) => {
    try {
        const id = String(req.params.id);

        if (!id) {
            return res.status(404).json({
                success: false,
                message: 'Id not found'
            }); 
        }


        const deleted = await db.one(
            `DELETE FROM cards 
            WHERE id = $1
            RETURNING title`,
            [ id ]
        );

        return res.status(200).json({
            success: true,
            message: `Link (${deleted.title}) deleted successfully`,
            data: deleted
        });

    } catch (err) {
        next(err);
    }
}