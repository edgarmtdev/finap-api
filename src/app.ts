import express, { Application, Request, Response } from "express";
import authRouter from "./routes/auth";
import morgan from 'morgan';


const app: Application = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  return res.json({ hello: "World" });
});

// Routers
authRouter(app);

export default app;
