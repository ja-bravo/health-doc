import { Check, getInterval } from '../../../shared/check';
import axios from 'axios';
import * as cron from 'node-cron';
import database from './database';
import * as moment from 'moment';
import L from './logger';
import { Project } from '../../../shared/project';
import { Result } from '../../../shared/result';
import Email from './email';

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
                    L.info('Testing...');
                    await axios.get(check.endpoint, { timeout: 10000});
                    check.lastRun = moment().format();
                    database.update(check, 'check');
                    const result: Result = {
                        checkId: check._id,
                        checkName: check.name,
                        projectName: project.name,
                        time: moment().format(),
                        projectId: project._id,
                        success: true,
                        endpoint: check.endpoint,
                    };

                    database.insert(result, 'result');
                    L.info('Check success', check._id);
                }
                catch (e) {
                    L.error('Check failure', check);
                    const result: Result = {
                        checkId: check._id,
                        checkName: check.name,
                        projectName: project.name,
                        projectId: project._id,
                        success: false,
                        time: moment().format(),
                        endpoint: check.endpoint,
                        extra: e.message,
                    };
                    database.insert(result, 'result');
                    Email.sendFailure(result, project.email);
                }
            }
        }
    }

    public init() {
        // this.run();
        cron.schedule('*/5 * * * *', this.run.bind(this), true);
    }
}

export default new Scheduler();