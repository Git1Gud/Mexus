import connectDB from "./db/index.js"
import dotenv from "dotenv"
import { app } from "./app.js"
import { WebSocketServer } from "ws";
import createWebSocketServer from "./ws/index.js";


dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT|| 8000, () =>{
        console.log(`Server is running at port ${process.env.PORT} `);
    }) 
    createWebSocketServer(8080);
})
.catch((err) => {
    console.log("MONGO db connection failed !!!",err);
})
















// Database connection way1 inside index...
// const app = express()

// // USE IIF

// ( async ()=>{
//     try {
        
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log("ERR:",error);
//             throw error

//         })

//         app.listen(process.env.PORT,() => {
//             console.log(`aPP IS LISTENING ON ${process.env.PORT}`)
//         })
        
//     } catch (error) {
//         console.error("ERROR:",error)
//         throw err 
        
//     }
// })