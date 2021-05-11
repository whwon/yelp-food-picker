import express from 'express';
import { getYelpAPI } from '../controllers/api.js';

const router = express.Router();

router.get('/', getYelpAPI);

export default router;