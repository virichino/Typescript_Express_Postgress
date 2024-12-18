import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();

router.post('/register', register); // Registro de usuario
router.post('/login', login);       // Inicio de sesión

export default router;