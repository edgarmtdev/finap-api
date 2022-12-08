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
    const user = await authService.register(req.body);
    return res.json(user);
  });

  router.post("/login", async (req: Request, res: Response) => {
    const response = await authService.login(req.body);
    return res.json(response);
  });
};

export default authRouter;
