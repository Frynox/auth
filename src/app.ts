import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import authRoutes from './routes/auth';

const app: Application = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/auth', authRoutes);

export default app;