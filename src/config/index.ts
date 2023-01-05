import dotenv from "dotenv";
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();



export default {
  port: process.env.PORT,
  mongoDb: {
    mongoPass: process.env.MONGO_PASS,
    mongoUser: process.env.MONGO_USER,
    mongoPath: process.env.MONGO_PATH,
  },
  urls:{
    client_dev: process.env.CLIENT_URL_DEV,
    client_prod: process.env.CLIENT_URL_PROD,
    server: process.env.SERVER_URL
  },
  jwt:{
    accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
    accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  }
};
