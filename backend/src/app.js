import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import reviewRoutes from './routes/reviewRoutes.js';
import callbackRoutes from './routes/callbackRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Serve uploaded static files if any
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: '3 Sixtey - Project and Media Solution',
    time: new Date().toISOString(),
  });
});

// Single-page REST API Routes
app.use('/api/reviews', reviewRoutes);
app.use('/api/callbacks', callbackRoutes);

// ── Serve Frontend Production Build (Fix for "Cannot GET /" on Render) ──
const frontendDistPath = path.resolve(__dirname, '../../frontend/dist');
const altFrontendDistPath = path.resolve(__dirname, '../dist');

const activeDist = fs.existsSync(frontendDistPath)
  ? frontendDistPath
  : fs.existsSync(altFrontendDistPath)
  ? altFrontendDistPath
  : null;

if (activeDist) {
  // Serve static assets from frontend/dist
  app.use(express.static(activeDist));

  // Client-side SPA routing fallback
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(activeDist, 'index.html'));
  });
} else {
  // Fallback if running pure API mode without built frontend
  app.get('/', (req, res) => {
    res.json({
      status: 'online',
      brand: '3 Sixtey - Project and Media Solution API',
      health: '/api/health',
      endpoints: {
        reviews: '/api/reviews',
        callbacks: '/api/callbacks',
      },
    });
  });
}

// Global Error Handler
app.use(errorHandler);

export default app;
