import {
  ApolloError,
  LazyQueryResult,
  OperationVariables,
  QueryLazyOptions,
} from "@apollo/client";
import { FieldInputProps } from "formik";
import { Location as LocationType } from "history";

export enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

export enum Size {
  Medium = "medium",
  Wide = "wide",
}

export enum View {
  List = "list",
  Grid = "grid",
}

export enum Themes {
  Light = "light",
  Dark = "dark",
}

export enum ButtonTypes {
  Button = "button",
  Submit = "submit",
  Reset = "reset",
}

export interface LoginResult {
  loginUser: {
    accessToken: string;
    expiresAt: number;
    user: User;
    verificationURL: string;
  };
}

export interface RegisterResult {
  registerUser: {
    accessToken: string;
    expiresAt: number;
    user: User;
    verificationURL: string;
  };
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface ForgotPasswordResult {
  forgotPassword: {
    resetPasswordURL: string;
  };
}

export interface ForgotPasswordValues {
  email: string;
}

export interface RegisterValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

export interface SelectItem {
  id: number;
  value: string;
  label: string;
  selected: boolean;
}

export interface SelectControl {
  items: SelectItem[];
  inputValue: string;
  isListOpen: boolean;
  itemSelected: boolean;
  dropDownError: boolean;
  headerTitle: string;
  defaultValue: string | undefined;
}

export interface ImageSlide {
  image: string;
}

export interface Location {
  id: number;
  city: string;
  address: string;
  checked?: boolean;
}

export interface LocationValues {
  city: string;
  address: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isVerified?: boolean;
  isAdmin?: boolean;
}

export interface CurrentUserDetails {
  currentUser: User;
}

export interface CurrentUserLocation {
  currentUser: {
    id: string;
    locations: Location[];
  };
}

export interface CurrentUserCart {
  currentUser: {
    id: string;
    cart: {
      id: string;
      items: CartItem[];
      totalItems: number;
      totalPrice: number;
    };
  };
}

export interface Order {
  id: string;
  orderItems: {
    product: Product;
    quantity: number;
  }[];
  deliveryLocation: LocationValues;
  orderDate: string;
  totalItems: number;
  totalPrice: number;
}

export interface OrderData {
  order: Order;
}

export interface RegisterOrderData {
  registerOrder: OrderData;
}

export interface OrdersListPropTypes {
  orders: Order[] | undefined;
}

export interface CurrentUserOrders {
  currentUser: {
    id: string;
    orders: Order[];
  };
}

export interface CurrentUserWishList {
  currentUser: {
    id: string;
    wishList: {
      id: string;
      items: Product[];
    };
  };
}

export interface Category {
  id: string;
  name: string;
}

export interface CategoriesData {
  categories: Category[];
}

export interface Brand {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  brand: Brand;
}

export interface Products {
  products: {
    products: Product[];
    hasMoreProducts: boolean;
    pageNumber: number;
    currentPageNumber: number;
  };
}

export interface PaginatedProductsData {
  paginatedProducts: {
    totalItems: number;
    products: Product[];
    totalPages: number;
    currentPage: number;
  };
}

export interface LatestProductsData {
  latestProducts: Product[];
}

export interface ProductData {
  product: Product;
}

export interface ProductsData {
  products: Product[];
}

export interface RelatedProductsData {
  relatedProducts: Product[];
}

export interface FilteredProductsData {
  filterProducts: {
    categoryName: string;
    products: Product[];
  };
}

export interface SearchProductsData {
  searchProducts: Product[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface LocalCart {
  cart: LocalCartItem[];
}

export interface LocalCartItem {
  productId: string;
  quantity: number;
}

export interface OrderItem {
  title: string;
  price: number;
}

export interface Theme {
  type: string;
  enabled: boolean;
}

export interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

export interface ActiveFilter {
  id: string;
  name: string;
  active: boolean;
}

export interface Filter {
  filter: ActiveFilter;
}

export interface ProductsListPropTypes {
  location: LocationType<ActiveFilter | string>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface FiltersPropTypes {
  activeFilter: ActiveFilter;
}

export interface FiltersButtonPropTypes {
  activeFilter: ActiveFilter;
  showFiltersPanel: boolean;
  onShowFiltersPanel: () => void;
}

export interface FiltersPanelPropTypes {
  filters: Category[] | undefined;
  activeFilter: ActiveFilter;
  showFiltersPanel?: boolean;
  onActiveFilter: (id: string) => void;
  onHideFiltersPanel?: () => void;
}

export interface FilterItemPropTypes {
  id: string;
  name: string;
  active: boolean;
  setActive: (id: string) => void;
}

export interface FilterBadgePropTypes {
  name: string;
  onHideFiltersPanel?: () => void;
}

export interface SearchPropTypes {
  getSearchProducts: (
    options?: QueryLazyOptions<OperationVariables> | undefined
  ) => void;
  searchTabClicked?: boolean;
  sidebarSearchBar?: boolean;
  fetchedQueryData?: LazyQueryResult<any, OperationVariables>;
}

export interface SearchInputPropTypes {
  inputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  value: string;
  isFocused: boolean;
  sidebarOpen?: boolean;
  sidebarHandler?: () => void;
  searchTabClicked?: boolean;
  isSearching?: boolean;
  setIsSearching?: React.Dispatch<React.SetStateAction<boolean>>;
  onClearInput?: () => void;
  fetchedQueryData?: LazyQueryResult<any, OperationVariables>;
}

export interface ButtonPropTypes {
  onClick?: () => void;
  children: React.ReactNode | string;
  type?: ButtonTypes;
  color?: string;
  disabled?: boolean;
  narrow?: boolean;
  positionFixed?: boolean;
  hasBorder?: boolean;
  extraClasses?: string;
}

export interface CheckBoxPropTypes {
  id: number;
  label?: string;
  checked: boolean | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TooltipPropTypes {
  title: string;
  match?: any;
}

export interface Badge {
  show: boolean;
  number: number | undefined;
}

export interface BadgePropTypes {
  badgeNumber?: number;
  sidebarOpen?: boolean;
}

export interface IconPropTypes {
  strokeColor?: string;
  fillColor?: string;
  isMatch?: boolean;
}

export interface NavigationItemPropTypes {
  title: string;
  path: string;
  icon: ({ strokeColor, isMatch }: IconPropTypes) => JSX.Element;
  isPrivateRoue: boolean;
  isExactPath?: boolean;
  hasBadge?: boolean;
  badge?: Badge;
  showSidebar?: boolean;
  onCloseSidebar?: () => void;
}

export interface ProfileCardParentPropTypes {
  showProfileCard?: boolean;
  closeProfileCard?: () => void;
}

export interface ProfileCardPropTypes {
  isAuthenticated: () => boolean;
  data: CurrentUserDetails | undefined;
  loading: boolean;
  openLogoutModal: () => void;
  closeProfileCard?: () => void;
  showProfileCard?: boolean;
  renderOnfirstMount?: boolean;
  sidebarOpen?: boolean;
  closeSidebar?: () => void;
}

export interface ProfileNavigationListPropTypes {
  openLogoutModal: () => void;
}

export interface GoBackNavbarPropTypes {
  children: React.ReactNode;
  backgroundColor?: string;
  pathname?: string;
  fixed?: boolean;
}

export interface ShowAlertPropTypes {
  showTime?: number;
  permanent?: boolean;
}

export interface ErrorAlertPropTypes {
  error: ApolloError | undefined;
  showAlert: boolean;
}

export interface SuccessAlertPropTypes {
  alertMessage: string;
  showAlert: boolean;
  btnMessage?: string;
  btnLink?: string;
  webPageLink?: string;
  onCloseAlert?: () => void;
}

export interface ShowPasswordPropTypes {
  isEnabled: boolean;
  onClick: () => void;
}

export interface LocationInputFieldPropTypes {
  id: number;
  name: string;
  type: string;
  label: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChangeInputValue?: ({
    locationId,
    value,
    inputEvent,
    selectEvent,
  }: EditLocationsParams) => void;
}

export interface InputFieldPropTypes {
  name: string;
  type: string;
  value?: string;
  label?: string;
  placeholder?: string;
  icon?: JSX.Element;
  disabled?: boolean;
}

export interface SelectFieldPropTypes {
  id?: number;
  name: string | undefined;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  list: SelectItem[];
  defaultValue?: string;
  children?: React.ReactNode[];
  dropDownListPosition: Direction;
  editDataHandler?: ({
    locationId,
    value,
    inputEvent,
    selectEvent,
  }: EditLocationsParams) => void;
}

export interface SelectPropTypes {
  id?: number;
  title: string;
  items: SelectItem[];
  field: FieldInputProps<any>;
  disabled?: boolean;
  defaultValue?: string;
  selectController: SelectControl;
  setSelectController: React.Dispatch<React.SetStateAction<SelectControl>>;
  setValue: (value: any, shouldValidate?: boolean | undefined) => void;
  editDataHandler?: ({
    locationId,
    value,
    inputEvent,
    selectEvent,
  }: EditLocationsParams) => void;
}

export interface DropDownMenuPropTypes {
  id?: number;
  items: SelectItem[];
  disabled?: boolean;
  defaultValue?: string;
  listPosition?: Direction;
  selectController: SelectControl;
  setSelectController: React.Dispatch<React.SetStateAction<SelectControl>>;
  setValue: (value: any, shouldValidate?: boolean | undefined) => void;
  setTouched: (value: boolean, shouldValidate?: boolean | undefined) => void;
  updateItems: (id: number, key: string) => void;
  inputChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  editDataHandler?: ({
    locationId,
    value,
    inputEvent,
    selectEvent,
  }: EditLocationsParams) => void;
}

export interface CartItemPropTypes {
  id: string;
  title: string;
  price: number;
  category: string;
  quantity: number;
  onRemove: () => void;
  routeState?:
    | string
    | {
        pathname: string;
        state: string | null;
      };
}

export interface CartItemsPropTypes {
  cart: CartItem[] | undefined;
  loading: boolean;
}

export interface CartItemsListPropTypes {
  cartItems: CartItem[] | undefined;
  onRemove: () => void;
}

export interface CartPropTypes {
  cart:
    | {
        id: string;
        items: CartItem[];
        totalItems: number;
        totalPrice: number;
      }
    | undefined;
  cartItemsLoading: boolean;
  onSetOrderRegistered: () => void;
}

export interface CheckoutPropTypes {
  // orderId: string;
  showCheckout: boolean;
  onHideCheckout: () => void;
}

export interface DeliveryLocationsPropTypes {
  onSetOrderLocation: (location: string) => void;
  onSetDisableButton: (locationNotEmpty: any) => void;
  openLocationModal: () => void;
}

export interface DeliveryLocationsListPropTypes {
  locations: Location[] | undefined;
  onCheckedList: (event: React.ChangeEvent<HTMLInputElement>) => void;
  openLocationModal: () => void;
}

export interface ProductCardPropTypes {
  id?: string;
  title: string;
  price: number;
  category?: string;
  size?: Size;
  image?: string;
  quantity?: number;
  fixedWidth?: boolean;
  reference?: React.RefObject<HTMLAnchorElement> | ((node: any) => void);
  routeState?: string;
  path?:
    | string
    | {
        pathname: string;
        state: string | null;
      };
  addToCart?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  addToCartLoading?: boolean;
  actionHandler?: () => void;
}

export interface LocationCardPropTypes {
  id: number;
  city: string;
  address: string;
  checked: boolean | undefined;
  onCheckedList: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface LocationsFormPropTypes {
  userLocations: CurrentUserLocation | undefined;
  onShowModal: () => void;
}

export interface LocationItemPropTypes {
  id: number;
  index: number;
  userId: string | undefined;
  locationsLength: number | undefined;
  onDelete: () => void;
  city: string;
  disabled: boolean;
}

export interface OrderInfoPropTypes {
  totalPrice: number | undefined;
  totalItems: number | undefined;
}

export interface PaginationPropTypes {
  totalCount: number | undefined;
  pageNumber: number | undefined;
  paginationHandler: React.Dispatch<React.SetStateAction<number>>;
  parentWidth?: number;
}

export interface PaginationButtonPropTypes {
  disabled: boolean;
  direction: string;
  pageNumberHandler: () => void;
}

export interface CarouselSliderItem {
  id: string;
  name: string;
  image: string;
}

export interface CarouselSliderPropTypes {
  slides: CarouselSliderItem[];
}

export interface CarouselSliderButtonPropTypes {
  reference: React.MutableRefObject<null>;
  direction: string;
}

export interface SliderPropTypes {
  title: string | undefined;
  items: Product[] | undefined;
  routeState?: string;
}

export interface SliderItemPropTypes {
  id: string;
  title: string;
  price: number;
  image: string;
  reference: React.RefObject<HTMLAnchorElement>;
  routeState: string | undefined;
}

export interface SliderItemsListPropTypes {
  items: Product[] | undefined;
  sliderRef: React.RefObject<HTMLDivElement>;
  routeState: string | undefined;
}

export interface SliderButtonPropTypes
  extends React.HTMLAttributes<HTMLButtonElement> {
  direction: string;
}

export interface ImageSliderPropTypes {
  slides: ImageSlide[];
}

export interface ImageSliderButtonPropTypes {
  direction: string;
  showArrows: boolean;
  sliderHandler: () => void;
}

export interface ImageSliderDotPropTypes {
  active: boolean;
}

export interface ImageSliderDotsPropTypes {
  currentSlide: number;
  slides: ImageSlide[];
}

export interface ToggleButtonPropTypes {
  onToggleButton: () => void;
}

export interface BackDropPropTypes {
  showModal: boolean;
}

export interface DrawerPropTypes {
  children: React.ReactNode;
  showDrawer: boolean;
  backdropClickHandler: () => void;
}

export interface ModalPropTypes {
  children: React.ReactNode;
  showModal?: boolean;
}

export interface FCModalPropTypes {
  showModal: boolean;
  onClose: () => void;
  onAdd: () => void;
}

export interface LogoutModalPropTypes {
  showLogoutModal: boolean;
  onCloseLogoutModal: () => void;
  onLogout: () => void;
}

export interface ProductDetailsPropTypes {
  userId: string | undefined;
  product: Product | undefined;
  images: {
    image: string;
  }[];
  isAddedToWishList: boolean;
  addItemToCartAlert: boolean;
  showAddToCartAlertHandler: () => void;
  wishListHandler: () => void;
  isAuthenticated: () => boolean;
}

export interface ProfilePropTypes {
  userData: User;
}

export interface OrderItemPropTypes {
  title: string;
  price: number;
}

export interface PrivateRoutePropTypes {
  path: string;
  exact?: boolean;
  component: React.FunctionComponent;
}

export interface AuthenticatoinData {
  accessToken: string;
  expiresAt: number;
  userInfo: User;
}

export interface AuthContextPropTypes {
  authState: AuthenticatoinData;
  setAuthState: (authInfo: AuthenticatoinData) => void;
  isAuthenticated: () => boolean;
  isAdmin_: () => boolean;
  onLogout: () => void;
  showLogoutAlert: boolean;
}

export interface UI {
  ui: {
    showSidebar: boolean;
    isSearching: boolean;
    productsListView: View;
  };
}

export interface Path {
  path: {
    login: {
      prevPath: string;
      nextPath?: string;
    };
    product: {
      prevPath: string;
    };
    order: {
      id: 0;
      number: number;
      position: number;
    };
  };
}

export interface ReactRouterLocation {
  pathname: string;
}

export interface PrevOrderPath {
  orderId: string | undefined;
  orderNum: number;
  orderPos: number | undefined;
}

export type ReactRouterParam = {
  id: string;
  token?: string;
};

export interface AbbreviationOfNameParams {
  firstName: string;
  lastName: string;
}

//remove this interface
export interface EditLocationsParams {
  locationId: number;
  value?: string;
  inputEvent?: React.ChangeEvent<HTMLInputElement>;
  selectEvent?: React.ChangeEvent<HTMLSelectElement>;
}
