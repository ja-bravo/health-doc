import L from '../../common/logger'
import database from '../../common/database';
import { Project, Status } from '../../../../web/src/app/shared/models/project';



export class ProjectsService {
  all(): Promise<Project[]> {
    L.info('fetch all projects');
    return database.find({});
  }

  byId(id: number): Promise<Project> {
    L.info(`Fetch example with id ${id}`);
    return this.all().then(r => r[id])
  }

  create(project: Project): Promise<Project> {
    L.info(`Create project with name ${project.name}`);
    return database.insert(project, 'project');
  }

  delete(id): Promise<number> {
    L.info(`Delete project with id ${id}`);
    return database.delete(id, 'project');
  }

  update(project: Project): Promise<Project> {
    L.info(`Update project with id ${project._id}`);
    return database.update(project, 'project');
  }
}

export default new ProjectsService();