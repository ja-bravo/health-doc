
export interface Result {
    _id?: string;
    checkId: string;
    projectId: string;
    checkName: string;
    projectName: string;
    endpoint: string;
    success: boolean;
    time?: string;
    extra?: any;
    createdAt?: string;
}
