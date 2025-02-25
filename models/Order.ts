import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  service: {
    type: String,
    enum: ['followers', 'likes'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  paymentId: String,
  smmOrderId: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema); 