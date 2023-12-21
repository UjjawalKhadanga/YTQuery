import { Router } from "express"

const router = Router();
router.post("/", (req, res) => {
    /**
     * TODO: Querying the stored vector db for the youtube video
     */
    res.send("Querying the stored vector db for the youtube video");
});
export default router;