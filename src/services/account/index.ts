import { PrismaClient } from "@prisma/client";

class Account {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async createAccount(idUser: number) {
    try {
      const account = await this.client.account.create({
        data: {
          idUser,
          total: 0,
        },
      });
      return {
        success: true,
        data: account,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  }

  async getAccountByUserId(idUser: number) {
    try {
      const account = await this.client.account.findFirst({
        where: {
          idUser,
        },
      });
      return {
        success: true,
        data: account,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }

  async updateTotalOfAccount(data: { idAccount: number; amount: number }) {
    try {
      const account = await this.client.account.update({
        where: {
          id: data.idAccount,
        },
        data: {
          total: data.amount,
        },
        include: {
          user: true,
        },
      });
      return account;
    } catch (error) {
      return error;
    }
  }
}

export default Account;
