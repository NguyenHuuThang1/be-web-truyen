import { Router } from 'express';
import { checkAdminRole } from '../middleware/checkAdminRole.js';
import { listUser } from '../controllers/user.controller/admin/listUser.js';
import { checkJWT } from '../middleware/checkJWT.js';
import { getUserInfo } from '../controllers/user.controller/admin/getUserInfo.js';
import { deleteUser } from '../controllers/user.controller/admin/deleteUser.js';
import { updateUser } from '../controllers/user.controller/admin/updateUser.js';
const router = Router();

router.get('/list', checkJWT, checkAdminRole, listUser);
router.get('/user-info/:id', checkJWT, checkAdminRole, getUserInfo);
router.delete('/delete/:id', checkJWT, checkAdminRole, deleteUser);
router.patch('/update/:id', checkJWT, checkAdminRole, updateUser);

export default router;
