import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { getAllDoctors, getAllUsers, changeAccountStatus } from '../controlers/admin.controlers.js';

const router = express.Router();

router.get('/get_all_doctors', authMiddleware, getAllDoctors);

router.get('/get_all_users', authMiddleware, getAllUsers);

router.post('/change_account_status', authMiddleware, changeAccountStatus);

export default router;