const { User, WishList, Cart } = require("../../models");
const bcrypt = require("bcryptjs");
const jwtDecode = require("jwt-decode");
const {
  generateAccessToken,
  tokenValidation,
  checkTokenExpiration,
  sendResetPasswordEmail,
} = require("../../util");

module.exports = {
  Mutation: {
    registerUser: async (_, { firstName, lastName, email, password }) => {
      const users = await User.findAll();

      /*Limit Registeration for a few users(Just for now).*/
      if (users.length > 0) {
        throw new Error("Registeration Process Has Limited!");
      }

      try {
        const isUserExist = await User.findOne({
          where: { email: email.toLowerCase() },
        });

        if (isUserExist) throw new Error("User Already Registered");

        const user = await User.create({
          firstName,
          lastName,
          email,
          password,
          isVerified: true, //(Just for now)
        });

        if (user) {
          await WishList.create({ UserId: user.id });

          await Cart.create({ UserId: user.id });

          const accessToken = generateAccessToken({
            id: user.id,
            email: user.email,
          });

          const decodedToken = jwtDecode(accessToken);

          const expiresAt = decodedToken.exp;

          //   let verificationURL = "";
          //   await sendVerificationEmail(user.email, accessToken).then(
          //     (url) => (verificationURL = url)
          //   );

          // client.SET(user.id, accessToken, "EX", 60 * 60, (err, _) => {
          //   if (err) {
          //     throw new Error(err.messgae);
          //   }
          // });

          return {
            accessToken,
            expiresAt,
            user,
          };
        } else {
          throw new Error("There was a problem for creating an account");
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },

    loginUser: async (_, { email, password }) => {
      try {
        const user = await User.findOne({
          where: { email: email.toLowerCase() },
        });

        if (!user) {
          throw new Error("Email or password is incorrect.");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (isValidPassword) {
          const accessToken = generateAccessToken({
            id: user.id,
            email: user.email,
          });

          const decodedToken = jwtDecode(accessToken);

          const expiresAt = decodedToken.exp;

          //implement the verification process later.
          //   if (!user.isVerified) {
          //     let verificationURL = "";

          //     verificationURL = await sendVerificationEmail(
          //       user.email,
          //       accessToken
          //     );

          //     client.SET(user.id, accessToken, "EX", 60 * 60, (err, _) => {
          //       if (err) {
          //         throw new Error(err.messgae);
          //       }
          //     });

          //     return {
          //       accessToken,
          //       verificationURL,
          //       isVerified: false,
          //     };
          //   }

          return {
            accessToken,
            expiresAt,
            user,
          };
        } else {
          throw new Error("Email or password is incorrect.");
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },

    verifyUser: async (_, { token }) => {
      try {
        checkTokenExpiration(token);

        let verifyToken = await tokenValidation(token);

        // client.GET(verifyToken.id, (err, reply) => {
        //   if (err) {
        //     throw new Error(err.messgae);
        //   }
        //   const user = User.findOne({
        //     where: { email: verifyToken.email },
        //   });
        //   if (user && token === reply) {
        //     User.update(
        //       { isVerified: true },
        //       { where: { id: verifyToken.id } }
        //     );
        //     return true;
        //   } else {
        //     return false;
        //   }
        // });
      } catch (error) {
        throw new Error(error.message);
      }
    },

    forgotPassword: async (_, { email }) => {
      try {
        const user = await User.findOne({
          where: { email: email.toLowerCase() },
        });

        if (user) {
          const accessToken = generateAccessToken({
            id: user.id,
            email: user.email,
          });

          let resetPasswordURL = "";
          await sendResetPasswordEmail(email, accessToken).then(
            (url) => (resetPasswordURL = url)
          );

          // client.SET(user.id, accessToken, "EX", 60 * 60, (err, _) => {
          //   if (err) {
          //     throw new Error(err.messgae);
          //   }
          // });

          return { resetPasswordURL };
        } else {
          throw new Error("Email address not found");
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },

    resetPassword: async (_, { password, confirmPassword, token }) => {
      try {
        if (password !== confirmPassword)
          throw new Error("Passwords must match!");

        checkTokenExpiration(token);

        let verifyToken = tokenValidation(token);

        // client.GET(verifyToken.id, async (err, reply) => {
        //   if (err) {
        //     throw new Error(err.messgae);
        //   }
        //   if (token === reply) {
        //     await User.update(
        //       { password: await bcrypt.hash(password, 10) },
        //       { where: { id: verifyToken.id } }
        //     );
        //     return true;
        //   } else {
        //     return false;
        //   }
        // });
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
