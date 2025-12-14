import { UserModel } from './user.model';

export class UserRepository {
  create(data: any) {
    return UserModel.create(data);
  }

  findByEmail(email: string) {
    return UserModel.findOne({ email }).select('+password');
  }

  findByResetToken(token: string) {
    return UserModel.findOne({ resetToken: token, resetTokenExpiry: { $gt: new Date() } }).select('+resetToken +resetTokenExpiry');
  }

  findAll() {
    return UserModel.find().select('-password -resetToken -resetTokenExpiry');
  }

  findById(id: string) {
    return UserModel.findById(id);
  }

  update(id: string, data: any) {
    return UserModel.findByIdAndUpdate(id, data, { new: true });
  }
}
