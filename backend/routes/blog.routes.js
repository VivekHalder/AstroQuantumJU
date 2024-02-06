import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { createPost, getAllPost } from '../controllers/blog.controllers.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route( '/post' ).post( verifyJWT, 
    upload.single( 'coverImg' ),
    createPost 
);

router.route( '/getAllBlogs' ).get( getAllPost );

export default router;