import { Request, Response } from 'express';
import { UserService } from './user.service';

const service = new UserService();

export const getProfile = async (req: Request, res: Response) => {
  const user = await service.getProfile(req.user!.id);
  res.json(user);
};

export const updateProfile = async (req: Request, res: Response) => {
  const user = await service.updateProfile(req.user!.id, req.body);
  res.json(user);
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await service.getAllUsers();
  res.json(users);
};
