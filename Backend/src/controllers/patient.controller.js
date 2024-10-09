// src/controllers/patientController.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Patient from "../models/patient.model.js";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary as upload } from "../utils/cloudinary.js";
// Create a new patient
const createPatient = asyncHandler(async (req, res) => {
  const { medicalHistory } = req.body;
  const userId = req.user._id; // Assuming userId is passed in the request object


  const user = await User.findById(userId)
  if(!user)  throw new ApiError(409, "user not found.");

  if(user.role=="doctor")  throw new ApiError(409, "doctor he bhai tu");

  const existingPatient = await Patient.findOne({ userId });

  if (existingPatient) {
    throw new ApiError(409, "Patient record already exists for this user.");
  }
// medical report sto be explicitly added by patient afterwards***
console.log(1234);

  const patient = await Patient.create({
    userId,
    medicalHistory,
    medicalReports:[],
  });

  return res.status(201).json(new ApiResponse(200, patient, "Patient record  successfully. but not medical reports"));
});

// Update medical history
const updateMedicalHistory = asyncHandler(async (req, res) => {
  const { medicalHistory } = req.body;
  const userId  = req.user._id; // Assuming userId is passed in the request object

  const patient = await Patient.findOneAndUpdate(
    { userId },
    { medicalHistory },
    { new: true, runValidators: true }
  );

  if (!patient) {
    throw new ApiError(404, "Patient record not found.");
  }

  return res.status(200).json(new ApiResponse(200, patient, "Medical history updated successfully."));
});

// Add medical reports  **
const addMedicalReports = asyncHandler(async (req, res) => {
  const { medicalReport } = req.files; // Array of report URLs
  const userId  = req.user._id; // Assuming userId is passed in the request object
console.log(req.files);

  // if (!Array.isArray(reports) || reports.length === 0) {
    // throw new ApiError(400, "Reports should be a non-empty array.");
  // }
   let medicalreports=[]
   const medicalReportLocalPath = req.files?.medicalReport[0]?.path;

  
  if (!medicalReportLocalPath) {
    throw new ApiError(400, "image file is required")
}

    const report=await upload(medicalReportLocalPath)

if(!report){
  throw new ApiError(500,"internal server error when uploading avatar")
}


console.log(report.url);

medicalreports[0]=report.url
  const patient = await Patient.findOneAndUpdate(
    { userId },
    { $push: { medicalReports: { $each: medicalreports } } }, // Push new reports to the existing array
    { new: true }
  );

  if (!patient) {
    throw new ApiError(404, "Patient record not found.");
  }
  console.log(patient);
  
  return res.status(200).json(new ApiResponse(200, patient, "Medical reports added successfully."));
});

// Get patient details
const getPatientDetails = asyncHandler(async (req, res) => {
  console.log(req);
  
  const {userId}  =req.params
  // Assuming userId is passed in the request object
console.log(userId);
console.log(123);

  const patient = await Patient.findOne(userId);

  console.log(patient);
  

  if (!patient) {
    throw new ApiError(404, "Patient record not found.");
  }

  return res.status(200).json(new ApiResponse(200, patient, "Patient details fetched successfully."));
});

// Exporting the controllers
export {
  createPatient,
  updateMedicalHistory,
  addMedicalReports,
  getPatientDetails,
};
