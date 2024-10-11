import { asyncHandler } from '../utils/asyncHandler.js';
import Appointment from '../models/appointment.model.js';
import { ApiError } from '../utils/ApiError.js';
import User from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';


export const createAppointment = asyncHandler(async (req, res) => {
  const { patient, doctor, appointmentDate, reason } = req.body;

  if ([patient, doctor, appointmentDate, reason].some(field => !field?.trim())) {
    throw new ApiError(400, "All fields are required");
  }
console.log(patient);
console.log(doctor);


  const ptnt=await User.findById(patient)
  if(!ptnt) throw new ApiError(400,"patient  not found")

  const dctr=await User.findById(doctor)

  if(!dctr) throw new ApiError(400,"doctor  not found")

    if(dctr.role!='doctor' || ptnt.role!='patient') throw new ApiError(400,"doctor or patient invalid")


      const existingAppointment = await Appointment.findOne({
    patient,
    doctor,
    appointmentDate,
  });



  if (existingAppointment) {
    throw new ApiError(409, "An appointment already exists for this date and time with the same patient and doctor");
  }

  // Create new appointment
  const appointment = await Appointment.create({
    patient,
    doctor,
    appointmentDate,
    reason,
  });

  res.status(201).json(new ApiResponse(200,appointment,"appointment added"));
});


export const getAppointmentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    const appointment = await Appointment.findById(id).populate('patient doctor', 'name email');
  
    if (!appointment) {
      throw new ApiError(404, "Appointment not found");
    }
  
    res.status(201).json(new ApiResponse(200,appointment,"appointment retracted"));
});


export const updateAppointmentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    if (!status || !['scheduled', 'completed', 'canceled'].includes(status)) {
      throw new ApiError(400, "Invalid status value");
    }
  
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
  
    if (!appointment) {
      throw new ApiError(404, "Appointment not found");
    }
  
    res.status(201).json(new ApiResponse(200,appointment,"appointment updated"));
  });


export const addPrescription = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const prescriptionLocalPath = req.files?.prescription[0]?.path;

  
  if (!prescriptionLocalPath) {
    throw new ApiError(400, "image file is required")
}

    const prescription=await uploadOnCloudinary(prescriptionLocalPath)

if(!prescription){
  throw new ApiError(500,"internal server error when uploading avatar")
}
console.log(id);

  const appointment = await Appointment.findByIdAndUpdate(
    id,
    { $push: { prescriptions: prescription.secure_url } },
    { new: true }
  );

  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  res.status(200).json(new ApiResponse(200,appointment,"prescription aded"));
});


export const deleteAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const appointment = await Appointment.findByIdAndDelete(id);

  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  res.status(200).json(new ApiResponse(200,appointment,"deleted"));
});





  
