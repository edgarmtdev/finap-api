import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import client from "src/libs/prisma";
import config from "../../config";
import formatMessage from "../../helpers/errors/messages";
import { AuthResponse, AuthUser, LoginUser, TokenUser } from "../../types/auth";
import { User } from "../../types/user";
import UserService from "../user";

class AuthService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService(client);
  }

  async register(data: AuthUser): Promise<object | unknown> {
    try {
      if (data) {
        data.password = await this.encryptPassword(data.password);
        const response = await this.userService.newUser(data);
        return response;
      }
      return {
        success: false,
        message: formatMessage(2),
      };
    } catch (error) {
      return error;
    }
  }

  async login(data: LoginUser) {
    try {
      const { email, password } = data;
      if (email && password) {
        const response = await this.userService.findUserByEmail(email);

        if (response.user) {
          const passwordCompare: boolean | unknown = await this.comparePassword(
            password,
            response.user.password
          );

          if (passwordCompare) {
            return this.formatDataToReturn(response.user);
          }

          return {
            success: false,
            message: formatMessage(3, "password"),
          };
        }
      }

      return {
        success: false,
        message: formatMessage(3, "email and password"),
      };
    } catch (error) {
      console.log("error", error);

      return {
        success: false,
        message: error,
      };
    }
  }

  private formatDataToReturn(user: User): AuthResponse {
    const data: TokenUser = {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      role: user.role,
      email: user.email,
    };

    const token: string = this.getToken(data);

    return {
      success: true,
      user: data,
      token: token,
    };
  }

  private async encryptPassword(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(10);
    const response: string = await bcrypt.hash(password, salt);
    return response;
  }

  private async comparePassword(
    password: string,
    passwordEncrypt: string
  ): Promise<boolean> {
    const response: boolean = await bcrypt.compare(password, passwordEncrypt);
    return response;
  }

  private getToken(user: TokenUser): string {
    const token: string = Jwt.sign(user, config.jwtSecret, { expiresIn: "2d" });
    return token;
  }
}

export default AuthService;
