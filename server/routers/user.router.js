import express from 'express';
import { login, register, authData, applyDoctor, getAllNotification, getAllDoctorsList, bookApointment} from '../controlers/user.controlers.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();


router.post('/register', register);

router.post('/login', login);

router.post('/getUserData', authMiddleware, authData);

router.post('/apply_doctor', authMiddleware, applyDoctor);

router.post('/get_all_notification', authMiddleware, getAllNotification);

router.get('/get_all_doctors_list', authMiddleware, getAllDoctorsList);

router.post('/book_apointment', authMiddleware, bookApointment, bookApointment);


export default router;