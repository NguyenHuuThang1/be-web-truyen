import { Router } from 'express';
import { checkJWT } from '../middleware/checkJWT.js';
import { changePassword } from '../controllers/user.controller/client/changePassword.js';
import { logOut } from '../controllers/user.controller/client/logOut.js';
import { getProfile } from '../controllers/user.controller/client/getProfile.js';
import { updateProfile } from '../controllers/user.controller/client/updateProfile.js';
import { uploadAvt } from '../storage/storageAvatar.js';
const router = Router();

router.post('/change-password', checkJWT, changePassword);
router.post('/logout', checkJWT, logOut);
router.post('/update', checkJWT, uploadAvt.single('avatar'), updateProfile);

router.get('/profile', checkJWT, getProfile);
export default router;
