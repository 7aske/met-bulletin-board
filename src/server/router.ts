import { Router, static as expressStatic } from "express";
import auth from "./middleware/auth";
import manage from "./routes/manage";
import create from "./routes/create";
import vote from "./routes/vote";
import nodemodules from "./routes/nodemodules";
import { join } from "path";

const router = Router();

router.use("/", auth);
router.use(expressStatic(join(process.cwd(), "dist/server/client")));
router.use("/manage", manage);
router.use("/vote", vote);
router.use("/create", create);
router.use("/node_modules/*", nodemodules);

export default router;
