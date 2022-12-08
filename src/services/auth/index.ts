import bcrypt from "bcrypt";
import formatMessage from "../../helpers/errors/messages";
import { AuthUser, LoginUser } from "../types";
import UserService from "../user";

class AuthService {
  constructor(private userService: UserService = new UserService()) {}

  async register(data: AuthUser) {
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
      const response = await this.userService.findUserByEmail(email);

      if (response.user) {
        const passwordCompare: boolean | unknown = await this.comparePassword(
          password,
          response.user.password
        );

        if (passwordCompare) {
          return response;
        }

        return {
          success: false,
          message: formatMessage(3, "password"),
        };
      }
    } catch (error) {
      return error;
    }
  }

  private async encryptPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const response = await bcrypt.hash(password, salt);
    return response;
  }

  private async comparePassword(password: string, passwordEncrypt: string) {
    const response = await bcrypt.compare(password, passwordEncrypt);
    return response;
  }
}

export default AuthService;
