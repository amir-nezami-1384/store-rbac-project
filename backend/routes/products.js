import { Router } from 'express';
import { pool } from '../db.js';
import { requireRole } from '../middleware.js';

const router = Router();

// همه کاربران لاگین‌شده می‌توانند محصولات را ببینند
router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT product_id, name, description, price, stock FROM product ORDER BY product_id DESC'
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// فقط Admin و Worker می‌توانند محصول اضافه کنند
router.post(
  '/',
  requireRole('Admin', 'Worker'),
  async (req, res) => {
    const { name, description, price, stock } = req.body;

    try {
      await pool.query(
        'CALL AddProduct(?, ?, ?, ?)',
        [name, description || '', price, stock]
      );

      res.status(201).json({
        message: 'Product added.'
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

export default router;