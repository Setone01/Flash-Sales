import dotenv from "dotenv";

dotenv.config();

const variables = {
  app: {
    port: Number(process.env.PORT),
    DB_url: process.env.DATABASE_CONNECTION,
  },

  AUTH: {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
  },
};
export default variables;
