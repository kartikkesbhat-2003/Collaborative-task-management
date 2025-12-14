import { NotificationModel } from './notification.model';

export class NotificationService {
  async create(userId: string, message: string) {
    return NotificationModel.create({ userId, message });
  }

  async getNotifications(userId: string) {
    return NotificationModel.find({ userId }).sort({ createdAt: -1 });
  }

  async markAsRead(notificationId: string) {
    return NotificationModel.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
  }

  async delete(notificationId: string) {
    return NotificationModel.findByIdAndDelete(notificationId);
  }
}