import { verifyToken } from '../config/jwt.js';
import { db } from '../db/database.js';

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Authentication token required' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }

  const user = db.findById('users', decoded.id);
  if (!user) {
    return res.status(401).json({ success: false, error: 'User not found' });
  }

  if (user.status === 'suspended') {
    return res.status(403).json({ success: false, error: 'Account has been suspended' });
  }

  req.user = user;
  next();
}

export function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (decoded) {
      req.user = db.findById('users', decoded.id) || null;
    }
  }
  next();
}

export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: `Forbidden: requires one of [${allowedRoles.join(', ')}] role` });
    }
    next();
  };
}
