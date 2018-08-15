import { Application } from 'express';
import projectsRouter from './api/controllers/projects/router'

export default function routes(app: Application): void {
  app.use('/api/v1/projects', projectsRouter);
};