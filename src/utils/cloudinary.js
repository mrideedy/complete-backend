import { v2 as cloudinary } from "cloudinary";
import { response } from "express";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        // upload file on cloudinary
        const reponse = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
         })
        //  file has been uploaded successfull
        console.log("file is uploaded on cloudinary", response.url);
        return response;
        
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary files as the upload operation got failed.
    }
}

cloudinary.uploader.upload(
  "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
  { public_id: "shoes" },
  function (error, result) {
    console.log(result);
  }
);

export {uploadOnCloudinary}