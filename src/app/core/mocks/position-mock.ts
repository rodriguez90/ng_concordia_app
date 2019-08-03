import {environment} from '../../../environments/environment';
import {urlEndPoints} from '../../config';
import {PositionModel} from '../../shared/models';

export let mockPosition = [];

const resourceUrl = `${environment.baseUrl}${environment.apiVersionName}/`;

export const getPositions = () => {
    if (mockPosition.length === 0) {
        let position = {
            id: 1,
            name: 'Gerente',
            description: 'Gerente de la empresa.',
            active: true,
        };
        mockPosition.push(position);

        position = {
            id: 2,
            name: 'Jede de Departamento',
            description: 'Jefe de un determinado departamento.',
            active: true,
        };
        mockPosition.push(position);
    }

    return mockPosition;
};

export const readPosition = (request: any): any => {
    // console.log('readPosition');
    // console.log(request.params);
    const id = request.params.get('id');
    const result = mockPosition.find((position: PositionModel) => position.id === id);
    return result === undefined ? null : result;
};

export const createPosition = (request: any): any => {
    // console.log('createPosition');
    // console.log(request.params);
    const position = {
        id: mockPosition.length + 1,
        name: request.body['name'],
        description: request.body['description'],
        active: request.body['active']
    };
    mockPosition.push(position);
    return position;
};

export const deletePosition = (request: any): any => {
    return {};
};

export const updatePosition = (request: any): any => {
    return true;
};

export const positionEndPoints = {

    [`^${resourceUrl}${urlEndPoints.position}$`]: {
        GET: {
            body: getPositions,
        },
        POST: {
            body: createPosition,
        },
        PUT: {
            body: updatePosition,
        },
    },
    [`^${resourceUrl}${urlEndPoints.position}/\\d+$`]: {
        GET: { body: readPosition },
        DELETE: {
            body: deletePosition
        },
    },
};




