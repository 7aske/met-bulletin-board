import { Router, static as expressStatic } from "express";
import manage from "./routes/manage";
import create from "./routes/create";
import vote from "./routes/vote";
import authentication from "./routes/authenticaton";
import nodemodules from "./routes/nodemodules";
import { join } from "path";

const router = Router();

router.use(expressStatic(join(process.cwd(), "dist/server/client")));
router.use("/manage", manage);
router.use("/vote", vote);
router.use("/create", create);
router.use("/auth", authentication);
router.use("/node_modules/*", nodemodules);

export default router;
