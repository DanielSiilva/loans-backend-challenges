import welcomeController from "@/main/controllers/welcome-controller";
import { Response, Request } from "express";

export async function MakeWelcomeControllher(req: Request, res: Response) {
  try {
    const response = await welcomeController.execute();
    res.status(200).send(response);
  } catch (error: any) {
    res.status(500).send(error?.message);
  }
}
