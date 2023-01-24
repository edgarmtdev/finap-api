import { PrismaClient } from "@prisma/client";
import { Application, IRouter, Router, Request, Response } from "express";
import Transactions from "../../services/transactions";
import Account from "../../services/account";
import authValidation from "../../middlewares/auth";

const transactionsRouter = (app: Application, client: PrismaClient) => {
  const router: IRouter = Router();
  app.use("/api/transactions", router);
  const transactionsService = new Transactions(client);

  router.post(
    "/income",
    authValidation("ADMIN"),
    async (req: Request, res: Response) => {
      const response = await transactionsService.incomeMoney(req.body);
      return res.status(response.success ? 200 : 400).json(response);
    }
  );

  router.post(
    "/withdrawal",
    authValidation("ADMIN"),
    async (req: Request, res: Response) => {
      const response = await transactionsService.withdrawalMoney(req.body);
      return res.status(response.success ? 200 : 400).json(response);
    }
  );
};

export default transactionsRouter;
