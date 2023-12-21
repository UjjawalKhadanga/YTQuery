import { configDotenv } from "dotenv";
configDotenv()

import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts"
import { LLMChain } from "langchain/chains";
import { StructuredOutputParser } from "langchain/output_parsers";

const parser =  StructuredOutputParser.fromNamesAndDescriptions({
    city: "{capital}",
    population: "The population of {capital} is {population}."
    // population: "The population of {country} is {population}."
})

const prompt = new PromptTemplate({
    template: "What is the capital of {country} and its population?\n\n{format_instructions}",
    inputVariables: ["country"],
    partialVariables: { format_instructions: parser.getFormatInstructions() }
});


const model = new OpenAI({ temperature: 0, modelName: "text-davinci-003",  openAIApiKey: process.env.OPENAI_API_KEY});

const chain1 = new LLMChain({ llm: model, prompt: prompt, outputParser: parser, outputKey: "answer"});

const res = await chain1.call({
    country: "Pakistan",
})
console.log(res);

