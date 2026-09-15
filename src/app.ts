import express, { type Application } from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.js';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Daftarkan route API tanpa memasang verifyToken global di sini
app.use('/api', apiRoutes);

export default app;