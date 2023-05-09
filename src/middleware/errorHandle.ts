import { Request, Response, NextFunction } from 'express';

function errorHandle(err: Error, req: Request, res: Response, next: NextFunction): void {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
}

export default errorHandle;
