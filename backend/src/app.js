import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
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
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
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

// Health Check
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

// Global Error Handler
app.use(errorHandler);

export default app;
