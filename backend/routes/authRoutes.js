import express from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../db/database.js';
import { generateToken } from '../config/jwt.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Register new user
router.post('/register', (req, res) => {
  try {
    const { name, email, password, role = 'client', phone, location, barCouncilNo } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Name, email, and password are required' });
    }

    const existing = db.findOne('users', { email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ success: false, error: 'An account with this email already exists' });
    }

    const salt = bcrypt.genSaltSync(10);
    const password_hash = bcrypt.hashSync(password, salt);

    const newUser = db.insert('users', {
      name,
      email: email.toLowerCase(),
      password_hash,
      role: role === 'lawyer' ? 'lawyer' : 'client',
      phone: phone || '',
      location: location || 'Dhaka, Bangladesh',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=064E3B&color=fff`,
      status: 'active'
    });

    // If registering as a lawyer, create initial lawyer record pending verification
    if (role === 'lawyer') {
      db.insert('lawyers', {
        user_id: newUser.id,
        name: newUser.name,
        initials: newUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
        gender: 'other',
        qualification: 'LL.B (Hons)',
        barCouncilNo: barCouncilNo || `BC/PENDING-${Date.now().toString().slice(-5)}`,
        courtLevel: 'District & Sessions Judge Court',
        association: 'Dhaka Bar Association',
        specialties: ['Civil Law', 'Criminal Law'],
        experienceYears: 1,
        location: location || 'Dhaka',
        division: 'Dhaka (Supreme Court & Judge Court)',
        chamberAddress: 'Pending Chamber Verification',
        rating: 5.0,
        reviewsCount: 0,
        feeInPerson: 1000,
        feeVideo: 800,
        feePhone: 500,
        feeDisplay: '৳800',
        responseTime: '< 2 hours',
        languages: ['Bangla', 'English'],
        verified: false,
        modes: ['Video Consultation', 'In-person Chamber', 'Phone Call'],
        availableSlots: ['Tomorrow 11:00 AM', 'Tomorrow 4:00 PM'],
        bio: 'Enrolled Advocate pending Bar Council verification.',
        successRate: 'New Practitioner',
        casesHandled: '0 Cases',
        is_featured: false
      });
    }

    const token = generateToken({ id: newUser.id, email: newUser.email, role: newUser.role });
    db.logAudit(newUser.id, 'USER_REGISTER', 'USERS', newUser.id, `User registered as ${newUser.role}`);

    const safeUser = { ...newUser };
    delete safeUser.password_hash;

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: safeUser
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
});

// Login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const user = db.findOne('users', { email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({ success: false, error: 'Your account has been suspended by administration' });
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    db.logAudit(user.id, 'USER_LOGIN', 'USERS', user.id, 'Successful login');

    const safeUser = { ...user };
    delete safeUser.password_hash;

    // Attach lawyer record if lawyer
    let lawyerProfile = null;
    if (user.role === 'lawyer') {
      lawyerProfile = db.findOne('lawyers', { user_id: user.id });
    }

    res.json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: safeUser,
      lawyerProfile
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

// Demo Fast Login Switch (For instant evaluation of Client, Lawyer, and Admin roles)
router.post('/demo-login', (req, res) => {
  try {
    const { role } = req.body; // 'client' | 'lawyer' | 'admin'
    let targetEmail = 'client@lawbd.com';
    if (role === 'lawyer') targetEmail = 'tanvir@lawbd.com';
    if (role === 'admin') targetEmail = 'admin@lawbd.com';

    const user = db.findOne('users', { email: targetEmail });
    if (!user) {
      return res.status(404).json({ success: false, error: 'Demo user not found' });
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    const safeUser = { ...user };
    delete safeUser.password_hash;

    let lawyerProfile = null;
    if (user.role === 'lawyer') {
      lawyerProfile = db.findOne('lawyers', { user_id: user.id });
    }

    res.json({
      success: true,
      message: `Signed in as Demo ${user.role.toUpperCase()}: ${user.name}`,
      token,
      user: safeUser,
      lawyerProfile
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Demo login error' });
  }
});

// Current User Profile
router.get('/me', authenticate, (req, res) => {
  const safeUser = { ...req.user };
  delete safeUser.password_hash;

  let lawyerProfile = null;
  if (req.user.role === 'lawyer') {
    lawyerProfile = db.findOne('lawyers', { user_id: req.user.id });
  }

  res.json({
    success: true,
    user: safeUser,
    lawyerProfile
  });
});

// Update Profile
router.put('/profile', authenticate, (req, res) => {
  try {
    const { name, phone, location, avatar } = req.body;
    const updated = db.update('users', req.user.id, {
      ...(name && { name }),
      ...(phone !== undefined && { phone }),
      ...(location && { location }),
      ...(avatar && { avatar })
    });

    const safeUser = { ...updated };
    delete safeUser.password_hash;

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: safeUser
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to update profile' });
  }
});

export default router;
