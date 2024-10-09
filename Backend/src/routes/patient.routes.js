import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addMedicalReports, createPatient, getPatientDetails, updateMedicalHistory } from "../controllers/patient.controller.js";
const router = Router()


router.use(verifyJWT)


router.route("/register").post(
    createPatient)

    // createPatient,
//   updateMedicalHistory,
//   addMedicalReports,
//   getPatientDetails,

router.route("/update-medical-history").patch(updateMedicalHistory) 


router.route("/update-medical-reports").patch(
    upload.fields([
        {
            name:"medicalReport",
            maxCount:1,
        },
     ])
    ,addMedicalReports)
    
router.route("/details").get(getPatientDetails)

export  {router}