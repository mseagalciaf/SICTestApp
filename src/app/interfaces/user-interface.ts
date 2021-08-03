import { RoleInterface } from "./role-interface";

export interface UserInterface {
    id: number,
    name: string,
    email: string,
    created_at?: string,
    updated_at?: string,
    roles: RoleInterface[] 
}
