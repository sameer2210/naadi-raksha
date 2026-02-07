import Message from '../models/message.model.js';

class MessageService {
  async getConversationMessages(conversationId, options = {}) {
    const { limit = 200, before, after } = options;
    const query = { conversationId };

    if (before) query.createdAt = { $lt: new Date(before) };
    if (after) query.createdAt = { $gt: new Date(after) };

    return await Message.find(query).sort({ createdAt: -1 }).limit(limit).select('-__v').lean();
  }

  async createMessage(data) {
    const message = new Message({
      conversationId: data.conversationId,
      userId: data.userId,
      role: data.role || 'user',
      content: data.content,
    });

    await message.save();
    return message.toObject();
  }
}

export default new MessageService();
