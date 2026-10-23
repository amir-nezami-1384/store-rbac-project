import { Router } from 'express';
import { pool } from '../db.js';
import { requireRole } from '../middleware.js';

const router = Router();

// مشاهده سفارش‌ها
router.get('/', async (req, res) => {
  try {
    if (req.user.role === 'Customer') {
      // Customer فقط سفارش‌های خودش را می‌بیند
      const [rows] = await pool.query(
        'SELECT order_id, customer_id, total_amount, status, created_at FROM `order` WHERE customer_id = ? ORDER BY order_id DESC',
        [req.user.user_id]
      );

      return res.json(rows);
    }

    // Admin و Worker همه سفارش‌ها را می‌بینند
    const [rows] = await pool.query(
      'SELECT order_id, customer_id, total_amount, status, created_at FROM `order` ORDER BY order_id DESC'
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// فقط Customer می‌تواند از طریق این API سفارش ثبت کند
router.post(
  '/',
  requireRole('Customer'),
  async (req, res) => {
    const {
      product_id,
      quantity,
      unit_price
    } = req.body;

    try {
      await pool.query(
        'CALL CreateOrder(?, ?, ?, ?)',
        [
          req.user.user_id,
          product_id,
          quantity,
          unit_price
        ]
      );

      res.status(201).json({
        message: 'Order created.'
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

// فقط Admin و Worker می‌توانند وضعیت سفارش را تغییر دهند
router.patch(
  '/:id/status',
  requireRole('Admin', 'Worker'),
  async (req, res) => {
    const { status } = req.body;

    try {
      await pool.query(
        'CALL UpdateOrderStatus(?, ?)',
        [req.params.id, status]
      );

      res.json({
        message: 'Order status updated.'
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

export default router;