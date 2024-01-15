const { Product, Brand, Category } = require("../../models");
const db = require("../../models");
const {
  checkUserToken,
  convertToLimitAndOffset,
  getPaginationData,
  mergeAndremoveDuplicateItemsOfArrays,
} = require("../../util");

module.exports = {
  Query: {
    product: async (_, { product_id }) => {
      const product = await Product.findByPk(product_id);
      if (product) return product;
      else {
        throw new Error("Product Not Found!");
      }
    },

    products: async () => {
      const products = await Product.findAll({ raw: true });
      return products;
    },

    paginatedProducts: async (_, { page, size }) => {
      try {
        const { limit, offset } = convertToLimitAndOffset(page, size);

        const products = await Product.findAndCountAll({
          raw: true,
          limit,
          offset,
        });

        return getPaginationData(products, page, limit);
      } catch (error) {
        throw new Error(error.message);
      }
    },

    searchProducts: async (_, { searchQuery }) => {
      const searchResults = await db.sequelize.query(
        `SELECT *
        FROM "${Product.tableName}"
        WHERE _search @@ plainto_tsquery('english', :query);`,
        {
          model: Product,
          replacements: { query: searchQuery },
        }
      );
      if (searchQuery && searchResults.length > 0) {
        return searchResults;
      } else {
        throw new Error("No product found!");
      }
    },

    filterProducts: async (_, { category_id }) => {
      try {
        const filteredProducts = await Product.findAll({
          where: { CategoryId: category_id },
        });
        const category = await Category.findOne({
          where: { id: category_id },
        });
        const categoryName = category.name;
        return { categoryName, products: filteredProducts };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    relatedProducts: async (_, { product_id }) => {
      try {
        const product = await Product.findOne({
          where: { id: product_id },
        });
        const relatedBrandAndCategoryProducts = await Product.findAll({
          where: { BrandId: product.BrandId, CategoryId: product.CategoryId },
        });
        const relatedCategoryProducts = await Product.findAll({
          where: { CategoryId: product.CategoryId },
        });
        const relatedProducts = mergeAndremoveDuplicateItemsOfArrays(
          relatedBrandAndCategoryProducts,
          relatedCategoryProducts
        );
        return relatedProducts.filter(
          (product) => product.id.toString() !== product_id
        );
      } catch (error) {
        throw new Error(error.message);
      }
    },

    latestProducts: async () => {
      const products = await Product.findAll({
        raw: true,
        attributes: ["id", "title", "price"],
        limit: 12,
        order: [["id", "DESC"]],
      });
      return products;
    },
  },

  Product: {
    brand: async ({ BrandId }) => {
      const brand = await Brand.findOne({ where: { id: BrandId } });
      return brand;
    },

    category: async ({ CategoryId }) => {
      const category = await Category.findOne({ where: { id: CategoryId } });
      return category;
    },
  },

  Mutation: {
    addProduct: async (_, { title, categoryId }, { user }) => {
      try {
        checkUserToken(user);
        let author = await Author.findOne({ where: { UserId: user.id } });
        if (author) {
          let book = await Book.create({
            title,
            CategoryId: categoryId,
            AuthorId: author.id,
          });
          return book;
        } else {
          throw new Error("Can not add new book.");
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },

    updateProduct: async (_, { id, title, categoryId }, { user }) => {
      try {
        checkUserToken(user);
        let book = await Book.findOne({ where: { id } });
        let author = await Author.findOne({ where: { UserId: user.id } });
        if (book && author && book.AuthorId === author.id) {
          book.update({ title, CategoryId: categoryId }, { where: { id } });
          return true;
        } else {
          return false;
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },

    deleteProduct: async (_, { id }, { user }) => {
      try {
        checkUserToken(user);
        let book = await Book.findOne({ where: { id } });
        let author = await Author.findOne({ where: { UserId: user.id } });
        if (book && author && book.AuthorId === author.id) {
          await book.destroy();
          return true;
        } else {
          return false;
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
