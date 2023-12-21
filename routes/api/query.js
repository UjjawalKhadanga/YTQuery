import { Router } from "express"
const router = Router();

import { getSimilarDocsFromDB } from "../../helpers/embeddings.js"
import { queryFromDocs } from "../../helpers/chains.js"



router.post("/:videoId", async (req, res) => {
    // Flow - Given a query, find k most similar docs from db, pass docs + query to the LLM chain 
    const {videoId} = req.params;
    const { q: question } = req.query;
    try {
        const similarDocs = await getSimilarDocsFromDB(`./documents/${videoId}`, question)
        const resultText = await queryFromDocs(similarDocs, question)

        res.json({ success: true, answer: resultText })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, error: err.message })
    }

});
export default router;
