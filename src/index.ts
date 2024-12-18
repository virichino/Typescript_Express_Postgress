import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute';
import authRoutes from './routes/authRoutes';
import { authenticate } from './middleware/authMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas públicas
app.use('/auth', authRoutes);

// Rutas protegidas
app.use('/users', authenticate, userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


