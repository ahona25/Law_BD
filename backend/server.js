import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
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
const frontendDist = path.join(__dirname, '../frontend/dist');

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

// Serve production frontend assets
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
}

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

// Single Page Application (SPA) catch-all fallback for client-side routing
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
    return res.status(404).json({
      success: false,
      error: `API endpoint '${req.path}' not found`
    });
  }
  const indexPath = path.join(frontendDist, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  return res.status(200).send(`
    <html>
      <head><title>Law_BD API Server</title></head>
      <body style="font-family:sans-serif;padding:40px;background:#071A14;color:#F8FAF9;text-align:center;">
        <h1 style="color:#10B981;">⚖️ Law_BD API Backend is Online</h1>
        <p>The backend is active on port ${PORT}.</p>
        <p>To access the full combined frontend, build it with <code>npm run build</code> or run in development mode with <code>npm run dev</code>.</p>
        <p><a href="/api/health" style="color:#60A5FA;">Check API Health</a></p>
      </body>
    </html>
  `);
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
  console.log(`⚖️ Law_BD Combined Server is running on http://localhost:${PORT}`);
  console.log(`📡 API Endpoints available at http://localhost:${PORT}/api`);
  console.log(`💻 Frontend application accessible at http://localhost:${PORT}`);
});
