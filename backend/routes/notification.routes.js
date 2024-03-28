import { Router } from "express";
import { createNotification, getNotifications, viewNotifications } from "../controllers/notification.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/get-notifications').get(verifyJWT, getNotifications);
router.route('/create-notification').post(createNotification);
router.route('/view-notifications').patch(verifyJWT, viewNotifications);

export default router;