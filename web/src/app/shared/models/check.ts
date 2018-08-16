import * as moment from 'moment';

export interface Check {
    _id?: string;
    projectId: string;
    name: string;
    endpoint: string;
    active: boolean;
    type: Types;
    customData?: any;
    createdAt?: moment.Moment;
}

export enum Types {
    DAILY,
    EVERY_HOUR,
    EVERY_HALF_HOUR,
    EVERY_TEN_MINUTES,
    CUSTOM,
}

export enum Status  {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

