import UserService from '../../services/user.service';

import { Request, Response } from 'express';

export class Controller {
  signIn(req: Request, res: Response): void {
    UserService.signIn(req.body.user, req.body.password).then(r => res.json(r));
  }

  register(req: Request, res: Response): void {
    UserService.register(req.body.user, req.body.password).then(r => res.json(r));
  }

  isFirstTime(req: Request, res: Response): void {
    UserService.isFirstTime().then(r => res.json(r));
  }
}
export default new Controller();
