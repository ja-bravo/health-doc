import { Application } from 'express';
import projectsRouter from './api/controllers/projects/router'
import checksRouter from './api/controllers/checks/router'
import statsRouter from './api/controllers/stats/router';
import userRouter from './api/controllers/user/router';

export default function routes(app: Application): void {
  app.use('/api/v1/projects', projectsRouter);
  app.use('/api/v1/checks', checksRouter);
  app.use('/api/v1/stats', statsRouter);
  app.use('/api/v1/user', userRouter);
};