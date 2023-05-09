import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRouter);

// Catch 404 errors
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Error handling middleware
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Internal server error';
  res.status(status).json({ message });
});

export default app;
