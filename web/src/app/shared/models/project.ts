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


// {
//  "service": "gmail",
//  "auth": {
//         "user": "healthdocjs@gmail.com",
//         "pass": "9YJ5u1K6v"
//     }
// }