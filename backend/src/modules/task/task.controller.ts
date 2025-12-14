import { Request, Response } from 'express';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { NotificationService } from '../notification/notification.service';
import { createTaskDto, updateTaskDto } from './task.dto';
import { ApiError } from '../../utils/apiError';

const taskRepo = new TaskRepository();
const notificationService = new NotificationService();
const service = new TaskService(taskRepo, notificationService);

export const createTask = async (req: Request, res: Response) => {
  const io = req.app.get('io');
  const validation = createTaskDto.safeParse(req.body);
  if (!validation.success) {
    throw new ApiError(400, 'Invalid input');
  }
  const task = await service.createTask({
    ...validation.data,
    creatorId: req.user!.id,
  }, io);
  res.status(201).json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  const io = req.app.get('io');
  const validation = updateTaskDto.safeParse(req.body);
  if (!validation.success) {
    throw new ApiError(400, 'Invalid input');
  }
  const task = await service.updateTask(req.params.id, validation.data, req.user!.id, io);
  res.json(task);
};

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await service.getTasks(req.user!.id, req.query);
  res.json(tasks);
};

export const getTaskById = async (req: Request, res: Response) => {
  const task = await service.getTaskById(req.params.id, req.user!.id);
  res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  const io = req.app.get('io');
  const result = await service.deleteTask(req.params.id, req.user!.id, io);
  res.json(result);
};
