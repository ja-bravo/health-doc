import * as nodemailer from 'nodemailer';
import { Result } from '../../../shared/result';
import L from './logger';
import * as moment from 'moment';

const transportConfig = require('../../transport.json');

class Emailer {
    private transport: nodemailer.Transporter;

    constructor() {
        this.transport = nodemailer.createTransport(transportConfig);
    }

    sendFailure(result: Result, to: string) {
        this.transport.sendMail({from: transportConfig.sender,to,html: `
            <h1>Health Doc check result</h1>
            <p><b>Project: </b> ${result.projectName} | ${result.projectId}</p>
            <p><b>Check: </b> ${result.checkName} | ${result.checkId}</p>
            <p><b>Endpoint: </b> ${result.endpoint} </p>
            <p><b>Time: </b> ${moment(result.time).format('HH:mm:ss DD/MM/YYYY')}</p>
            <p><b>Extra: </b> <pre>${result.extra}</pre></p>
        `}).then(r => {
            L.info('Email sent', r);
        })
        .catch(e => {
            L.error("Email didn't send", e);
        })
    }
}

const e = new Emailer();
export default e;