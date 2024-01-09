import { OpenAI } from "langchain/llms/openai";
import { loadQAStuffChain } from "langchain/chains";
import { Document } from 'langchain/document' 
import { StructuredOutputParser } from "langchain/output_parsers";

export async function queryFromDocs(docs, query) {
    const model = new OpenAI({
        modelName: "gpt-3.5-turbo-1106",
        temperature: 0.2,
        openAIApiKey: process.env.OPENAI_API_KEY
    });

    const chain = loadQAStuffChain(model)
    console.log(docs)
    const combinedPageContent = docs.map(doc => doc.pageContent).join(" ")
    const result = await chain.call({
        input_documents: [new Document({ pageContent: combinedPageContent })],
        question: query,
    })
    return result.text;
}