import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () =>{
    try {

      const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

      console.log(`MongoDB injected !! DB HOST: ${connectionInstance.connection.host}`)

        
    } catch (error) {
        console.log("MONGODB connection failed",error);
        process.exit(1)
    }
}

export default connectDB;

// import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";

// const connectDB = async () => {
//     try {
//         // First, connect to MongoDB
//         const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });

//         console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);

//         // Access the native MongoDB connection after connection
//         const db = mongoose.connection.db;

//         // Drop the index 'username_1' from the 'users' collection
//         try {
//             await db.collection('users').dropIndex('username_1');
//             console.log("Dropped index 'username_1' from the 'users' collection");
//         } catch (dropError) {
//             console.error("Error dropping index 'username_1':", dropError);
//         }

//     } catch (error) {
//         console.error("MONGODB connection failed", error);
//         process.exit(1); // Exit process with failure
//     }
// };

// export default connectDB;

