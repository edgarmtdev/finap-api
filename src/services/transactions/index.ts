import { PrismaClient } from "@prisma/client";
import Account from "../account";

class Transactions {
  public client: PrismaClient;
  public account: Account;

  constructor(client: PrismaClient) {
    this.client = new PrismaClient();
    this.account = new Account(client);
  }

  async incomeMonney(amount: number, idUser: number, idAccount: number, reason: string) {
    try {
      const income = await this.client.transactions.create({
        data: {
          type: "IN",
          idAccount,
          idUser,
          amount,
          reason,
        }
      });

      if (income) {
        const resAccount = await this.account.getAccountByUserId(idUser);
        const newAmount: number = resAccount.account.total + amount;
        
        const totalAccount = await this.account.updateTotalOfAccount({
          idAccount,
          amount: newAmount,
        });
        return {
          success: true,
          data: totalAccount
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
