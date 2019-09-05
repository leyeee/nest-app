export interface Result {
    error?: number;
    code: number;
    message: string;
    data?: any;
    requestBody?: any;
}
