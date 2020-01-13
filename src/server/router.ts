import { Router } from "express";
import slide from "./routes/slide";
import vote from "./routes/vote";
import poll from "./routes/poll";
import auth from "./routes/auth";
import index from "./routes";
import { authorizeRequest } from "./middleware/authentication";

const router = Router();

router.use("/auth", auth);
// vote authorization is handled in vote.ts route
router.use("/vote", vote);
router.use("/poll", authorizeRequest, poll);
// vote authorization is handled in slide.ts route
router.use("/slide", slide);
router.use("/*", index);

export default router;
