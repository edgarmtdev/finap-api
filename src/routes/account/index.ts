import { PrismaClient } from "@prisma/client";
import { Application, IRouter, Router } from "express";

const accountRouter = (app: Application, client: PrismaClient) => {
    const router: IRouter = Router();
}

export default accountRouter;