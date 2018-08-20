import L from '../../common/logger'
import database from '../../common/database';
import { Project } from '../../../../shared/project';

const type = 'project';
export class ProjectsService {
  all(): Promise<Project[]> {
    L.info('fetch all projects');
    return database.find({type});
  }

  byId(id: number): Promise<Project> {
    L.info(`Fetch project with id ${id}`);
    return database.find({_id: id, type});
  }

  create(project: Project): Promise<Project> {
    L.info(`Create project with name ${project.name}`);
    return database.insert(project, type);
  }

  delete(id): Promise<number> {
    L.info(`Delete project with id ${id}`);
    return database.delete(id, type);
  }

  update(project: Project): Promise<Project> {
    L.info(`Update project with id ${project._id}`);
    return database.update(project, type);
  }
}

export default new ProjectsService();