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

// ─── CORS ────────────────────────────────────────────────────────────────────
// Must be registered BEFORE body parsers and routes so that preflight OPTIONS
// responses and error responses always carry the correct ACAO header.

const rawOrigins = process.env.CORS_ORIGINS || '';

// Always allow localhost dev origin. Production origins come from the env var.
const explicitOrigins = [
  'http://localhost:5173',
  'http://localhost:4173', // vite preview
  ...rawOrigins
    .split(',')
    .map((o) => o.trim().replace(/\/+$/, '')) // strip trailing slashes
    .filter(Boolean),
];

// Deduplicate
const allowedOrigins = [...new Set(explicitOrigins)];

console.log('[CORS] Allowed explicit origins:', allowedOrigins);

const corsOptions = {
  origin(origin, callback) {
    // Allow server-to-server / curl (no origin header)
    if (!origin) return callback(null, true);

    // Exact match
    if (allowedOrigins.includes(origin)) return callback(null, true);

    // Allow any *.vercel.app preview deployment
    if (/^https:\/\/[a-z0-9-]+-[a-z0-9]+-[a-z0-9]+\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }
    // Broader: any vercel.app domain
    if (/\.vercel\.app$/.test(origin)) return callback(null, true);

    console.warn('[CORS] Blocked origin:', origin);
    return callback(new Error(`CORS: Origin "${origin}" is not allowed`));
  },
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
};

// Handle OPTIONS preflight for all routes first
app.options('*', cors(corsOptions));

// Apply CORS to every request
app.use(cors(corsOptions));

// ─── Body Parsers ────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Serve uploaded static files if any
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    status: 'online',
    brand: '3 Sixtey - Project and Media Solution',
    time: new Date().toISOString(),
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/reviews', reviewRoutes);
app.use('/api/callbacks', callbackRoutes);

// ─── Serve Frontend Production Build ─────────────────────────────────────────
const frontendDistPath = path.resolve(__dirname, '../../frontend/dist');
const altFrontendDistPath = path.resolve(__dirname, '../dist');

const activeDist = fs.existsSync(frontendDistPath)
  ? frontendDistPath
  : fs.existsSync(altFrontendDistPath)
  ? altFrontendDistPath
  : null;

if (activeDist) {
  app.use(express.static(activeDist));

  // SPA fallback — skip /api/* so API 404s are handled below
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(activeDist, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({
      ok: true,
      status: 'online',
      brand: '3 Sixtey - Project and Media Solution API',
      health: '/api/health',
      endpoints: { reviews: '/api/reviews', callbacks: '/api/callbacks' },
    });
  });
}

// ─── 404 Handler (JSON, keeps CORS headers) ───────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found.` });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorHandler);

export default app;
