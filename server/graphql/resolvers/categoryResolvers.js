const { Category } = require("../../models");
const db = require("../../models");

module.exports = {
  Query: {
    category: async (_, { category_id }) => {
      try {
        const category = await Category.findOne({ where: { id: category_id } });
        return category;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    categories: async () => {
      try {
        const categories = await Category.findAll({ raw: true });
        return categories;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
    // addCategory: async (_, { name }, { user }) => {
    //   try {
    //     checkUserToken(user);
    //     let author = await Author.findOne({ where: { UserId: user.id } });
    //     if (author) {
    //       let book = await Book.create({
    //         title,
    //         CategoryId: categoryId,
    //         AuthorId: author.id,
    //       });
    //       return book;
    //     } else {
    //       throw new Error("Can not add new book.");
    //     }
    //   } catch (error) {
    //     throw new Error(error.message);
    //   }
    // },
    // updateProduct: async (_, { id, title, categoryId }, { user }) => {
    //   try {
    //     checkUserToken(user);
    //     let book = await Book.findOne({ where: { id } });
    //     let author = await Author.findOne({ where: { UserId: user.id } });
    //     if (book && author && book.AuthorId === author.id) {
    //       book.update({ title, CategoryId: categoryId }, { where: { id } });
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   } catch (error) {
    //     throw new Error(error.message);
    //   }
    // },
    // deleteProduct: async (_, { id }, { user }) => {
    //   try {
    //     checkUserToken(user);
    //     let book = await Book.findOne({ where: { id } });
    //     let author = await Author.findOne({ where: { UserId: user.id } });
    //     if (book && author && book.AuthorId === author.id) {
    //       await book.destroy();
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   } catch (error) {
    //     throw new Error(error.message);
    //   }
    // },
  },
};
