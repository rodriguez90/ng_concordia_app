import {environment} from '../../../environments/environment';
import {urlEndPoints} from '../../config';
import {Company, Office} from '../../shared/models';
import { getCompanies } from './company-mock';


export let mockOffice = [];

const resourceUrl = `${environment.baseUrl}${environment.apiVersionName}/`;

export const getOffice = () => {
    if (mockOffice.length === 0) {
        const companies: Company[] = getCompanies();
        let office = {
            id: 1,
            name: 'RRHH',
            description: 'Recursos Humanos',
            active: true,
            company: companies[0]
        };
        mockOffice.push(office);

        office = {
            id: 2,
            name: 'Personal',
            description: 'Personal',
            active: true,
            company: companies[0]
        };
        mockOffice.push(office);
    }

    return mockOffice;
};

export const readOffice = (request: any): any => {
    // console.log('readOffice');
    // console.log(request.params);
    const id = request.params.get('id');
    const result = mockOffice.find((office: Office) => office.id === id);
    return result === undefined ? null : result;
};

export const createOffice = (request: any): any => {
    // console.log('createOffice');
    // console.log(request.params);
    let office = {
        id: mockOffice.length + 1,
        name: request.body['name'],
        description: request.body['description'],
        active: request.body['active'],
        company: request.body['company']
    };
    mockOffice.push(office);
    return office;
};

export const deleteOffice = (request: any): any => {
    console.info('deleteOffice');
    return {};
};

export const updateOffice = (request: any): any => {
    console.info('updateOffice');
    return true;
};

export const officeEndPoints = {

    [`^${resourceUrl}${urlEndPoints.office}$`]: {
        GET: {
            body: getOffice,
        },
        POST: {
            body: createOffice,
        },
        PUT: {
            body: updateOffice,
        },
    },
    [`^${resourceUrl}${urlEndPoints.office}/\\d+$`]: {
        GET: { body: readOffice },
        DELETE: {
            body: deleteOffice
        },
    },
};




