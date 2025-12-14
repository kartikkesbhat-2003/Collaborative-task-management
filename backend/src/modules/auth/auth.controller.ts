import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { AuthService } from './auth.service';
import { registerDto, loginDto } from './auth.dto';
import { ApiError } from '../../utils/apiError';

const service = new AuthService();

export const registerValidators = [
  body('name').trim().isLength({ min: 1, max: 50 }).escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6, max: 100 }),
];

export const loginValidators = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
];

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, 'Invalid input');
  }

  const validation = registerDto.safeParse(req.body);
  if (!validation.success) {
    throw new ApiError(400, 'Invalid input');
  }
  const user = await service.register(validation.data.name, validation.data.email, validation.data.password);
  const userObj = (user as any).toObject();
  const { password, ...userWithoutPassword } = userObj;
  res.status(201).json(userWithoutPassword);
};

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, 'Invalid input');
  }

  const validation = loginDto.safeParse(req.body);
  if (!validation.success) {
    throw new ApiError(400, 'Invalid input');
  }
  const token = await service.login(validation.data.email, validation.data.password);
  res.cookie('token', token, { httpOnly: true }).json({ success: true });
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token').json({ success: true });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) throw new ApiError(400, 'Email required');
  const result = await service.forgotPassword(email);
  res.json(result);
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) throw new ApiError(400, 'Token and new password required');
  const result = await service.resetPassword(token, newPassword);
  res.json(result);
};
