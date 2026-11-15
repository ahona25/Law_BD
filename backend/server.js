import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { runSeeds } from './db/seed.js';
import authRoutes from './routes/authRoutes.js';
import lawsRoutes from './routes/lawsRoutes.js';
import incidentRoutes from './routes/incidentRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import lawyersRoutes from './routes/lawyersRoutes.js';
import appointmentsRoutes from './routes/appointmentsRoutes.js';
import messagesRoutes from './routes/messagesRoutes.js';
import casesRoutes from './routes/casesRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import contentRoutes from './routes/contentRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Initialize seeds
runSeeds();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/laws', lawsRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/lawyers', lawyersRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/cases', casesRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/content', contentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'Law_BD - Bangladesh Legal Platform API',
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`⚖️ Law_BD Backend API Server is running on http://localhost:${PORT}`);
});
