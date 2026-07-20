import express from 'express';
import db from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';

// controllers
import { allGroups, createGroup } from '../controller/group.controller.js';


const group = express();

group.post('/v1', requireAuth ,createGroup);


// TODO
// 1. GET GROUP
group.get('/v1/all/:group_holder_id', allGroups);

// 2. DELETE GROUP
// 3. PUT GROUP



export default group;