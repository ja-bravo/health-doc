import L from '../../common/logger'
import database from '../../common/database';
import { Check } from '../../../../web/src/app/shared/models/check';

export const type = 'check';
export class ChecksService {
  all(): Promise<Check[]> {
    L.info('fetch all Checks');
    return database.find({type});
  }

  byProjectId(id: string): Promise<Check> {
    L.info(`Fetch check from project with id ${id}`);
    return database.find({type, projectId: id})
  }

  byId(id: string): Promise<Check> {
    L.info(`Fetch check with id ${id}`);
    return database.find({_id: id, type});
  }

  create(check: Check): Promise<Check> {
    L.info(`Create check with name ${check.name}`);
    return database.insert(check, type);
  }

  delete(id): Promise<number> {
    L.info(`Delete check with id ${id}`);
    return database.delete(id, type);
  }

  update(check: Check): Promise<Check> {
    L.info(`Update check with id ${check._id}`);
    return database.update(check, type);
  }
}

export default new ChecksService();