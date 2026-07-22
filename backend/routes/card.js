import express from 'express';
import { requireAuth } from '../middleware/auth.js'
import { createLink, deleteCard, getCardsByGroup, updateLinkById } from '../controller/card.controller.js';

const card = express.Router(); 


card.post('/v1/new', requireAuth, createLink );
card.get('/v1/links', requireAuth, getCardsByGroup);
card.put('/v1/:id/updatedLink', requireAuth, updateLinkById);
card.delete('/v1/:id', requireAuth, deleteCard);

export default card;