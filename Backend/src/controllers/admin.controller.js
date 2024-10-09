import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Admin from "../models/admin.model.js"; // Ensure this is the correct import
import Inventory from "../models/inventory.model.js"; // Import your Inventory model
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";

// Create a new admin
const createAdmin = asyncHandler(async (req, res) => {
  const { hospitalName, location } = req.body;

  if (!hospitalName || !location) {
    throw new ApiError(400, 'Hospital name and location are required');
  }

  // Check if admin already exists for the hospital
  const existingAdmin = await Admin.findOne({ hospitalName });
  if (existingAdmin) {
    throw new ApiError(409, 'Admin already exists for this hospital');
  }
  console.log(req.user._id);
  
  const inventory = await Inventory.create({
    hospitalId:req.user._id
  });
  const admin = await Admin.create({
    hospitalName,
    location,
    inventory,
    userId:req.user._id
  });

  return res.status(201).json(new ApiResponse(201, admin, 'Admin created successfully'));
});





// Update admin details, including inventory
const updateAdmin = asyncHandler(async (req, res) => {
//   const { adminId } = req.params;
  const { location,hospitalName } = req.body;

  // Find the admin to update
  const admin = await User.findById(req.user._id);
  if (!admin) {
    throw new ApiError(404, 'Admin not found');
  }

//   // Update the inventory information
//   const inventoryUpdate = {
//     totalBeds,
//     availableBeds,
//     availableOxygenCylinders,
//     vacantVentilators,
//   };

//   // Find the inventory associated with the admin's hospital
//   const inventory = await Inventory.findOneAndUpdate(
//     { hospitalId: admin._id },
//     inventoryUpdate,
//     { new: true, upsert: true } // Create a new inventory if it doesn't exist
//   );

  const updatedAdmin=await Admin.findOneAndUpdate({userId:admin._id},{
    hospitalName,
    location,
  })

  const amin=await Admin.findById(updatedAdmin)

  return res.status(200).json(new ApiResponse(200, amin, 'Inventory updated successfully'));
});





// Get admin details
const getAdmin = asyncHandler(async (req, res) => {
//   const { adminId } = req.params;

  const admin = await User.findById(req.user._id);
  if (!admin) {
    throw new ApiError(404, 'Admin not found');
  }

  return res.status(200).json(new ApiResponse(200, admin, 'Admin details retrieved successfully'));
});

// Delete an admin
const deleteAdmin = asyncHandler(async (req, res) => {
//   const { adminId } = req.params;

  const deletedAdmin = await User.findByIdAndDelete(req.user._id);
  if (!deletedAdmin) {
    throw new ApiError(404, 'Admin not found');
  }

  return res.status(200).json(new ApiResponse(200, {}, 'Admin deleted successfully'));
});

export {
  createAdmin,
  updateAdmin,
  getAdmin,
  deleteAdmin
};


