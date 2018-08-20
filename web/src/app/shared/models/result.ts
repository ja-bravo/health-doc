import * as moment from 'moment';

export interface Result {
    _id?: string;
    checkId: string;
    projectId: string;
    endpoint: string;
    success: boolean;
    createdAt?: string;
}
