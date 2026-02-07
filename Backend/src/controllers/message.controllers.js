import mongoose from 'mongoose';
import messageService from '../services/message.service.js';
import User from '../models/user.model.js';

export const getConversationMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { limit, before, after } = req.query;

    if (!conversationId) {
      return res.status(400).json({
        success: false,
        message: 'conversationId is required',
      });
    }

    const messages = await messageService.getConversationMessages(conversationId, {
      limit: limit ? parseInt(limit, 10) : 200,
      before,
      after,
    });

    return res.json({
      success: true,
      data: messages.reverse(),
      count: messages.length,
    });
  } catch (error) {
    console.error('Get messages error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch messages',
      error: error.message,
    });
  }
};

export const createMessage = async (req, res) => {
  try {
    const { conversationId, userId, role, content } = req.body || {};

    if (!conversationId || !userId || !content) {
      return res.status(400).json({
        success: false,
        message: 'conversationId, userId, and content are required',
      });
    }

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid userId',
      });
    }

    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const message = await messageService.createMessage({
      conversationId,
      userId,
      role,
      content,
    });

    return res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    console.error('Create message error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create message',
      error: error.message,
    });
  }
};
