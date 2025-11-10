export enum RoleEnum {
    ROLE_USER, ROLE_ADMIN
}

export interface User {
    id : number | string;
    enabled : boolean;
    firstName :String;
    lastName :String;
    userName :String;
    email :String;
    password :String;
    role :RoleEnum;
}