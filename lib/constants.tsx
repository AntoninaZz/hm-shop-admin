import { Folders, LayoutDashboard, PanelTopClose, ShoppingBag, Tag, UsersRound } from 'lucide-react';

export const navLinks = [
    {
        url: "/",
        icon: <LayoutDashboard />,
        label: "Dashboard",
    },
    {
        url: "/categories",
        icon: <Folders />,
        label: "Categories",
    },
    {
        url: "/products",
        icon: <Tag />,
        label: "Products",
    },
    {
        url: "/banners",
        icon: <PanelTopClose />,
        label: "Banners",
    },
    {
        url: "/orders",
        icon: <ShoppingBag />,
        label: "Orders",
    },
    {
        url: "/customers",
        icon: <UsersRound />,
        label: "Customers",
    },
];