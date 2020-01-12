import { Router } from "express";
import slide from "./routes/slide";
import vote from "./routes/vote";
import poll from "./routes/poll";
import auth from "./routes/auth";
import { isDev } from "./utils/dev";
import { authorizeLocalhost, authorizeRequest } from "./middleware/authentication";

const router = Router();

router.use("/auth", auth);

if (isDev()) {
	router.use("/vote", vote);
	router.use("/poll", poll);
	router.use("/slide", slide);
} else {
	router.get("/vote", authorizeRequest, vote);
	router.post("/vote", authorizeLocalhost, vote);
	router.use("/poll", authorizeRequest, poll);
	router.use("/slide", authorizeRequest, slide);
}


export default router;
