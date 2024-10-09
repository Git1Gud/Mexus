import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getDoctorDetails, getPatientsForDoctor, registerDoctor, updateDoctorDetails,getAllDoctors } from "../controllers/doctor.controller.js";
const router = Router()


// router.use(verifyJWT)


router.route("/register").post(
    registerDoctor)

//     registerDoctor,
//   getDoctorDetails,
//   updateDoctorDetails,
//   getPatientsForDoctor,

router.route("/update-doctor-details").patch(updateDoctorDetails) 


router.route("/patients").get(getPatientsForDoctor)
router.route("/doctors").get(getAllDoctors)

router.route("/details").get(getDoctorDetails)

export  {router}