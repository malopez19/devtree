import express from 'express';
import dotenv from 'dotenv';

import router from './router';
import { connectDB } from './config/db';
dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(router);

export default app;