import { Router } from 'express';
import { checkJWT } from '../middleware/checkJWT.js';

const router = Router();

router.use(checkJWT);

// tạo request

// xem request bị từ chôi

// xem request thành công

// xem request đang đợi duyệt

export default router;
