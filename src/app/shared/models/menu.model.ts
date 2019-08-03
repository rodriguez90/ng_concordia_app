import { Role } from './role.model';
import {Model, User} from '../../../../projects/fbs-shared/src/lib/models';
import {TodoItemNode} from '../../../../projects/fbs-shared/src/lib/utils';


export enum Mode {
  View = 1,
  Edit = 2,
}

export interface Menu extends Model {
  name?: string;
  order?: number;
  active?: boolean;
  menuParentId?: number;
  cssIconClass?: string;
  url?: string;
  roles?: Role[];
  subMenus?: Menu[];
  mode?: Mode; // Este atributo es para editar en el árbol
  addSubMenu(subMenu: Menu): void;
}

export function buildMenu(
  id: number = null,
  name: string = '',
  order: number = null,
  active: boolean = true,
  cssIconClass: string = '',
  url: string = '',
  subMenus: Menu[] = [],
  menuParentId: number = null): Menu {

  let menu: Menu = {
    id: id,
    name: name,
    order: order,
    active: active,
    cssIconClass: cssIconClass,
    url: url || '',
    roles: [],
    subMenus: subMenus || [],
    menuParentId: menuParentId,
    mode: Mode.View,
    addSubMenu: function(subMenu: Menu): void {
      this.subMenus.push(subMenu);
    },
  };
  return menu;
}

function builRecursive(menu: Menu, children: Menu[]): any {

  children.forEach(element => {
    const menuChild = buildMenu(
      element.id,
      element.name,
      element.order,
      element.active,
      element.cssIconClass,
      element.url
    );
    menu.subMenus.push(menuChild);
  });
}

export interface MenuItemFlatNode {
  level: number;
  expandable: boolean;
  name: string;
  icon: string;
  mode?: Mode;
  order: number;
}

export function createMenuItemFlatNode(name: string = '',
  icon: string = '',
  level: number = null,
  expandable: boolean = false,
  mode: Mode = Mode.View,
  order: number = 0): MenuItemFlatNode {
  let menu: MenuItemFlatNode;

  menu = {
    name: name,
    level: level,
    icon: icon,
    expandable: expandable,
    mode: mode,
    order: order
  };

  return menu;
}

/**
 * Build the tree structure`.
 */
export function buildTree(menus: Menu[], level: number): TodoItemNode[] {
  return menus.reduce<TodoItemNode[]>((accumulator, menu) => {
    const node = new TodoItemNode();
    node.id = menu.id;
    node.item = menu.name;

    if (menu.subMenus != null) {
      node.children = buildTree(menu.subMenus, level + 1);
    }

    return accumulator.concat(node);
  }, []);
}

export function flatMenu(menus: Menu[], accumulator: Menu[] = []) {

  for (const menu of menus) {
    accumulator.push(menu);
    if (menu.subMenus) {
      flatMenu(menu.subMenus, accumulator);
    }
  }
}

export function findSubMenuRecursive(menuId: any, menu: Menu): Menu {
  let result = null;

  if (menu.id === menuId)
    return menu;
  else {
    for (let subMenu of menu.subMenus) {
      if (subMenu.id === menuId) { return subMenu; }
      result = findSubMenuRecursive(menuId, subMenu);
      if (result) { return result; }
    }
  }
}

export function replaceMenuRecurcive(menu: Menu, menus: Menu[]): boolean {
  if (typeof menu === 'undefined' &&
    menu == null) {
    return true;
  }

  let pos = -1;
  for (let i = 0; i < menus.length; i++) {
    const otherMenu: Menu = menus[i];
    if (otherMenu.id === menu.id || otherMenu.name === menu.name) {
      pos = i;
      break;
    }

    if (replaceMenuRecurcive(menu, otherMenu.subMenus) === true) { return true; }
  }

  if (pos >= 0) {
    console.log('pos: ', pos);
    console.log('menus before: ', menus);
    menus.splice(pos, 1, menu);
    console.log('menus after: ', menus);
    return true;
  }


  return false;
}
