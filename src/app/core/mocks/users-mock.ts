import {environment} from '../../../environments/environment';
import {urlEndPoints} from '../../config';
import { getRoles } from './roles-mock';
import {User} from '../../../../projects/fbs-shared/src/lib/models';


let mockUsers = [];
const resourceUrl = `${environment.baseUrl}${environment.apiVersionName}/`;

export const getUsers = () => {
  console.warn('getUsers');
  if (mockUsers.length === 0) {
    const roles = getRoles();
    let user = {
      id: '1',
      userName: 'user1',
      name: 'user1',
      surname: 'user1',
      email: 'user1@gmail.com',
      passwordHash: 'user1',
      roles: []
    };
    // user.roles.push(roles[0]);
    mockUsers.push(user);

    user = {
      id: '2',
      userName: 'user2',
      name: 'user2',
      surname: 'user2',
      email: 'user2@gmail.com',
      passwordHash: 'user2',
      roles: []
    };

    user.roles.push(roles[1]);
    mockUsers.push(user);

    user = {
      id: '3',
      userName: 'user3',
      name: 'user3',
      surname: 'user3',
      email: 'user3@gmail.com',
      passwordHash: 'user3',
      roles: []
    };

    user.roles.push(roles[0]);
    user.roles.push(roles[2]);

    mockUsers.push(user);

    user = {
      id: '4',
      userName: 'user4',
      name: 'user4',
      surname: 'user4',
      email: 'user4@gmail.com',
      passwordHash: 'user4',
      roles: []
    };
    // user.roles.push(roles[0]);
    mockUsers.push(user);

    user = {
      id: '5',
      userName: 'user5',
      name: 'user5',
      surname: 'user5',
      email: 'user5@gmail.com',
      passwordHash: 'user5',
      roles: []
    };
    // user.roles.push(roles[0]);
    mockUsers.push(user);

    user = {
      id: '6',
      userName: 'user6',
      name: 'user6',
      surname: 'user6',
      email: 'user6@gmail.com',
      passwordHash: 'user6',
      roles: []
    };
    // user.roles.push(roles[0]);
    mockUsers.push(user);
  }

  return mockUsers;
};

export const readUser = (request: any): any => {
  // console.log('ReadUser');
  // console.log(request.params);
  const id = request.params.get('id');
  const result = mockUsers.find((user: User) => user.id === id);
  return result === undefined ? null : result;
};

const createUser2 = (request: any): any => {
  return {};
};

const deleteUser = (request: any): any => {
  console.info('deleteUser');
  return {};
};

const updateUser = (request: any): any => {
  console.info('updateUser');
  return {};
};

export const usersEndPoints = {

  [`^${resourceUrl}${urlEndPoints.users}$`]: {
    GET: {
      body: getUsers,
    },
    POST: {
      body: createUser2,
    },
    PUT: {
      body: updateUser,
    },
  },
  [`^${resourceUrl}${urlEndPoints.users}/\\d+$`]: {
    GET: { body: readUser },
    DELETE: {
      body: deleteUser
    },
  },
};




