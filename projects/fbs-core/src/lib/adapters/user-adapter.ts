// angular imports
import {Injectable} from '@angular/core';

// fbs imports
import {createUser, User} from '../../../../fbs-shared';
import {Adapter} from './adapter';

@Injectable()
export class UserAdapter implements Adapter<User> {
    constructor() {}
    adaptToApi(user: User): any {
        let userApi = null;
        if (user !== undefined && user != null) {
            userApi = {
                userName: user.username,
                email: user.email,
                passwordHash: user.password,
            };

            if (user.id !== null) {
                userApi['id'] = user.id;
            }
        }

        // console.log(JSON.stringify(userApi, null, 2));

        return userApi;
    }

    adaptFromApi(modelApi: any): User {
        let user: User = null;
        if (modelApi !== 'undefined' && modelApi != null) {
            user = createUser(
                modelApi.id,
                modelApi.userName,
                modelApi.passwordHash == null ? '' : modelApi.passwordHash,
                modelApi.email,
                true,
                modelApi.token,
            );
        }

        return user;
    }

    adaptAttributeToApi(attributeName: string): string {
        let apiAttributeName = '';
        switch (attributeName) {
            case 'id':
                apiAttributeName = 'Id';
                break;
            case 'username':
                apiAttributeName = 'UserName';
                break;
            case 'email':
                apiAttributeName = 'Email';
                break;
            case 'active':
                apiAttributeName = 'EstaActivo';
                break;
            default:
                apiAttributeName = '';
                break;
        }
        return apiAttributeName;
    }
}
