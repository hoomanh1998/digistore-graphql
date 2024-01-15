import { gql } from "@apollo/client";
import { PRODUCT_FIELDS, PRODUCTS_FIELDS } from "./fragments";

export const GET_PRODUCT = gql`
  ${PRODUCT_FIELDS}
  query GetProduct($product_id: String!) {
    product(product_id: $product_id) {
      ...ProductFields
    }
  }
`;

export const GET_PRODUCTS = gql`
  ${PRODUCTS_FIELDS}
  query GetProducts {
    products {
      ...ProductsFields
    }
  }
`;

export const GET_PAGINATED_PRODUCTS = gql`
  ${PRODUCTS_FIELDS}
  query GetPaginatedProducts($page: Int, $size: Int) {
    paginatedProducts(page: $page, size: $size) {
      totalItems
      products {
        ...ProductsFields
      }
      totalPages
      currentPage
    }
  }
`;

export const GET_SEARCH_PRODUCTS = gql`
  ${PRODUCTS_FIELDS}
  query SearchProducts($searchQuery: String) {
    searchProducts(searchQuery: $searchQuery) {
      ...ProductsFields
    }
  }
`;

export const GET_FILTER_PRODUCTS = gql`
  ${PRODUCTS_FIELDS}
  query FilterProducts($category_id: String) {
    filterProducts(category_id: $category_id) {
      categoryName
      products {
        ...ProductsFields
      }
    }
  }
`;

export const GET_RELATED_PRODUCTS = gql`
  ${PRODUCTS_FIELDS}
  query RelatedProducts($product_id: String) {
    relatedProducts(product_id: $product_id) {
      ...ProductsFields
    }
  }
`;

export const GET_LATEST_PRODUCTS = gql`
  query LatestProducts {
    latestProducts {
      id
      title
      price
    }
  }
`;

export const GET_CATEGORY = gql`
  query GetCategory($category_id: Int!) {
    category(category_id: $category_id) {
      id
      name
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

export const GET_USER_INFO = gql`
  query GetUserInfo($user_id: Int!) {
    user(user_id: $user_id) {
      id
      firstName
      lastName
      email
      isAdmin
    }
  }
`;

export const GET_CURRENT_USER_DETAILS = gql`
  query GetCurrentUserDetails {
    currentUser {
      id
      firstName
      lastName
      email
      isAdmin
    }
  }
`;

export const GET_CURRENT_USER_LOCATIONS = gql`
  query GetCurrentUserLocations {
    currentUser {
      id
      locations {
        id
        city
        address
      }
    }
  }
`;

export const GET_CURRENT_USER_WISH_LIST = gql`
  query GetCurrentUserWishList {
    currentUser {
      id
      wishList {
        id
        items {
          id
          title
          price
          category {
            name
          }
        }
      }
    }
  }
`;

export const GET_CURRENT_USER_WISH_LIST_IDS = gql`
  query GetCurrentUserWishListIDs {
    currentUser {
      id
      wishList {
        id
        items {
          id
        }
      }
    }
  }
`;

export const GET_CURRENT_USER_CART = gql`
  query GetCurrentUserCart {
    currentUser {
      id
      cart {
        id
        items {
          id
          product {
            id
            title
            price
            category {
              name
            }
          }
          quantity
        }
        totalItems
        totalPrice
      }
    }
  }
`;

export const GET_CURRENT_USER_ORDERS = gql`
  query GetCurrentUserOrders {
    currentUser {
      id
      orders {
        id
        orderItems {
          product {
            title
            price
          }
        }
      }
    }
  }
`;

export const GET_ORDER = gql`
  query GetOrder($orderId: Int!) {
    order(orderId: $orderId) {
      id
      orderItems {
        product {
          id
          title
          price
          category {
            name
          }
        }
        quantity
      }
      orderDate
      deliveryLocation {
        city
        address
      }
      totalItems
      totalPrice
    }
  }
`;
