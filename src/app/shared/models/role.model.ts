import { Menu } from './menu.model';
import {Model, User} from '../../../../projects/fbs-shared/src/lib/models';

export interface Role extends Model {
  name?: string;
  normalizedName?: string;
  description?: string;
  active?: boolean;
  menus?: Menu[];
  addMenu(menu: Menu): any;
  hasMenu(name: string): any;
}

export function createRole(id: string,
                           name: string,
                           normalizedName: string,
                           description: string,
                           active: boolean | true,
                           menus?: Menu[]): any {

  let role: Role;

  role = {
    id: id,
    name: name,
    normalizedName: normalizedName,
    description: description,
    active: active,
    menus: menus || [],
    addMenu: function (menu: Menu): any {
      this.menus.push(menu);
    },
    hasMenu: function (menuName: string): any {
      this.menus.find(menu => menu.name === name);
    }
  };
  return role;
}
