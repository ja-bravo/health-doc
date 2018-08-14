import * as moment from 'moment';

export interface Project {
    id: number;
    name: string;
    checks: number;
    active: boolean;
    createdAt: moment.Moment;
}
