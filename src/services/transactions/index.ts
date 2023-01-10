import { PrismaClient } from "@prisma/client";
import Account from "../account";
import TransactionMoney from "./model";

class Transactions {
  public client: PrismaClient;
  public account: Account;

  constructor(client: PrismaClient) {
    this.client = new PrismaClient();
    this.account = new Account(client);
  }

  async newTransaction(data: TransactionMoney) {
    try {
      const income = await this.client.transactions.create({
        data: {
          type: data.type,
          idAccount: data.idAccount,
          idUser: data.idUser,
          amount: data.amount,
          reason: data.reason,
        },
      });
      return {
        success: true,
        operation: income,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }

  async updateAccountOfUser(idAccount: number, amount: number) {
    try {
      const account = await this.account.updateTotalOfAccount({
        idAccount,
        amount,
      });
      return {
        success: true,
        account,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }

  async incomeMoney(data: TransactionMoney) {
    try {
      const income = await this.newTransaction(data);

      if (income.success) {
        const resAccount = await this.account.getAccountByUserId(data.idUser);
        const newAmount: number = resAccount.account.total + data.amount;

        const totalAccount = await this.updateAccountOfUser(
          data.idAccount,
          newAmount
        );
        return {
          success: true,
          data: totalAccount,
        };
      }
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }

  async withdrawalMoney(data: TransactionMoney) {
    try {
      const withdrawal = await this.newTransaction(data);

      if (withdrawal.success) {
        const resAccount = await this.account.getAccountByUserId(data.idUser);
        const newAmount: number = resAccount.account.total - data.amount;

        const totalAccount = await this.updateAccountOfUser(
          data.idAccount,
          newAmount
        );
        return {
          success: true,
          data: totalAccount,
        };
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
