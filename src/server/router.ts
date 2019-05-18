import { Router, static as expressStatic } from "express";
import manage from "./routes/manage";
import create from "./routes/create";
import nodemodules from "./routes/nodemodules";
import { join } from "path";

const router = Router();
router.use(expressStatic(join(process.cwd(), "dist/server/client")));
router.use("/manage", manage);
router.use("/create", create);
router.use("/node_modules/*", nodemodules);

export default router;
