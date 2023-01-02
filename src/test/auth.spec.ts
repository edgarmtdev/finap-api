import { expect } from "chai";
import AuthService from "../services/auth";
import { AuthUser } from "../types/auth";
import { initializeDB } from './config/db'

before(() => {
  return initializeDB()
})

const authService: AuthService = new AuthService();

const user: AuthUser = {
  role: "ADMIN",
  email: "edgarmontiel961@gmail.com",
  name: "Edgar Ulises",
  lastName: "Montiel Texis",
  password: "12345",
};

describe("Auth service", () => {
  it("should register a new user", async () => {
    const response = await authService.register(user);

    expect(response).to.not.equal(null);
  });
});
