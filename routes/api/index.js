import { Router } from "express";
const router = Router();

import createRouter from "./create"
import searchRouter from "./search"

/**
 * TODO: Create endpoints for 
 * 1. Youtube URL Upload/Processing
 * 2. Querying the stored vector db for the youtube video
 */
router.use("/create", createRouter);
router.use("/search", searchRouter);

export default router;