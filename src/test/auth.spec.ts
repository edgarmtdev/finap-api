import { expect } from "chai";
import AuthService from "../services/auth";
import UserService from "../services/user";
import { AuthUser } from "../types/auth";

const userService: UserService = new UserService();
const authService: AuthService = new AuthService(userService);

const user: AuthUser = {
  role: "USER",
  email: "test_email@mail.com",
  password: "123456",
  name: "User_name",
  lastName: "User_lastname",
};

describe("Auth service", () => {
  it("should register a new user", async () => {
    const response = authService.register(user);

    expect(response).to.be.a("object");
    expect(response).to.be.equals({ success: true, user });
  });
});
