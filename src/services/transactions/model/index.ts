import { TypeTransaction } from "@prisma/client";

interface TransactionMoney {
  type: TypeTransaction;
  amount: number;
  idUser: number;
  idAccount: number;
  reason: string;
}

export default TransactionMoney;
