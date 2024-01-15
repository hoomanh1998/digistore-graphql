import {
  BellIcon,
  CubeIcon,
  HeartIcon,
  LocationIcon,
  ProfileIcon,
} from "../../../assets/svgs";

export const profileNavigationItems = [
  { title: "Orders", path: "/home/profile/orders", icon: CubeIcon },
  {
    title: "Notifications",
    path: "/home/profile/notifications",
    icon: BellIcon,
  },
  { title: "Wish List", path: "/home/profile/wishlist", icon: HeartIcon },
  {
    title: "Locations",
    path: "/home/profile/locations",
    icon: LocationIcon,
  },
  {
    title: "Profile Info",
    path: "/home/profile/info",
    icon: ProfileIcon,
  },
];
