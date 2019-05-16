import { Router } from "express";
import { manage } from "./routes/manage";

const router = Router();

router.get("/manage", manage);

export default router;
