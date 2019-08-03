import {environment} from '../../../environments/environment';
import {urlEndPoints} from '../../config';

export let mockRoles = [];

const resourceUrl = `${environment.baseUrl}${environment.apiVersionName}/`;

export const getRoles = () => {

    if (mockRoles.length === 0) {
        let role = {
            id: '1',
            normalizedName: 'Administrador',
            name: 'Usuario con acceso y control total.',
        };
        // role.addMenu(getMenus()[3]);
        // role.addMenu(getMenus()[5]);
        mockRoles.push(role);

        role = {
            id: '2',
            normalizedName: 'Empleado',
            name: 'Empleado que le realizan ls pruebas.',
        };
        // role.addMenu(getMenus()[5]);
        mockRoles.push(role);

        role = {
            id: '3',
            normalizedName: 'Agencia',
            name: 'Usuario de una agencia.',
            };
        // role.addMenu(getMenus()[5]);
        mockRoles.push(role);

        role = {
            id: '4',
            normalizedName: 'Empresa',
            name: 'Usuario de una empresa.',
        };
        // role.addMenu(getMenus()[5]);
        mockRoles.push(role);
    }

    return mockRoles;
};

const readModel = (request: any): any => {
    // console.log('ReadUser');
    // console.log(request.params);
    const id = request.params.get('id');
    const result = mockRoles.find((role: any) => role.id == id);
    return result === undefined ? null : result;
};

const createModel = (request: any): any => {
    // console.log('createRole');
    // console.log(request.body);
    const role =  {
        id: String(mockRoles.length + 1),
        name: request.body['name'],
        normalizedName: request.body['description'],
    };
    mockRoles.push(role);
    return role;
};

const deleteModel = (request: any): any => {
    // console.log('deleteRole');
    // console.log(request);
    // console.log(request.params);
    // console.log(request.urlWithParams);

    return true;
};

const updateModel = (request: any): any => {
    // console.log('updateRole');
    // console.log(request.body);
    const id = request.body['id'];
    let theRole = null;

    mockRoles.map((role: any) => {
        if (role.id === id) {
            role.name = request.body['name'];
            role.normalizedName = request.body['description'];
            theRole = role;
        }
    });
    return theRole;
};

export const rolesEndPoints = {
    [`^${resourceUrl}${urlEndPoints.roles}$`]: {
        GET: {
            body: getRoles,
        },
        POST: {
            body: createModel,
        },
        PUT: {
            body: updateModel,
        },
    },
    [`^${resourceUrl}${urlEndPoints.roles}/\\d+$`]: {
        GET: { body: readModel},
        DELETE: {
            body: deleteModel
        },
    },
};

