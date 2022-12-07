import { PrismaClientValidationError } from "@prisma/client/runtime";
import client from "../../libs/prisma";
import AuthUser from "../types";

class UserService {
  constructor() {}

  async newUser(data: AuthUser) {
    try {
      const user = await client.user.create({
        data: data,
      });
      return {
        success: true,
        user,
      };
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        console.log(error.message);
        
        return {
          success: false,
          error: error.message,
        };
      }
    }
  }

  async findUser(id: number | undefined) {
    try {
      const user = await client.user.findUnique({
        where: {
          id: id,
        },
      });

      console.log(user);
      return user;
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }
}

export default UserService;
