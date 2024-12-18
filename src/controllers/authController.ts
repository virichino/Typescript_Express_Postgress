import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // Si el usuario no es admin, fuerza el rol a 'user'
    const assignedRole = req.user?.role === 'admin' ? role : 'user';

    const user = await authService.registerUser(name, email, password, assignedRole);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await authService.loginUser(email, password);
    res.json({ token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
