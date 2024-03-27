import { Router } from "express";
import { createNotification, getNotifications } from "../controllers/notification.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route(verifyJWT, getNotifications).get('/get-notifications');
router.route(createNotification).post('/create-notification');

export default router;