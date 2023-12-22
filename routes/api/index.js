import { Router } from "express";
const router = Router();

import createRouter from "./create.js"
import queryRouter from "./query.js"

router.use("/create", createRouter);
router.use("/query", queryRouter);

export default router;