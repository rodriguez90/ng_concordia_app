import {Model, User} from '../../../../projects/fbs-shared/src/lib/models';

export interface Company extends Model {
  id?: number;
  name?: string;
  description?: string;
  logo?: string;
  active?: boolean;
}

export function createCompany(
  id: number,
  name: string,
  description: string,
  logo: string,
  active: boolean
): Company {
  let company: Company;
  company = {
    id: id,
    name: name,
    description: description,
    logo: logo,
    active: active
  };
  return company;
}
