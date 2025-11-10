export enum RoleEnum {
    ROLE_USER, ROLE_ADMIN
}

export interface Patient {
    id: number | string;
    firstName: string;
    lastName: string;
    birthDate: string;
    phone?: string;
    email?: string;
}