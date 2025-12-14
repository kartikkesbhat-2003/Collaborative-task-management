import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { createTask, updateTask, getTasks, getTaskById, deleteTask } from './task.controller';

const router = Router();

router.post('/', authMiddleware, createTask);
router.get('/', authMiddleware, getTasks);
router.get('/:id', authMiddleware, getTaskById);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

export default router;
