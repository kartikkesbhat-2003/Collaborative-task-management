import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { getNotifications, markAsRead, deleteNotification } from './notification.controller';

const router = Router();

router.get('/', authMiddleware, getNotifications);
router.put('/:id/read', authMiddleware, markAsRead);
router.delete('/:id', authMiddleware, deleteNotification);

export default router;