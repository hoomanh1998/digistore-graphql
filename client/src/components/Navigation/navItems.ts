import {
  HomeIcon,
  CartIcon,
  ProductsIcon,
  ProfileIcon,
  SearchIcon,
} from "../../assets/svgs";

export const navItems = [
  {
    title: "Home",
    path: "/home",
    isExactPath: true,
    isPrivateRoute: false,
    hasBadge: false,
    icon: HomeIcon,
  },
  {
    title: "Products",
    path: "/home/products",
    isExactPath: true,
    isPrivateRoute: true,
    hasBadge: false,
    icon: ProductsIcon,
  },
  {
    title: "Cart",
    path: "/home/cart",
    isExactPath: true,
    isPrivateRoute: true,
    hasBadge: true,
    icon: CartIcon,
  },
];

export const mobileNavItems = [
  {
    title: "Home",
    path: "/home",
    isExactPath: true,
    isPrivateRoute: false,
    hasBadge: false,
    icon: HomeIcon,
  },
  {
    title: "Search",
    path: "/home/products",
    isExactPath: true,
    isPrivateRoute: false,
    hasBadge: false,
    icon: SearchIcon,
  },
  {
    title: "Cart",
    path: "/home/cart",
    isExactPath: true,
    isPrivateRoute: true,
    hasBadge: true,
    icon: CartIcon,
  },
  {
    title: "Profile",
    path: "/home/profile",
    isExactPath: false,
    isPrivateRoute: true,
    hasBadge: false,
    icon: ProfileIcon,
  },
];
