export interface Audit {
    _id: string;
    username: string;
    action: string;
    details: string;
    date: Date;
}