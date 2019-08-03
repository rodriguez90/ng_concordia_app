import {Model} from './model';

export interface User extends Model {
    username: string;
    password: string;
    email: string;
    active: boolean;
    token?: string;
    roles?: any[];
    hasRole(roleName: string): boolean;
}

export function createUser(
    id?: string,
    username?: string,
    password?: string,
    email?: string,
    active?: boolean,
    token?: string): User {

    let user: User;
    user = {
        id: id,
        username: username,
        password: password,
        email: email,
        active: active,
        token: token,
        hasRole: function (roleName: string): any {
            for (const role of user.roles) {
                if (role.name === roleName) {
                    return true;
                }
            }
            return false;
        },
    };
    return user;
}
