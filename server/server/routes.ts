import { Application } from 'express';
import projectsRouter from './api/controllers/projects/router'
import checksRouter from './api/controllers/checks/router'
import statsRouter from './api/controllers/stats/router';
import userRouter from './api/controllers/user/router';
import * as passport from 'passport';

export default function routes(app: Application): void {
  app.use('/api/v1/projects', passport.authenticate('user', { session: false }), projectsRouter);
  app.use('/api/v1/checks', passport.authenticate('user', { session: false }), checksRouter);
  app.use('/api/v1/stats', passport.authenticate('user', { session: false }), statsRouter);
  app.use('/api/v1/user', userRouter);
};