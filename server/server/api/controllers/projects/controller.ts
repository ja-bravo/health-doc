import ProjectsService from '../../services/projects.service';
import { Request, Response } from 'express';

export class Controller {
  all(req: Request, res: Response): void {
    ProjectsService.all().then(r => res.json(r));
  }

  byId(req: Request, res: Response): void {
    ProjectsService.byId(req.params.id).then(r => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  create(req: Request, res: Response): void {
    ProjectsService.create(req.body).then(r =>
      res.json(r),
    );
  }

  delete(req: Request, res: Response): void {
    ProjectsService.delete(req.query.id).then(r =>
      res.json(r),
    );
  }

  update(req: Request, res: Response): void {
    ProjectsService.update(req.body).then(r =>
      res.json(r),
    );
  }
}
export default new Controller();
