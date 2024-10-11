import { Router } from "express";
import { loginUser, logoutUser, registerUser, refreshAccessToken } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {router as patientrouter} from "./patient.routes.js";
import { router as doctorrouter } from "./doctor.routes.js";
const router = Router()

router.route("/register").post(
    registerUser)

router.route("/login").post(loginUser) 


// secured routes
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)


router.use("/patient",patientrouter)
router.use("/doctor",doctorrouter)


export default router