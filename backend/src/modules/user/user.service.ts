import { UserRepository } from './user.repository';

export class UserService {
  constructor(private repo = new UserRepository()) {}

  getProfile(userId: string) {
    return this.repo.findById(userId);
  }

  updateProfile(userId: string, data: any) {
    return this.repo.update(userId, data);
  }

  getAllUsers() {
    return this.repo.findAll();
  }
}
