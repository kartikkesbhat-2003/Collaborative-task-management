/// <reference path="../types/index.d.ts" />
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { ApiError } from '../utils/apiError';
import { UserRepository } from '../modules/user/user.repository';

const userRepo = new UserRepository();

export const authMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) throw new ApiError(401, 'Unauthorized');

  const decoded = verifyToken(token) as any;
  const user = await userRepo.findById(decoded.id);
  if (!user) throw new ApiError(401, 'Unauthorized');

  req.user = { id: user._id.toString(), role: user.role };
  next();
};
