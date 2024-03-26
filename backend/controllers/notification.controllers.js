import { Notification } from "../models/notification.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createNotification = asyncHandler( async (req, res, next) => {
    const { message } = req.body;
    const { id } = req.user;

    try {
        if(!message){
            throw new ApiError(
                400,
                "Message is required to create a notification."
            )
        }
    
        if(!id){
            throw new ApiError(
                400,
                "User has to send a notification."
            )
        }
    
        const newNotification = await Notification.create({
            user: id,
            message,
        });
    
        if(!newNotification){
            throw new ApiError(
                500,
                "Couldnot create the notification."
            )
        }
    
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    newNotification,
                    "Successfully created the notification."
                )
            )
    } catch (error) {
        console.log(`Error occured while posting a notification. Error: ${error.message}`);
    }
} );

export { createNotification };