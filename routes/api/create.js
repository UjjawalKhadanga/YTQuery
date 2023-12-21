import { Router } from "express"
const router = Router();

import { getYoutubeIdFromURL } from "../../utils.js";
import { createEmbeddingsAndStore } from "../../helpers/embeddings.js"
import { getTranscripts, chunkDocs } from "../../helpers/loader.js"
import indexStatusDb from "../../models/indexStatus.js"

const processCreateRequest = async (url) => {
   try {
      const transcripts = await getTranscripts(url);
      const chunkedTranscripts = await chunkDocs(transcripts);
      const videoId = getYoutubeIdFromURL(url);
      await createEmbeddingsAndStore(chunkedTranscripts, `./documents/${videoId}`)
      // Update process status as COMPLETED
      await indexStatusDb.updateOne({ videoId }, { $set: { status: "COMPLETED" } });
      console.log(`Processing complete for videoId:${videoId}`);
   } catch (err) {
      console.log(err);
      // Update process status as FAILED
      await indexStatusDb.updateOne({ videoId }, { $set: { status: "FAILED" } });
   }
}

const getCreateRequestStatus = async (videoId) => {
   const indexStatus = await indexStatusDb.findOne({ videoId });
   return indexStatus.status;
}

router.post("/", async (req, res) => {
   // Flow - Recieve the url, get transcript, chunk it and store in vector db
   const { url } = req.body;
   try {
      const videoId = getYoutubeIdFromURL(url);

      // check if videoId exists
      const indexStatusExists = await indexStatusDb.exists({ videoId });
      if (indexStatusExists) return res.json({ success: true, videoId, message: "Video Already Processed" });

      // Create IndexStatus document with status CREATED
      await indexStatusDb.create({ videoId, status: "CREATED" });

      // Asyncrously Process the URL
      processCreateRequest(url);
      console.log(`Processing videoId:${videoId}...`);

      res.json({ success: true, videoId });
   } catch (error) {
      console.log(error);
      res.status(500).json({ success: false });
   }
})

router.get('/status', async (req, res) => {
   const { videoId } = req.query;
   try {
      if (!videoId) return res.json({ success: false, message: "VideoId is required" });
      const indexStatusExists = await indexStatusDb.exists({ videoId });
      if (!indexStatusExists) return res.json({ success: false, message: `Index for videoId not created. Please create the index first.` });

      const status = await getCreateRequestStatus(videoId);

      res.json({ success: true, videoId, status });
   } catch (error) {
      console.log(error);
      res.status(500).json({ success: false });
   }
});

export default router;