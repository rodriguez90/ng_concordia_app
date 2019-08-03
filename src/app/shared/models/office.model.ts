import { Company } from './company.model';
import {Model, User} from '../../../../projects/fbs-shared/src/lib/models';

export interface Office extends Model {
  id?: number;
  name?: string;
  description?: string;
  active?: boolean;
  company?: Company;
  city?: string;
  hasCompany(companyName: string): boolean;
  addCompany(company: Company): void;
  removeCompany(company: Company): boolean;
}

export function createOffice(
  id: number,
  name: string,
  description: string,
  active: boolean,
  company: Company | null,
  city: string
): Office {
  let office: Office;
  office = {
    id: id,
    name: name,
    description: description,
    active: active,
    company: company,
    city: city,
    hasCompany: function (companyName: string) {
      if (office.company.name === companyName) {
        return true;
      }
    },
    addCompany: function (company: Company) {
      this.company = company;
    },
    removeCompany: function (company: Company) {
      this.company = null;
      return true;
    }
  };
  return office;
}
