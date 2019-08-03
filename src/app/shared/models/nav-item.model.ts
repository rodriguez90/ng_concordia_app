import { Menu } from './menu.model';

export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];
}

export function builNavItem(menu: Menu): any {
  let navItem: NavItem;
  navItem = {
    displayName: menu.name,
    iconName: menu.cssIconClass,
    route: menu.url,
    children: []
  }

  builNavItemRecursive(navItem, menu.subMenus);

  return navItem;
}

function builNavItemRecursive(navItem: NavItem, children: Menu[]): any {

  children.forEach(element => {
    const navItemChild = builNavItem(element);
    navItem.children.push(navItemChild);
  });
}

export function buildPrimeNGMenu(menu: Menu): any {
  let navItem: any;

  if (menu.subMenus && menu.subMenus.length === 0) {
    navItem = {
      label: menu.name,
      icon: menu.cssIconClass,
      // url: menu.url,
      routerLink: [`/${menu.url}`],
    };
  } else {
    navItem = {
      label: menu.name,
      icon: menu.cssIconClass,
      // routerLink: [`/${menu.url}`],
      // url: menu.url,
      items: []
    };
    builPrimeNGMenuRecursive(navItem, menu.subMenus);
  }

  return navItem;
}

function builPrimeNGMenuRecursive(navItem: any, children: Menu[]): any {

  children.forEach(element => {
    const navItemChild = buildPrimeNGMenu(element);
    navItem.items.push(navItemChild);
  });
}


