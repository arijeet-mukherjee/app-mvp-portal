type MenuItemType = {
    icon: JSX.Element;
    label: string;
    route: string;
    isAdmin?: boolean;
    isLocked?: boolean;
};

export type SidebarItemType = {
    name: string;
    menuItems: MenuItemType[];
};