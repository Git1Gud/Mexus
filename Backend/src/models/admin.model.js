// src/models/Admin.js
import mongoose, { Schema } from 'mongoose';

const adminSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    hospitalName:{
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    // Reference to Inventory
    inventory: {
      type: Schema.Types.ObjectId,
      ref: 'Inventory',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const HospitalAdmin = mongoose.model('HospitalAdmin', adminSchema);
export default HospitalAdmin;

