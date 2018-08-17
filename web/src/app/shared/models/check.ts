import * as moment from 'moment';

export interface Check {
    _id?: string;
    projectId: string;
    name: string;
    endpoint: string;
    active: boolean;
    checkType: Types;
    lastRun?: string;
    createdAt?: string;
}

export enum Types {
    DAILY,
    EVERY_HOUR,
    EVERY_HALF_HOUR,
    EVERY_TEN_MINUTES,
    EVERY_FIVE_MINUTES,
}

export enum Status {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

export const getInterval = (type: Types) => {
    switch (type) {
        case Types.DAILY:
            return 24 * 60;
        case Types.EVERY_HOUR:
            return 60;
        case Types.EVERY_HALF_HOUR:
            return 30;
        case Types.EVERY_TEN_MINUTES:
            return 10;
        case Types.EVERY_FIVE_MINUTES:
            return 5;
    }
};
