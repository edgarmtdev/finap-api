import express, { Application, Request, Response } from "express";
import authRouter from "./routes/auth";

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.json({ hello: "World" });
});

authRouter(app);

export default app;
