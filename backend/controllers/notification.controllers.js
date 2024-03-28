import { MAX_NOTFICATIONS } from "../constants.js";
import { Notification } from "../models/notification.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getNotifications = asyncHandler(async (req, res, next) => {
    const { id } = req.user;

    try {
        if (!id) {
            throw new ApiError(
                400,
                "User needs to be logged in to get the notifications."
            );
        }

        let notifications = await Notification.find({ user: id }).sort({ createdAt: -1 });

        if (notifications.length > 30) {
            notifications = notifications.slice(0, 30);
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                notifications,
                "Notifications retrieved."
            )
        );
    } catch (error) {
        console.log(`Error occured. Error: ${error.message}.`);
        next(error); 
    }
});

const createNotification = asyncHandler(async (req, res, next) => {
    const { message, user } = req.body;

    try {
        if (!message) {
            throw new ApiError(
                400,
                "Message is required to create a notification."
            );
        }

        if (!user) {
            throw new ApiError(
                400,
                "User i required to send a notification."
            );
        }

        const newNotification = await Notification.create({
            user,
            message,
        });

        if (!newNotification) {
            throw new ApiError(
                500,
                "Could not create the notification."
            );
        }

        const userNotifications = await Notification.find({ user: id }).sort({ createdAt: -1 });
        if (userNotifications.length > MAX_NOTFICATIONS) {
            await Notification.deleteMany({ user, _id: { $nin: userNotifications.slice(0, MAX_NOTFICATIONS).map(n => n._id) } });
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                newNotification,
                "Successfully created the notification."
            )
        );
    } catch (error) {
        console.log(`Error occurred while posting a notification. Error: ${error.message}`);
        next(error);
    }
});

const viewNotifications = asyncHandler(async (req, res, next) => {
    console.log("Viewing the notification...");
    const { notificationId } = req.body;

    try {
        if(!notificationId){
            throw new ApiError(
                400,
                "Notification ID is required to view the notification."
            )
        }

        const notification = await Notification.findOne( { _id: notificationId, user: req.user.id } );

        if(!notification){
            throw new ApiError(
              404,
              "No notification found."  
            )
        }
    
        const updatedNotification = await Notification.findByIdAndUpdate(
            notificationId,
            {
                read: true,
            },
            {
                new: true
            }
        );
    
        if(!updatedNotification){
            throw new ApiError(
                500,
                "Could not mark the notification as seen."
            )
        }
    
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    updatedNotification,
                    "The notification was marked as seen successfully."
                )
            )
    } catch (error) {
        console.log(`Error occured while marking the notification as seen. Error: ${error.message}.`);
        next(error);
    }

});

export { createNotification, getNotifications, viewNotifications };