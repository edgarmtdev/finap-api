import { PrismaClientValidationError } from "@prisma/client/runtime";
import { PrismaClient } from "@prisma/client";
import formatMessage from "../../helpers/errors/messages";
import { AuthUser } from "../../types/auth";
import { User } from "../../types/user";

class UserService {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async newUser(
    data: AuthUser
  ): Promise<
    | { success: boolean; user: User }
    | { success: boolean; error: string }
    | undefined
  > {
    try {
      const user = await this.client.user.create({
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

      const user = await this.client.user.findUnique({
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

  async findUserById(id: string) {
    try {
      if (!id)
        return {
          success: false,
          message: formatMessage(1, "id"),
        };

      const user = await this.client.user.findUnique({
        where: {
          id: parseInt(id),
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
