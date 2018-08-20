import * as moment from 'moment';

export interface Project {
    _id: string;
    name: string;
    email: string;
    checks: number;
    active: boolean;
    createdAt?: string;
}

export enum Status  {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

