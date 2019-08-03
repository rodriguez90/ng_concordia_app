import { Menu } from './menu.model';

export interface SidebarItem {
  displayName: string;
  iconName: string;
  disabled?: boolean;
  route?: string;
  children?: SidebarItem[];
}

export function buildSidebarItem(
  name: string,
  icon: string,
  disabled: boolean = false,
  route: string = ''): SidebarItem {

  const menu: SidebarItem = {
    displayName: name,
    iconName: icon,
    disabled: disabled,
    children: [],
  };


  return menu;
}
