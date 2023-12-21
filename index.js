import { configDotenv } from "dotenv";
configDotenv()

import { getYoutubeIdFromURL } from "./utils.js";
import { createEmbeddingsAndStore, getSimilarDocsFromDB } from "./helpers/embeddings.js"
import { getTranscripts, chunkDocs } from "./helpers/loader.js"
import { queryFromDocs } from "./helpers/chains.js"

// // Flow 1 - Recieve the url, get transcript, chunk it and store in vector db
// const url = 'https://www.youtube.com/watch?v=Szox9wD4HRU'
// const videoId = getYoutubeIdFromURL(url)

// const transcripts = await getTranscripts(url)
// const chunkedTranscripts = await chunkDocs(transcripts)
// createEmbeddingsAndStore(chunkedTranscripts, `./documents/${videoId}`)


// // Flow 2 - Given a query, find k most similar docs from db, pass docs + query to the LLM chain 
// const question = "What is the authors daily routine?"
// const similarDocs = await getSimilarDocsFromDB(`./documents/${videoId}`, question, 2)
// const res = await queryFromDocs(similarDocs, question)
// console.log(res)

import express from "express";
const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!")
});

import apiRouter from "./routes/api";
app.use("/api", apiRouter);

app.listen(8080, () => {
    console.log("Server is running on port 3000")
})