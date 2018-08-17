import { Check, getInterval } from './../../../web/src/app/shared/models/check';
import axios from 'axios';
import * as cron from 'node-cron';
import database from './database';
import checksService, { type } from '../api/services/checks.service';
import * as moment from 'moment';
import L from './logger';

class Scheduler {

    private shouldRun(check: Check) {
        if(!check.lastRun) return true;

        const interval = getInterval(check.checkType);
        const nextRun = moment(check.lastRun).add(interval, 'minutes');

        return nextRun.isBefore(moment(), 'minute');
    }

    private run() {
        L.info('Scheduler Running');
        database.find({type: type}).then((checks: Check[]) => {
            L.info('Number of checks', checks.length);

            // TODO: Send email every X time, check if project is active for that.
            for(let check of checks) {

                if(check.active && (!check.lastRun || this.shouldRun(check))) {
                    axios.get(check.endpoint).then(result => {
                        check.lastRun = moment().format();
                        database.update(check,type);
                        L.info('Check success', check);
                    })
                    .catch(e => {
                        L.error('Check failure', check);
                    })
                }
            }
        });
    }

    public init() {
        // this.run();
        cron.schedule('*/5 * * * *', this.run.bind(this), true);
    }
}

export default new Scheduler();