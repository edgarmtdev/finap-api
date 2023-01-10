import { expect } from "chai";
import AuthService from "../services/auth";
import { AuthUser } from "../types/auth";
import { initializeDB } from "./config/db";
import Transactions from "../services/transactions";
import client from "../libs/prisma";

const transactionsService: Transactions = new Transactions(client);

before(() => {
  return initializeDB();
});

const authService: AuthService = new AuthService();

const user: AuthUser = {
  role: "ADMIN",
  email: "edgarmontiel961@gmail.com",
  name: "Edgar Ulises",
  lastName: "Montiel Texis",
  password: "12345",
};

describe("Auth service and transactions", () => {
  it("should register a new user", async () => {
    const response = await authService.register(user);
    expect(response).to.not.equal(null);
  }),
    it("should deposit money into the user's account", async () => {
      const response = await transactionsService.incomeMoney({
        amount: 1000,
        idUser: 13,
        idAccount: 13,
        reason: "test",
      });
      console.log(response);

      expect(response.data.total).to.be.a("number");
      expect(response.data.total).to.be.equal(1000);
    });
});
