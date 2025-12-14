import { Request, Response } from 'express';
import { NotificationService } from './notification.service';
import { NotificationRepository } from './notification.repository';

const notificationRepo = new NotificationRepository();
const service = new NotificationService();

export const getNotifications = async (req: Request, res: Response) => {
  const notifications = await service.getNotifications(req.user!.id);
  res.json(notifications);
};

export const markAsRead = async (req: Request, res: Response) => {
  const notification = await service.markAsRead(req.params.id);
  res.json(notification);
};

export const deleteNotification = async (req: Request, res: Response) => {
  await service.delete(req.params.id);
  res.json({ message: 'Notification deleted' });
};