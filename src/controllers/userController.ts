import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await userService.createUser(name, email);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};