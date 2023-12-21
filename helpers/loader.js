import { YoutubeLoader } from "langchain/document_loaders/web/youtube";
import {  RecursiveCharacterTextSplitter } from "langchain/text_splitter";

async function getTranscripts(url) {
    const loader = YoutubeLoader.createFromUrl(url, { language: "en", addVideoInfo: true });
    const docs = await loader.load();
    return docs;
}

async function chunkDocs(docs) {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 10,
    });
    const output = await splitter.splitDocuments(docs);
    console.log("Documents splitting successful\n");
    return output;
}


export {
    getTranscripts,
    chunkDocs,
}
