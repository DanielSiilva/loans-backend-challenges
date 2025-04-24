import { MakeWelcomeControllher } from "@/presentation/make-welcome-controller";
import { Router } from "express";

const router = Router();

router.get("/", MakeWelcomeControllher);

export default router;
