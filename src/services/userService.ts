import { query } from '../db';
import { User } from '../models/user';

export const getUsers = async (): Promise<User[]> => {
  const { rows } = await query('SELECT * FROM users');
  return rows;
};

export const createUser = async (name: string, email: string): Promise<User> => {
  const { rows } = await query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
  return rows[0];
};