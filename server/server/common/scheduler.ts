import { Check, getInterval } from './../../../web/src/app/shared/models/check';
import axios from 'axios';
import * as cron from 'node-cron';
import database from './database';
import * as moment from 'moment';
import L from './logger';
import { Project } from '../../../web/src/app/shared/models/project';
import { Result } from '../../../web/src/app/shared/models/result';

class Scheduler {

    private shouldRun(check: Check) {
        if (!check.lastRun) return true;

        const interval = getInterval(check.checkType);
        const nextRun = moment(check.lastRun).add(interval, 'minutes');
        return nextRun.isBefore(moment(), 'minute');
    }

    private async run() {
        const checks = await database.find<Check[]>({ type: 'check', active: true });
        L.info('Scheduler Running', checks.length);

        // TODO: Send email every X time, check if project is active for that.
        for (let check of checks) {
            const project: Project = (await database.find<Project[]>({ _id: check.projectId }))[0];

            if (project.active && check.active && this.shouldRun(check)) {
                try {
                    await axios.get(check.endpoint);
                    check.lastRun = moment().format();
                    database.update(check, 'check');
                    const result: Result = {
                        checkId: check._id,
                        projectId: project._id,
                        success: true,
                        endpoint: check.endpoint,
                    };

                    database.insert(result, 'result');
                    L.info('Check success', check);
                }
                catch (e) {
                    L.error('Check failure', check);
                    const result: Result = {
                        checkId: check._id,
                        projectId: project._id,
                        success: false,
                        endpoint: check.endpoint,
                    };
                    database.insert(result, 'result');
                }
            }
        }
    }

    public init() {
        this.run();
        // cron.schedule('*/5 * * * *', this.run.bind(this), true);
    }
}

export default new Scheduler();