import express from 'express';
import { createOrGetUser, getUserById } from '../controllers/user.controllers.js';

const router = express.Router();

router.post('/', createOrGetUser);
router.get('/:id', getUserById);

export default router;
