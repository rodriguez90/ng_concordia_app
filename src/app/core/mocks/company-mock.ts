import {Company} from '../../shared/models';
import {environment} from '../../../environments/environment';
import {urlEndPoints} from '../../config';

export let mockCompanies = [];

const resourceUrl = `${environment.baseUrl}${environment.apiVersionName}/`;

export const getCompanies = () => {

    if (mockCompanies.length === 0) {
        let company: Company = {
            id: 1,
            name: 'Comapany 1',
            description: 'Company 1.',
            logo: '',
            active: true
        };
        mockCompanies.push(company);

        company = {
            id: 2,
            name: 'Comapany 2',
            description: 'Company 2.',
            logo: '',
            active: true
        };
        mockCompanies.push(company);
    }

    return mockCompanies;
};

const readModel = (request: any): any => {
    // console.log('readCompany');
    // console.log(request.params);
    const id = request.params.get('id');
    const result = mockCompanies.find((company: Company) => company.id === id);
    return result === undefined ? null : result;
};

const createModel = (request: any): any => {
    // console.log('createCompany');
    // console.log(request.body);
    const company =  {
        id: mockCompanies.length + 1,
        name: request.body['name'],
        description: request.body['description'],
        active: request.body['active']
    };
    mockCompanies.push(company);
    return company;
};

const deleteModel = (request: any): any => {
    // console.log('deleteCompany');
    // console.log(request);
    // console.log(request.params);
    // console.log(request.urlWithParams);

    return true;
};

const updateModel = (request: any): any => {
    // console.log('updateCompany');
    // console.log(request.body);
    const id = request.body['id'];
    let theCompany = null;

    mockCompanies.map((company: any) => {
        if (company.id === id){
            company.name = request.body['name'];
            company.description = request.body['description'];
            theCompany = company;
        }
    });
    return theCompany;
};

export const companyEndPoints = {

    [`^${resourceUrl}${urlEndPoints.company}$`]: {
        GET: {
            body: getCompanies,
        },
        POST: {
            body: createModel,
        },
        PUT: {
            body: updateModel,
        },
    },
    [`^${resourceUrl}${urlEndPoints.company}/\\d+$`]: {
        GET: { body: readModel},
        DELETE: {
            body: deleteModel
        },
    },
};

