import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
      expiresAt
      verificationURL
      user {
        id
        firstName
        lastName
        email
        isVerified
        isAdmin
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    registerUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      accessToken
      expiresAt
      verificationURL
      user {
        id
        firstName
        lastName
        email
        isVerified
        isAdmin
      }
    }
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($token: String!) {
    verifyUser(token: $token)
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      resetPasswordURL
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword(
    $password: String!
    $confirmPassword: String!
    $token: String!
  ) {
    resetPassword(
      password: $password
      confirmPassword: $confirmPassword
      token: $token
    )
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile(
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    updateUserProfile(
      firstName: $firstName
      lastName: $lastName
      email: $email
    ) {
      firstName
      lastName
      email
    }
  }
`;

export const ADD_LOCATION = gql`
  mutation AddLocation($city: String!, $address: String!) {
    addLocation(city: $city, address: $address) {
      id
      city
      address
    }
  }
`;

export const REMOVE_LOCATION = gql`
  mutation RemoveLocation($location_id: String!) {
    removeLocation(location_id: $location_id) {
      id
    }
  }
`;

export const UPDTAE_LOCATION = gql`
  mutation UpdateLocation($locations: [LocationInput]) {
    updateLocation(locations: $locations)
  }
`;

export const ADD_TO_WISH_LIST = gql`
  mutation AddToWishList($product_id: String!) {
    addToWishList(product_id: $product_id)
  }
`;

export const REMOVE_FROM_WISH_LIST = gql`
  mutation RemoveFromWishList($product_id: String!) {
    removeFromWishList(product_id: $product_id) {
      id
    }
  }
`;

export const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($product_id: String!) {
    addItemToCart(product_id: $product_id) {
      id
      product {
        id
      }
      quantity
    }
  }
`;

export const ADD_ITEMS_FROM_CLIENT = gql`
  mutation AddItemsFromClient($cartItems: [CartItemsInput]) {
    addItemsFromClient(cartItems: $cartItems)
  }
`;

export const REMOVE_ITEM_FROM_CART = gql`
  mutation RemoveItemFromCart($product_id: String!) {
    removeItemFromCart(product_id: $product_id) {
      id
    }
  }
`;

export const INCREASE_CART_ITEM_QUANTITY = gql`
  mutation IncreaseCartItemQuantity($product_id: String!) {
    increaseCartItemQuantity(product_id: $product_id) {
      id
    }
  }
`;

export const DECREASE_CART_ITEM_QUANTITY = gql`
  mutation DecreaseCartItemQuantity($product_id: String!) {
    decreaseCartItemQuantity(product_id: $product_id) {
      id
    }
  }
`;

export const REGISTER_ORDER = gql`
  mutation RegisterOrder($selectedLocationId: String!) {
    registerOrder(selectedLocationId: $selectedLocationId) {
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
