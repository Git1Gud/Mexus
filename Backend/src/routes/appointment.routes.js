import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { addPrescription, createAppointment, deleteAppointment, getAppointmentById, updateAppointmentStatus } from "../controllers/appointment.controller.js";
const router = Router()


router.use(verifyJWT)


router.route("/create").post(
    createAppointment)


router.route("/update-prescription/:id").patch(
    upload.fields([
        {
            name: "prescription",
            maxCount: 1
        },
    ]),
    addPrescription) 


router.route("/update-appointment-status/:id").patch(
        updateAppointmentStatus) 



router.route("/get/:id").get(getAppointmentById)

router.route("/delete/:id").delete(deleteAppointment)

export  {router}