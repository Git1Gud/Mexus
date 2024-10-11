import { v2 as cloudinary } from 'cloudinary';
import fs from
 "fs"
    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.cLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET  // Click 'View API Keys' above to copy your API secret
    });

    const uploadOnCloudinary =  async (localFilePath) =>{
        try {
            if(!localFilePath) return null
            // upload file on cloudinary
          const response = await   cloudinary.uploader.upload(localFilePath,{
                resource_type: "auto"
            })
            // file has been uploaded succesfully
            // console.log("File is uploaded succesfully",response.url);
            fs.unlinkSync(localFilePath)
            return response;
        } catch (error) {
            fs.unlinkSync(localFilePath) //removes locally saved temporary file as upload operation failed
            return null;
        }
    }

    export {uploadOnCloudinary}