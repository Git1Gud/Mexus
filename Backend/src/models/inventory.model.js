import mongoose, { Schema } from 'mongoose';

const inventorySchema = new Schema(
  {
    hospitalId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    totalBeds: {
      type: Number,
      default:0,
    },
    availableBeds: {
      type: Number,
      default:0,

    },
    availableOxygenCylinders: {
      type: Number,
      default:0,

    },
    vacantVentilators: {
      type: Number,
      default:0,

    },
  },
  {
    timestamps: true,
  }
);

const Inventory = mongoose.model('Inventory', inventorySchema);
export default Inventory;
