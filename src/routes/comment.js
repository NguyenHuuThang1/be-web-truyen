import { Router } from 'express';
import { checkJWT } from '../middleware/checkJWT.js';
import { createCommentChapter } from '../controllers/comment/createCommentChapter.js';
// import { createCommentForum } from '../controllers/comment/createCommentForum.js';
import { getChapterCommentList} from '../controllers/comment/getCommentList.js';
import { deleteComment } from '../controllers/comment/deleteComment.js';
import { updateComment } from '../controllers/comment/updateComment.js';


const router = Router();

router.route('/chapter/:chapterId').get(getChapterCommentList);

// router.route('/forum/:forumId').get(getForumCommentList);


router.use(checkJWT);

router.route('/chapter/:chapterId').post(createCommentChapter);

// router.route('/forum/:forumId').post(createCommentForum);

router.route('/:commentId').delete(deleteComment).patch(updateComment);

export default router;
