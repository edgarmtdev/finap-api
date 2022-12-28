import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import client from "./libs/prisma";
import config from "./config";

// Routes
import usersRouter from "./routes/user";
import authRouter from "./routes/auth";
import transactionsRouter from "./routes/transactions";
import accountRouter from "./routes/account";

const app: Application = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser(config.jwtSecret as string));

app.get("/", (req: Request, res: Response) => {
  return res.json({ hello: "World" });
});

// Routers
authRouter(app);
usersRouter(app, client);
accountRouter(app, client);
transactionsRouter(app, client);

export default app;
