const types = `
  scalar Date
  
  type Order {
    id: ID!
    orderItems: [OrderItem]
    orderDate: Date
    deliveryLocation: DeliveryLocation
    totalItems: Int
    totalPrice: Int
  }

  type OrderItem {
    id: ID!
    product: Product
    quantity: Int
  }

  type DeliveryLocation {
    city: String!
    address: String!
  }
`;

const inputs = `
  input OrderItemsInput {
    ProductId: String
    quantity: Int
  }

  input DeliveryLocationInput {
    city: String!
    address: String!
  }
`;

const querise = `
  order(orderId: Int!): Order
`;

const mutations = `
  registerOrder(
    selectedLocationId: String
  ): Order
  removeOrder(order_id: String!): Boolean
`;

module.exports = { types, inputs, querise, mutations };
