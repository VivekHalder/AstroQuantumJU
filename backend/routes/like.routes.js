import { Router } from 'express';
import { countDislikes, countLikes, dislikeBlog, hasReacted, likeBlog } from '../controllers/like.controllers.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/like-blog').post( verifyJWT, likeBlog );
router.route('/dislike-blog').post( verifyJWT, dislikeBlog );
router.route('/likes-count').get( countLikes );
router.route('/dislikes-count').get( countDislikes );
router.route('/has-reacted').get( verifyJWT, hasReacted )

export default router;