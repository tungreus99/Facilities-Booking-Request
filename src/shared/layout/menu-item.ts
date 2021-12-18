export class MenuItem {
  id: number;
  parentId: number;
  label: string;
  route: string;
  icon: string;
  permissionName: any[];
  isActive?: boolean;
  isCollapsed?: boolean;
  children: MenuItem[];

  constructor(
    label: string,
    route: string,
    icon: string,
    permissionName: any[] = [],
    children: MenuItem[] = null
  ) {
    this.label = label;
    this.route = route;
    this.icon = icon;
    this.permissionName = permissionName;
    this.children = children;
  }
}
