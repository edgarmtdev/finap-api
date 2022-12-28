import { PrismaClient } from "@prisma/client";
import Account from "../account";

class Transactions {
  public client: PrismaClient;
  public account: Account;

  constructor(account: Account, client: PrismaClient) {
    this.client = client;
    this.account = account;
  }

  async incomeMonney(amount: number, idUser: number, idAccount: number) {
    try {
      const income = await this.client.transactions.create({
        data: {
          type: "IN",
          idUser,
          idAccount,
          amount,
        },
      });

      if (income) {
        const account = await this.account.updateTotalOfAccount({
          idAccount,
          amount,
        });
        return {
          success: true,
          data: account
        }
      }
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
}

export default Transactions;
