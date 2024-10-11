import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()

// Configurations
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({
    limit: "16kb"
}))
app.use(express.urlencoded({
    extended:true,
    limit: "16kb"
}))

app.use(express.static("public"))

app.use(cookieParser())


// routes import


import userRouter from "./routes/user.routes.js"
import { router as appointmentRouter } from "./routes/appointment.routes.js";
import { router as admintRouter } from "./routes/admin.routes.js";
// // routes declaration
app.use("/api/v1/users",userRouter)

app.use("/api/v1/appointments",appointmentRouter)

app.use("/api/v1/admin",admintRouter)





// http:localhost:8000/api/v1/users
// /api/v1/users/register or /api/v1/users/login will happen in routes folder

export {app}