import { PrismaClient } from "@prisma/client";
import express, { Router, Request, Response } from "express";
import authValidation from "../../middlewares/auth";
import UserService from "../../services/user";

const usersRouter = (app: express.Application, client: PrismaClient) => {
  const userService: UserService = new UserService(client);
  const router: express.IRouter = Router();
  app.use("/api/users", router);

  router.get("/find-user", async (req: Request, res: Response) => {
    const { id } = req.query;
    console.log(req.params);
    const user = await userService.findUserById(id as string);
    return res.json(user);
  });
};

export default usersRouter;
