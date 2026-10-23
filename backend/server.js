import express from 'express';
import cors from 'cors';
import { pool } from './db.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import { authenticateToken } from './middleware.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');

    res.json({
      ok: true,
      message: 'Backend and MySQL are connected.'
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message
    });
  }
});

app.use('/api/auth', authRoutes);

app.use(
  '/api/products',
  authenticateToken,
  productRoutes
);

app.use(
  '/api/orders',
  authenticateToken,
  orderRoutes
);

const PORT = Number(process.env.PORT || 3001);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});