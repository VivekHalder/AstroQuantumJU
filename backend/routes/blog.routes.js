import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { createPost } from '../controllers/blog.controllers.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route( '/post' ).post( verifyJWT, 
    upload.single( 'coverImg' ),
    createPost 
);

export default router;