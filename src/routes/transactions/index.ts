import { PrismaClient } from "@prisma/client";
import { Application, IRouter, Router } from "express";
import Transactions from "src/services/transactions";

const transactionsRouter = (app: Application, client: PrismaClient) => {
    const router: IRouter = Router();
}

export default transactionsRouter;