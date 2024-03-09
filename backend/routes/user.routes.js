import { Router } from "express";
import { authenticateUser, getCurrentUser, getNormalUsers, loginUser, logoutUser, registerUser, updateDetails } from "../controllers/user.controllers.js";
import { verifyJWT } from '../middlewares/auth.middleware.js';


const router = Router();

router.route("/register").post( registerUser );
router.route("/login").post( loginUser );

//secured routes
router.route("/logout").post( verifyJWT, logoutUser );
router.route("/current-user").get( verifyJWT, getCurrentUser );
router.route("/authenticateUser").post( verifyJWT, authenticateUser );
router.route("/updateUserDetails").patch( verifyJWT, updateDetails );
router.route("/get-normal-users").get( getNormalUsers );

export default router;