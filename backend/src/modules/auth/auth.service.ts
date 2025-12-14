import { UserRepository } from '../user/user.repository';
import { hashPassword, comparePassword } from '../../utils/bcrypt';
import { signToken } from '../../utils/jwt';
import { ApiError } from '../../utils/apiError';
import { sendResetEmail } from '../../utils/email';
import crypto from 'crypto';

export class AuthService {
  private repo = new UserRepository();

  async register(name: string, email: string, password: string) {
    const existingUser = await this.repo.findByEmail(email);
    if (existingUser) {
      throw new ApiError(400, 'User already exists');
    }
    const hashed = await hashPassword(password);
    return this.repo.create({ name, email, password: hashed });
  }

  async login(email: string, password: string) {
    const user = await this.repo.findByEmail(email);
    if (!user) throw new ApiError(401, 'Invalid credentials');

    const match = await comparePassword(password, user.password);
    if (!match) throw new ApiError(401, 'Invalid credentials');

    return signToken({ id: user._id });
  }

  async forgotPassword(email: string) {
    const user = await this.repo.findByEmail(email);
    if (!user) throw new ApiError(404, 'User not found');

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await this.repo.update(user._id.toString(), { resetToken, resetTokenExpiry });

    await sendResetEmail(email, resetToken);
    return { message: 'Reset email sent' };
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.repo.findByResetToken(token);
    if (!user) throw new ApiError(400, 'Invalid or expired token');

    const hashed = await hashPassword(newPassword);
    await this.repo.update(user._id.toString(), {
      password: hashed,
      resetToken: undefined,
      resetTokenExpiry: undefined,
    });

    return { message: 'Password reset successful' };
  }
}
