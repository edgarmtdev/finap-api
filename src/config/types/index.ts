import Jwt from "jsonwebtoken";

interface Config {
  port: string | undefined;
  databaseURL: string | undefined;
  jwtSecret: Jwt.Secret;
}

export default Config;
