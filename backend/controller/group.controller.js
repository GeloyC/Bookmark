import db from "../config/db.js";

export const createGroup = async (req, res, next) => {
    try {
        const {
            group_holder_id,
            name
        } = req.body;  

        const checkGroup = await db.oneOrNone(
            `SELECT * FROM groups 
            WHERE name = $1`,
            [ name ]
        );

        if (checkGroup) {
            return res.status(409).json({
                success: false,
                message: 'Group already exist'
            })
        }

        const newGroup = await db.one(
            `INSERT INTO groups (
                group_holder_id,
                name
            ) VALUES (
                $1,
                $2
            ) RETURNING name`,
            [ 
                group_holder_id, 
                name 
            ]
        );

        return res.status(200).json({
            success: true,
            message: "Group successfully created",
            data: newGroup.name 
        });


    } catch (err) {
        next(err);
    }
}


export const allGroups = async (req, res, next) => {
    try {
        const group_holder_id = req.params.group_holder_id;

        const groups = await db.manyOrNone(
            `SELECT * FROM groups 
            WHERE group_holder_id = $1`,
            [ group_holder_id ]
        );

        return res.status(200).json({
            success: true,
            data: groups
        });

    } catch (err) {
        next(err);
    }
}


export const deleteSelectedGroup = async (req, res, next) => {
    try {   
        const id = req.params.id;

        if (!id) {
            return res.status(404).json({
                success: false,
                message: 'Id not found'
            })
        };

        const deletedGroup = await db.one(
            `DELETE FROM groups 
            WHERE id = $1
            RETURNING name`,
            [ id ]
        );

        return res.status(200).json({
            success: true,
            message: 'Group deleted successfully',
            data: deletedGroup.name 
        });

    } catch (err) {
        next(err);
    }
}