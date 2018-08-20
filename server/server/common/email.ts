import * as nodemailer from 'nodemailer';
import { Result } from '../../../web/src/app/shared/models/result';
import L from './logger';

const transportConfig = require('../../transport.json');

class Emailer {
    private transport: nodemailer.Transporter;

    constructor() {
        this.transport = nodemailer.createTransport(transportConfig);
    }

    sendFailure(result: Result) {
        this.transport.sendMail({from: transportConfig.sender,to: 'jose@boonagency.ie', html: `
            <h1>Test failure!</h1>
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