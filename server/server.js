import 'dotenv/config';
import express from 'express';
import dbConnection from './connectionDB/dbConnection.js';
import userRouter from './routers/user.router.js';
import adminRouter from './routers/admin.router.js';
import doctorRouter from './routers/doctor.router.js';
import cors from 'cors';


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);

app.listen(port, () => {
    console.log(`Server listen at http://localhost:${port}`);
})