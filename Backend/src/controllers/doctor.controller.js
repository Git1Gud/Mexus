import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Doctor from "../models/doctor.model.js";
// import Patient from "../models/patient.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Appointment  from "../models/appointment.model.js";
import User from "../models/user.model.js";


// Register a new doctor
const registerDoctor = asyncHandler(async (req, res) => {
  const {  specialization, experience } = req.body;
  const userId  = req.user._id; 

  if (!userId || !specialization || !experience) {
    throw new ApiError(400, "All fields are required");
  }
  
  const user = await User.findById(userId)
  if(!user)  throw new ApiError(409, "user not found.");

  if(user.role!="doctor")  throw new ApiError(409, "doctor nahi he bhai tu");



  // Create doctor entry
  const doctor = await Doctor.create({ userId, specialization, experience });

  return res.status(201).json(new ApiResponse(200, doctor, "Doctor registered successfully"));
});

// Get doctor details
const getDoctorDetails = asyncHandler(async (req, res) => {
  const userId  = req.user._id; 

  const doctor = await Doctor.findOne({ userId }).populate('userId', '-password -refreshToken');

  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }

  return res.status(200).json(new ApiResponse(200, doctor, "Doctor details retrieved successfully"));
});


// Controller function to get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('userId', '-password -refreshToken');; // Fetch all doctors from the database
    res.status(200).json(doctors); // Send the doctors as a JSON response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error }); // Handle errors
  }
};

// Update doctor details
const updateDoctorDetails = asyncHandler(async (req, res) => {
  const userId  = req.user._id; 
    const { specialization, experience } = req.body;

  const doctor = await Doctor.findOneAndUpdate(
    { userId },
    { specialization, experience },
    { new: true, runValidators: true }
  ).populate('userId', '-password -refreshToken');

  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }

  return res.status(200).json(new ApiResponse(200, doctor, "Doctor details updated successfully"));
});

// Get a list of all patients for a doctor

const getPatientsForDoctor = asyncHandler(async (req, res) => {
  const userId  = req.user._id; 
  // Find the doctor based on userId
  const doctor = await Doctor.findOne({ userId });

  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }

  // Find appointments where the doctor's userId is associated
  const appointments = await Appointment.find({ doctor: doctor.userId }).populate('patient', '-password -refreshToken');

  // Extract unique patients from the appointments
  const patients = appointments.map(appointment => appointment.patient);

  // Optional: filter for unique patients if needed
  const uniquePatients = Array.from(new Set(patients.map(patient => patient._id)))
    .map(id => {
      return patients.find(patient => patient._id.toString() === id.toString());
    });

  return res.status(200).json(new ApiResponse(200, uniquePatients, "Patients for this doctor retrieved successfully"));
});


export {
  registerDoctor,
  getDoctorDetails,
  updateDoctorDetails,
  getPatientsForDoctor,
  getAllDoctors,
};
