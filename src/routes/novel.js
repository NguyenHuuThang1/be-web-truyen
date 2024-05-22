import { Router } from 'express';

import { checkJWT } from '../middleware/checkJWT.js';
import { rejectUser } from '../middleware/rejectUser.js';

import { checkUser } from '../middleware/checkUser.js';

import { getNovel } from '../controllers/novel/getNovel.js';
import { getNovelById } from '../controllers/novel/getNovelById.js';
import { getChapter } from '../controllers/chapter/getChapter.js';
import { getChapterList } from '../controllers/chapter/getChapterList.js';
import { getReviewList } from '../controllers/review/getReviewList.js';
import { deleteChapter } from '../controllers/chapter/deleteChapter.js';
import { updateChapter } from '../controllers/chapter/updateChapter.js';
import { createChapter } from '../controllers/chapter/createChapter.js';
import { createNovel } from '../controllers/novel/createNovel.js';
import { updateNovel } from '../controllers/novel/updateNovel.js';
import { deleteNovel } from '../controllers/novel/deleteNovel.js';
import { createReview } from '../controllers/review/createReview.js';
import { updateReview } from '../controllers/review/updateReview.js';
import { upload } from '../storage/storageImage.js';
import { getMyNovel } from '../controllers/novel/getMyNovel.js';
import { getChapterById } from '../controllers/chapter/getChapterById.js';
import { upViewChapter } from '../controllers/chapter/upViewChapter.js';
const router = Router();
router.route('/myNovel').get(checkJWT, rejectUser, getMyNovel);
router.route('/').get(getNovel);
router.route('/chapter').get(getChapter);
router.route('/chapter/:chapterId').patch(upViewChapter);
//get a novel
router.route('/:novelId').get(getNovelById);
//get Chapter
router.route('/chapter/:chapterId').get(getChapterById);
router.route('/:novelId/chapterList').get(getChapterList);
//get review List
router.route('/:novelId/review').get(getReviewList);
router.use(checkJWT);

//post a review
router.route('/:novelId/review').post(createReview);

router.route('/:novelId/review/:reviewId').patch(updateReview);
//admin or translator
router.use(checkJWT, rejectUser);

router.post(
  '/',
  upload.fields([
    { name: 'coverImg', maxCount: 1 },
    { name: 'photo', maxCount: 1 },
  ]),
  createNovel
);

router.patch(
  '/:novelId',
  upload.fields([
    { name: 'coverImg', maxCount: 1 },
    { name: 'photo', maxCount: 1 },
  ]),
  updateNovel
);
router.delete('/:novelId', deleteNovel);

//admin or translator
router.use(rejectUser);

router.route('/').post(createNovel);

router.route('/:novelId').patch(updateNovel).delete(deleteNovel);

//create chapter
router.route('/:novelId').post(createChapter);

router.route('/:novelId/:chapterId').delete(deleteChapter).patch(updateChapter);

export default router;
