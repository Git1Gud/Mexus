// src/models/Patient.js
import mongoose, { Schema } from 'mongoose';
import User from './user.model.js';

const patientSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // Ensures one-to-one relationship with User
    },
    medicalHistory: {
      type: String,
      default: null,
    },
    medicalReports: {
        type: [String], 
        default: [],
      },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
