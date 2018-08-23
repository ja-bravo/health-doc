import L from '../../common/logger'
import database from '../../common/database';
import { Stats } from '../../../../shared/stats';
import { Project } from '.../../../../shared/project';
import { Check } from '../../../../shared/check';
import { Result } from '../../../../shared/result';
import axios from 'axios';

export class StatsService {
  async all(): Promise<Stats> {
    L.info('Fetch stats');
    
    const projects = (await database.find<Project[]>({type: 'project'})).length;
    const checks = (await database.find<Check[]>({type: 'check'})).length;

    const results = (await database.find<Result[]>({type: 'result'}, { time: -1 }, 100));
    const resultsCount = (await database.count({type: 'result'}));
    const successCount = (await database.count({type: 'result', success: true}));

    const successRatio = Number.parseFloat((successCount / resultsCount * 100).toFixed(2));
    const failureRatio = Number.parseFloat((100 - successRatio).toFixed(2));

    const stats: Stats = {
     checks,
     projects,
     lastResults: results,
     results: resultsCount,
     success: successRatio,
     failure: failureRatio, 
    }
    return Promise.resolve(stats);
  }
}

export default new StatsService();