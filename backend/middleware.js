import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Authentication token required.'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({
        message: 'Invalid or expired token.'
      });
    }

    req.user = user;
    next();
  });
}

export function requireLogin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      message: 'Login required.'
    });
  }

  next();
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Access denied for this role.'
      });
    }

    next();
  };
}