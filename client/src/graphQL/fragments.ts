import { gql } from "@apollo/client";

export const PRODUCT_FIELDS = gql`
  fragment ProductFields on Product {
    id
    title
    description
    price
    image
    category {
      id
      name
    }
    brand {
      id
      name
    }
  }
`;

export const PRODUCTS_FIELDS = gql`
  fragment ProductsFields on Product {
    id
    title
    price
    category {
      id
      name
    }
    image
  }
`;

export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    firstName
    lastName
    email
  }
`;
