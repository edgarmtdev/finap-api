import { PrismaClient } from "@prisma/client";

class Account {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async createAccount(idUser: number) {
    try {
      console.log("Enter");

      const account = await this.client.account.create({
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

  async updateTotalOfAccount(data: { idAccount: number, amount: number }) {
    try {
      const account = await this.client.account.update({
        where: {
          id: data.idAccount,
        },
        data: {
          total: data.amount,
        },
        include: {
          user: true
        }
      });
      return account;
    } catch (error) {}
  }
}

export default Account;
