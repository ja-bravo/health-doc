import StatsService from '../../services/stats.service';

import { Request, Response } from 'express';

export class Controller {
  all(req: Request, res: Response): void {
    StatsService.all().then(r => res.json(r));
  }
}
export default new Controller();
