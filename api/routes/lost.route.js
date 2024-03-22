import express from 'express';
import { createLost, deleteLost, updateLost, getLost, getLosts } from '../controllers/lost.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createLost);
router.delete('/delete/:id', verifyToken, deleteLost);
router.post('/update/:id', verifyToken, updateLost);
router.get('/get/:id', getLost);
router.get('/get', getLosts);

export default router;
