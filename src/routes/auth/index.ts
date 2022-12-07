import express, { Router, Request, Response } from "express";
import AuthService from "../../services/auth";

const authRouter = (app: express.Application) => {
  const authService: AuthService = new AuthService();

  const router: express.IRouter = Router();
  app.use("/api/auth", router);

  router.get("/", (req: Request, res: Response) => {
    return res.json({ user: "Edgar" });
  });

  router.post("/register", async (req: Request, res: Response) => {
    console.log(req.body);
    const user = await authService.register(req.body);
    return res.json(user);
  });
};

export default authRouter;
