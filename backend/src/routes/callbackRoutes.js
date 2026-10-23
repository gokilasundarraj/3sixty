import { Router } from 'express';
import { createCallback } from '../controllers/callbackController.js';

const router = Router();

// POST /api/callbacks — student requests a project callback
router.post('/', createCallback);

export default router;
