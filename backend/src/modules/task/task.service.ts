import { TaskRepository } from './task.repository';
import { NotificationService } from '../notification/notification.service';
import { Server } from 'socket.io';
import { UpdateTaskDto, CreateTaskDto } from './task.dto';
import { ApiError } from '../../utils/apiError';

export class TaskService {
  constructor(
    private taskRepo: TaskRepository,
    private notificationService: NotificationService
  ) {}

  async createTask(payload: CreateTaskDto & { creatorId: string }, io: Server) {
    const task = await this.taskRepo.create(payload);
    io.emit('task:created', task);
    return task;
  }

  async updateTask(taskId: string, payload: UpdateTaskDto, userId: string, io: Server) {
    const task = await this.taskRepo.findById(taskId);
    if (!task) throw new ApiError(404, 'Task not found');
    if (task.creatorId.toString() !== userId && task.assignedToId?.toString() !== userId) {
      throw new ApiError(403, 'Access denied');
    }

    const updatedTask = await this.taskRepo.update(taskId, payload);
    if (!updatedTask) throw new ApiError(404, 'Task not found');

    // 🔴 Real-time update
    io.emit('task:updated', updatedTask);

    // 🔔 Notify if assigned changed
    if (payload.assignedToId && payload.assignedToId !== task.assignedToId.toString()) {
      await this.notificationService.create(
        payload.assignedToId,
        `You have been assigned a new task: ${updatedTask.title}`
      );

      io.to(payload.assignedToId).emit('task:assigned', updatedTask);
    }

    return updatedTask;
  }

  async getTasks(userId: string, filter?: any) {
    const query = { $or: [{ creatorId: userId }, { assignedToId: userId }] };
    if (filter) {
      Object.assign(query, filter);
    }
    return this.taskRepo.findAll(query);
  }

  async getTaskById(taskId: string, userId: string) {
    const task = await this.taskRepo.findById(taskId);
    if (!task) throw new ApiError(404, 'Task not found');
    if (task.creatorId.toString() !== userId && task.assignedToId?.toString() !== userId) {
      throw new ApiError(403, 'Access denied');
    }
    return task;
  }

  async deleteTask(taskId: string, userId: string, io: Server) {
    const task = await this.taskRepo.findById(taskId);
    if (!task) throw new ApiError(404, 'Task not found');
    if (task.creatorId.toString() !== userId && task.assignedToId?.toString() !== userId) {
      throw new ApiError(403, 'Access denied');
    }
    await this.taskRepo.delete(taskId);
    io.emit('task:deleted', { id: taskId });
    return { message: 'Task deleted' };
  }
}
