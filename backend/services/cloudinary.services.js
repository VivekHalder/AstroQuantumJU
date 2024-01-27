import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadToCloudinary = async ( localFilePath ) => {
    try {
        if( !localFilePath ){
            console.log(`The file doesnot exist.`);
        }

        const res = await cloudinary.uploader.upload( 
            localFilePath, 
            { resource_type: "auto" },
            ( error, result ) => {
                if(!error) console.log("result is ",result);
            }
        );

        try {
            fs.unlinkSync( localFilePath );
            console.log(`The ${ localFilePath } deleted successfully.`);
        } catch (error) {
            console.log(`Error occured while unlinking the file. Error: ${ error.message }.`);
        }
        //console.log( res );
        return res;
    } catch (error) {
        fs.unlinkSync( localFilePath );
        console.log(`Error occured while logging in. Error: ${error.message}`);
    }
};

export { uploadToCloudinary };