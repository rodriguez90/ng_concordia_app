import {environment} from '../../../environments/environment';
import {urlEndPoints} from '../../config';
import { getUsers } from './users-mock';

import {User} from '../../../../projects/fbs-shared/src/lib/models';

function login(request: any): any {
  // console.log('Ejecutando el login');
  // console.log(request);
  // console.log(request.body);
  const username = request.body.username;
  const password = request.body.password;
  // console.log('username: ' + username);
  // console.log('password: ' + password);
  // console.log('YA debo tener user y pass el login');
  const result = getUsers().find((user: User) => user.username === username && user.password === password);
  return result === undefined ? null : result;
}

function logout(request: any): any {
  // console.log('Ejecutando el logout');
  // console.log(request);
  // console.log(request.body);
  const username = request.body.username;
  // console.log('username: ' + username);
  const result = getUsers().find((user: User) => user.username === username);
  // console.log('logout result: ' + result);
  return {success: result};;
}

const resourceUrl = `${environment.baseUrl}${environment.apiVersionName}`;

export const authEndPoints = {
  [`${resourceUrl}${urlEndPoints.authLogin}`]: {
    POST: {
      body: login,
    }
  },
  [`${resourceUrl}${urlEndPoints.authLogout}`]: {
    POST: {
      body: logout,
    }
  },
};
