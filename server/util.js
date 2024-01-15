const { User } = require("./models");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, token) => {
  // let testAccount = await nodemailer.createTestAccount();
  // let transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   secure: false,
  //   auth: {
  //     user: testAccount.user,
  //     pass: testAccount.pass,
  //   },
  // });

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "Gmail",
    port: 465,
    secure: true,
    auth: {
      user: "reactapp7798@gmail.com",
      pass: "H00m@nh19984311219377",
    },
  });

  let info = await transporter.sendMail({
    from: '"DigiStore App" <digiStore@gmail.com>',
    to: email,
    subject: "Account Verification",
    html: `<h4>Please click the link to verify your account:</h4>
    <a href="http://localhost:3000/verify/${token}">Verify</a>`,
  });

  console.log(info);

  return nodemailer.getTestMessageUrl(info);
};

const sendResetPasswordEmail = async (email, token) => {
  // let testAccount = await nodemailer.createTestAccount();
  // let transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   secure: false,
  //   auth: {
  //     user: testAccount.user,
  //     pass: testAccount.pass,
  //   },
  // });

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "Gmail",
    auth: {
      user: "reactapp7798@gmail.com",
      pass: "Homi4311219377",
    },
  });

  let info = await transporter.sendMail({
    from: '"Secret App" <secret_app@test.com>',
    to: email,
    subject: "Reset Password",
    html: `<h4>Please click the link to reset your password:</h4>
    <a href="http://localhost:3000/reset-password/?token=${token}">Reset Password</a>`,
  });
  return nodemailer.getTestMessageUrl(info);
};

const checkUserVerification = async (id) => {
  let user = await User.findOne({ where: { id } });
  return user.isVerified ? true : false;
};

const checkTokenExpiration = (token) => {
  let { exp } = jwt.decode(token);
  if (Date.now() >= exp * 1000) {
    throw new Error("Token is expired!");
  }
};

const checkUserToken = (token) => {
  if (token) {
    return true;
  } else {
    throw new Error("Not Authenticated");
  }
};

const tokenValidation = (token) => {
  if (token) {
    try {
      return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      return null;
    }
  }
  return null;
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
};

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
};

const convertTimestampToDate = (time) => {
  return new Date(time).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const convertToLimitAndOffset = (page, size) => {
  const limit = size ? parseInt(size) : 8;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getPaginationData = (data, page, size) => {
  const { count: totalItems, rows: products } = data;
  const currentPage = page ? parseInt(page) : 0;
  const totalPages = Math.ceil(totalItems / size);
  return { totalItems, products, totalPages, currentPage };
};

const mergeAndremoveDuplicateItemsOfArrays = (arrayA, arrayB) => {
  let isExist = false;
  let mergedArray = [...arrayA];
  for (let i = 0; i < arrayB.length; i++) {
    for (let j = 0; j < mergedArray.length; j++) {
      if (mergedArray[j].id !== arrayB[i].id && !isExist) {
        if (j >= mergedArray.length - 1) {
          mergedArray.push(arrayB[i]);
        } else {
          continue;
        }
      }
      if (mergedArray[j].id === arrayB[i].id) {
        isExist = true;
        break;
      }
    }
    isExist = false;
  }
  return mergedArray;
};

const normalizeString = (str) => {
  const lowerCaseString = str.toLowerCase();
  return lowerCaseString.charAt(0).toUpperCase() + lowerCaseString.slice(1);
};

module.exports = {
  checkUserVerification,
  checkTokenExpiration,
  checkUserToken,
  tokenValidation,
  convertTimestampToDate,
  convertToLimitAndOffset,
  getPaginationData,
  generateAccessToken,
  sendVerificationEmail,
  sendResetPasswordEmail,
  mergeAndremoveDuplicateItemsOfArrays,
  normalizeString,
};
