import { NotificationModel } from './notification.model';

export class NotificationRepository {
  create(data: any) {
    return NotificationModel.create(data);
  }

  findByUserId(userId: string) {
    return NotificationModel.find({ userId }).sort({ createdAt: -1 });
  }

  findById(id: string) {
    return NotificationModel.findById(id);
  }

  update(id: string, data: any) {
    return NotificationModel.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id: string) {
    return NotificationModel.findByIdAndDelete(id);
  }
}