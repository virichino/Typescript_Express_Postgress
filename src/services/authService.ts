import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '../db';
import { User } from '../models/user';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Registrar un usuario
export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string = 'user' // Rol predeterminado
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 10); // Cifra la contraseña
  const { rows } = await query(
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, hashedPassword, role]
  );
  return rows[0];
};

// Iniciar sesión
export const loginUser = async (email: string, password: string): Promise<string> => {
  const { rows } = await query('SELECT * FROM users WHERE email = $1', [email]);
  const user = rows[0];

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password); // Compara contraseñas
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  // Generar un token JWT
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  return token;
};

// Validar token JWT
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};