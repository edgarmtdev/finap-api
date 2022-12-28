import { PrismaClientValidationError } from "@prisma/client/runtime";
import { PrismaClient } from "@prisma/client";
import formatMessage from "../../helpers/errors/messages";
import { AuthUser } from "../../types/auth";

class UserService {
  constructor(private client: PrismaClient) {}

  async newUser(data: AuthUser) {
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
        return {
          success: false,
          error: error.message,
        };
      }
      if (error.code === "P2002") {
        return {
          success: false,
          error: formatMessage(4, error.meta.target),
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
        }, include: {
          accounts: true
        }
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
