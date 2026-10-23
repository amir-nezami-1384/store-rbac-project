import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';

const router = Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: 'Username and password are required.'
    });
  }

  try {
    const [rows] = await pool.query(
      'CALL LoginUser(?, ?)',
      [username, password]
    );

    const result = rows[0]?.[0];

    if (!result || result.login_status !== 'Login Success') {
      return res.status(401).json({
        message: 'Invalid username or password.'
      });
    }

    const token = jwt.sign(
      {
        user_id: result.user_id,
        username: result.username,
        role: result.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '2h'
      }
    );

    res.json({
      user_id: result.user_id,
      username: result.username,
      role: result.role,
      token
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: 'نام کاربری و رمز عبور الزامی هستند.'
    });
  }

  if (typeof username !== 'string' ||
      typeof password !== 'string' ||
      username.trim().length === 0 ||
      username.length < 6 ||
      password.length < 8) {
    return res.status(400).json({
      message: 'نام کاربری باید حداقل ۶ و رمز عبور حداقل ۸ کاراکتر باشد.'
    });
  }

  try {
    await pool.query(
      'CALL RegisterUser(?, ?, ?)',
      [username.trim(), password, 'Customer']
    );

    return res.status(201).json({
      message: 'حساب کاربری با موفقیت ایجاد شد.'
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        message: 'این نام کاربری قبلاً ثبت شده است.'
      });
    }

    console.error('Registration error:', error.message);

    return res.status(500).json({
      message: 'ثبت‌نام انجام نشد. لطفاً دوباره تلاش کنید.'
    });
  }
});

export default router;