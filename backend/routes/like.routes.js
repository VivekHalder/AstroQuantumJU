import { Router } from 'express';
import { countLikes, dislikeBlog, likeBlog } from '../controllers/like.controllers.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/like-blog').post( verifyJWT, likeBlog );
router.route('/dislike-blog').post( verifyJWT, dislikeBlog );
router.route('/likes-count').get( countLikes );

export default router;