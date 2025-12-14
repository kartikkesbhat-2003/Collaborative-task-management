import { z } from 'zod';
import { TaskPriority, TaskStatus } from './task.model';

export const createTaskDto = z.object({
  title: z.string().max(100),
  description: z.string().optional(),
  dueDate: z.string().datetime(),
  priority: z.nativeEnum(TaskPriority),
  assignedToId: z.string(),
});

export type CreateTaskDto = z.infer<typeof createTaskDto>;

export const updateTaskDto = z.object({
  title: z.string().max(100).optional(),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional(),
  priority: z.nativeEnum(TaskPriority).optional(),
  status: z.nativeEnum(TaskStatus).optional(),
  assignedToId: z.string().optional(),
});

export type UpdateTaskDto = z.infer<typeof updateTaskDto>;
