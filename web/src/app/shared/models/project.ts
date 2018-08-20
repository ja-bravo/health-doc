import * as moment from 'moment';

export interface Project {
    _id: string;
    name: string;
    email: string;
    checks: number;
    active: boolean;
    createdAt: moment.Moment;
}

export enum Status  {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

