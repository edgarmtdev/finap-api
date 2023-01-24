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
      console.log(data);
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
        data: account,
      };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }

  async incomeMoney(data: TransactionMoney) {
    try {
      data.type = "IN";
      const income = await this.newTransaction(data);

      if (income.success) {
        const account = await this.account.getAccountByUserId(data.idUser);
        const newAmount: number = account.data.total + data.amount;

        const totalAccount = await this.updateAccountOfUser(
          data.idAccount,
          newAmount
        );

        console.log("test", totalAccount);
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
      const account = await this.account.getAccountByUserId(data.idUser);

      if (account.data.total === 0 || account.data.total < data.amount) {
        return {
          success: false,
          data: "No cuentas con el saldo suficiente",
        };
      }

      data.type = "OUT";
      const withdrawal = await this.newTransaction(data);

      if (withdrawal.success) {
        const newAmount: number = account.data.total - data.amount;

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
