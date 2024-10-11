// src/models/Doctor.js
import mongoose, { Schema } from 'mongoose';
import User from './user.model.js';

const doctorSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // Ensures one-to-one relationship with User
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number, // Years of experience
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
