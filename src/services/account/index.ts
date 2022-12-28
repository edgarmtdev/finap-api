import { PrismaClient } from "@prisma/client";

class Account {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async createAccount(idUser: number) {
    try {
      const account = this.client.account.create({
        data: {
          idUser,
          total: 0,
        },
      });
      return {
        success: true,
        account,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  }

  async getAccountByUserId(idUser) {
    try {
    } catch (error) {}
  }
}

export default Account;
