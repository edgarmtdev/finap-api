import UserService from "../user";
import AuthUser from "../types";

class AuthService {
  constructor(
    private userService: UserService = new UserService()
  ) {}

  async register(data: AuthUser) {
    try {
      const response = await this.userService.newUser(data);
      return response;
    } catch (error) {
      return error;
    }
  }

  async login() {
    
  }
}

export default AuthService;
