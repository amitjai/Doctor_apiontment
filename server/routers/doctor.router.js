import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { getDoctorInfo, updateDoctorInfo, getDoctorById } from '../controlers/doctor.controler.js';

const router = express.Router();


router.post('/get_doctor_info', authMiddleware, getDoctorInfo);

router.post('/update_doctor_info', authMiddleware, updateDoctorInfo);

router.post('/get_doctor_by_id', authMiddleware, getDoctorById);

export default router;