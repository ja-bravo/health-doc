import { Result } from './result';
export interface Stats {
    projects: number;
    checks: number;
    lastResults: Result[];
    results: number;
    success: number;
    failure: number;
}
