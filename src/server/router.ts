import { Router, static as expressStatic } from "express";
import slide from "./routes/slide";
import vote from "./routes/vote";
import poll from "./routes/poll";
import authentication from "./routes/authenticaton";
import nodemodules from "./routes/nodemodules";
import { join } from "path";

const router = Router();

router.use(expressStatic(join(process.cwd(), "dist/server/client")));
router.use("/vote", vote);
router.use("/poll", poll);
router.use("/slide", slide);
router.use("/auth", authentication);
router.use("/node_modules/*", nodemodules);

export default router;
