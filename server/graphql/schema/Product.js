const types = `
  type Product {
    id: ID!
    title: String!
    description: String!
    price: Int!
    image: String!
    brand: Brand!
    category: Category!
  }
  type ProductConnection {
    totalItems: Int!
    products: [Product]!
    totalPages: Int
    currentPage: Int
  }
  type FilterProducts {
    categoryName: String
    products: [Product]
  }
`;

const inputs = null;

const querise = `
  product(product_id: String!): Product
  products: [Product]!
  paginatedProducts(page: Int, size: Int): ProductConnection
  searchProducts(searchQuery: String): [Product]
  filterProducts(category_id: String): FilterProducts
  relatedProducts(product_id: String): [Product]
  latestProducts: [Product]
`;

const mutations = `
  addProduct(title: String!, description: String!): Product!
  updateProduct(id: ID!, title: String!, categoryId: String!): Boolean!
  deleteProduct(id: ID!): Boolean!
`;

module.exports = { types, inputs, querise, mutations };
