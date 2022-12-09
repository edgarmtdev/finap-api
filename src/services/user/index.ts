import { PrismaClientValidationError } from "@prisma/client/runtime";
import formatMessage from "../../helpers/errors/messages";
import client from "../../libs/prisma";
import { AuthUser, User } from "../types";

class UserService {
  constructor() {}

  async newUser(
    data: AuthUser
  ): Promise<
    | { success: boolean; user: User }
    | { success: boolean; error: string }
    | undefined
  > {
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

  async findUserByEmail(email: string | undefined) {
    try {
      if (!email)
        return {
          success: false,
          message: formatMessage(1, "email"),
        };

      const user = await client.user.findUnique({
        where: {
          email: email,
        },
      });

      return {
        success: true,
        user,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }
}

export default UserService;
