export interface Patient {
    id: number | string;
    firstName: string;
    lastName: string;
    birthDate: string;
    phone?: string;
    email?: string;
}