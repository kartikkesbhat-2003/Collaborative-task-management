import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { getProfile, updateProfile, getAllUsers } from './user.controller';

const router = Router();

router.get('/me', authMiddleware, getProfile);
router.put('/me', authMiddleware, updateProfile);
router.get('/', authMiddleware, getAllUsers);

export default router;
