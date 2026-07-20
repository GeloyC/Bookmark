import db from "../config/db.js"
import bcrypt from 'bcrypt';


export const userSignUp = async (req, res, next) => {
    const { name, username, password } = req.body;

    try {
        const hashed_password = await bcrypt.hash(password, 10);

        const newUser = await db.one(
            `INSERT INTO users (
                name,
                username,
                password
            ) VALUES (
                $1, 
                $2, 
                $3
            ) RETURNING id, username`,
            [ 
                name,
                username,
                hashed_password
            ]
        );

        req.session.user = {
            id: newUser.id,
            username: newUser.username
        }
        
        return res.status(200).json({
            success: true,
            user: req.session.user
        });

    } catch(err) {
        next(err);
    }
}



export const userLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await db.oneOrNone(
            `SELECT * FROM users 
            WHERE username = $1`,
            [ username ]
        );

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'invalid credential'
            });
        }

        const matchPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!matchPassword) {
            return res.status(401).json({
                success: false,
                message: 'incorrect password, please try again'
            });
        };

        req.session.user = {
            id: user.id,
            name: user.username
        };

        return res.status(200).json({
            success: true,
            message: 'Login sucessfull!',
            user: req.session.user
        })


    } catch (err) { 
        next(err);
    }
}


export const getUser = async (req, res, next) => {
    try {
        console.log("Current user: ", req.session.user);
        res.json(req.session.user);
    } catch (err) {
        next(err);
    }
} 

export const userLogout = async (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Log out Error'
                })
            };

            res.clearCookie('user_session');
            res.json({
                succes: true,
                message: 'Logout successful!'
            });
        });
    } catch (err) {
        next(err);
    }
}