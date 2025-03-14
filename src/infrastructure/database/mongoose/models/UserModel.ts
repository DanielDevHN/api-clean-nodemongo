import mongoose, { Schema, Document } from 'mongoose';
import { User } from '../../../../domain/entities/User';


export interface UserDocument extends User, Document {}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<UserDocument>('User', UserSchema);