import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { FaissStore } from "langchain/vectorstores/faiss";

async function createPineconeIndex(client, indexName, vecDimention) {
    const existingIndexes = await client.listIndexes();
    if (existingIndexes.find(index => index.name === indexName)) {
        console.log(`Index ${indexName} already exists.`);
        return;
    }

    const index = await client.createIndex({
        name: indexName,
        dimension: vecDimention,
        metric: "cosine",
    });

    console.log(`Index created. ${index}`);
}

async function createEmbeddingsAndStore(docs, storagePath) {
    const vectorStore = await FaissStore.fromDocuments(
        docs,
        new OpenAIEmbeddings(),
    );
    await vectorStore.save(storagePath)
}

async function getSimilarDocsFromDB(dbPath, query, k=4) {
    const db = await FaissStore.load(dbPath, new OpenAIEmbeddings())
    const docs = db.similaritySearch(query, k)
    return docs;
}


export {
    createPineconeIndex,
    createEmbeddingsAndStore,
    getSimilarDocsFromDB
}