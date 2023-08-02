import mongoose, { Document } from 'mongoose';

export interface SessionDocument extends Document {
  customer: CustomerDocumentnt['_id'];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updateAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

const SessionModel = mongoose.model('Session', sessionSchema);

export default SessionModel;
