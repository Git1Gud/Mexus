import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Inventory from "../models/inventory.model.js"; // Ensure this is the correct import
import { ApiResponse } from "../utils/ApiResponse.js";

// Create or update inventory for a hospital
const createOrUpdateInventory = asyncHandler(async (req, res) => {
  const { adminId } = req.params; // Assuming the adminId is passed in the URL
  const { totalBeds, availableBeds, availableOxygenCylinders, vacantVentilators } = req.body;

  if (totalBeds === undefined || availableBeds === undefined || availableOxygenCylinders === undefined || vacantVentilators === undefined) {
    throw new ApiError(400, 'All inventory fields are required');
  }

  // Check if the inventory exists for the given admin's hospital
  const inventory = await Inventory.findOneAndUpdate(
    { hospitalId: adminId }, // Change this if your admin model references hospital differently
    {
      totalBeds,
      availableBeds,
      availableOxygenCylinders,
      vacantVentilators,
    },
    { new: true, upsert: true } // Create if it doesn't exist
  );

  return res.status(200).json(new ApiResponse(200, inventory, 'Inventory created or updated successfully'));
});

// Get inventory details for a hospital
const getInventory = asyncHandler(async (req, res) => {
  const { adminId } = req.params;

  const inventory = await Inventory.findOne({ hospitalId: adminId });
  if (!inventory) {
    throw new ApiError(404, 'Inventory not found for this hospital');
  }

  return res.status(200).json(new ApiResponse(200, inventory, 'Inventory details retrieved successfully'));
});

// Delete inventory for a hospital
const deleteInventory = asyncHandler(async (req, res) => {
  const { adminId } = req.params;

  const deletedInventory = await Inventory.findOneAndDelete({ hospitalId: adminId });
  if (!deletedInventory) {
    throw new ApiError(404, 'Inventory not found for this hospital');
  }

  return res.status(200).json(new ApiResponse(200, {}, 'Inventory deleted successfully'));
});

export {
  createOrUpdateInventory,
  getInventory,
  deleteInventory,
};
