import dotenv from "dotenv";
import path from "path";
import Config from "./types/index";
import Jwt from "jsonwebtoken";

const enviroment: string = path.resolve(
  __dirname,
  (("../../.env." + process.env.NODE_ENV) as string) + ".local"
);

dotenv.config({
  path: enviroment,
});

const configDefault: Config = {
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URL,
  jwtSecret: process.env.JWTSECRET as Jwt.Secret,
};

export default configDefault;
