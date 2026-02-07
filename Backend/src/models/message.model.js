import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    role: {
      type: String,
      enum: ['user', 'model', 'system'],
      default: 'user',
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 8000,
    },
    metadata: {
      edited: { type: Boolean, default: false },
      editedAt: Date,
      replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.index({ conversationId: 1, createdAt: -1 });

export default mongoose.model('Message', messageSchema);
