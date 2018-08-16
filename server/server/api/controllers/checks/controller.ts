import ChecksService from '../../services/checks.service';
import { Request, Response } from 'express';

export class Controller {
  all(req: Request, res: Response): void {
    ChecksService.all().then(r => res.json(r));
  }

  byProjectId(req: Request, res: Response): void {
    ChecksService.byProjectId(req.query.id).then(r => res.json(r));
  }

  byId(req: Request, res: Response): void {
    ChecksService.byId(req.params.id).then(r => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  create(req: Request, res: Response): void {
    ChecksService.create(req.body).then(r =>
      res.json(r),
    );
  }

  delete(req: Request, res: Response): void {
    ChecksService.delete(req.query.id).then(r =>
      res.json(r),
    );
  }

  update(req: Request, res: Response): void {
    ChecksService.update(req.body).then(r =>
      res.json(r),
    );
  }
}
export default new Controller();
