import { Router } from 'express';
import { dislikeBlog, likeBlog } from '../controllers/like.controllers';
import { verifyJWT } from '../middlewares/auth.middleware';

const router = Router();

router.route('/like-blog').post( verifyJWT, likeBlog );
router.route('/dislike-blog').post( verifyJWT, dislikeBlog );

export default router;