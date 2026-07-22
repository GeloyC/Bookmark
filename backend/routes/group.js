import express from 'express';
import db from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';

// controllers
import { allGroups, createGroup, deleteSelectedGroup } from '../controller/group.controller.js';


const group = express();

group.post('/v1', requireAuth ,createGroup);
group.get('/v1/all/:group_holder_id', allGroups);
group.delete('/v1/:id', requireAuth, deleteSelectedGroup);




export default group;