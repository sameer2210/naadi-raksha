import express from 'express';
import {
  createMessage,
  getConversationMessages,
} from '../controllers/message.controllers.js';

const router = express.Router();

router.get('/conversation/:conversationId', getConversationMessages);
router.post('/', createMessage);

export default router;
