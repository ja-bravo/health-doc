import L from '../../common/logger'
import database from '../../common/database';
import { Stats } from '../../../../shared/stats';
import { Project } from '.../../../../shared/project';
import { Check } from '../../../../shared/check';
import { Result } from '../../../../shared/result';

export class StatsService {
  async all(): Promise<Stats> {
    L.info('Fetch stats');
    
    const projects = (await database.find<Project[]>({type: 'project'})).length;
    const checks = (await database.find<Check[]>({type: 'check'})).length;
    const results = (await database.find<Result[]>({type: 'result'}));

    const success = results.filter(r => r.success);
    const successRatio = Number.parseFloat((success.length / results.length * 100).toFixed(2));
    const failureRatio = Number.parseFloat((100 - successRatio).toFixed(2));

    const stats: Stats = {
     checks,
     projects,
     results: results.length,
     success: successRatio,
     failure: failureRatio, 
    }
    return Promise.resolve(stats);
  }
}

export default new StatsService();