import express from 'express';
// controllers
import { 
    userLogin, 
    userSignUp, 
    getUser,
    userLogout
} from '../controller/user.controller.js';

const user = express.Router();


user.post('/v1/signup', userSignUp);
user.post('/v1/login', userLogin);
user.post('/v1/logout', userLogout);
user.get('/v1/profile', getUser);


export default user;