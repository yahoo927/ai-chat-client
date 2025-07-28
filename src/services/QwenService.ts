//import { config } from "dotenv";
import OpenAI from "openai";

const API_KEY = process.env.REACT_APP_DASHSCOPE_API_KEY;
const MODEL_NAME = 'qwen-plus';//As of October 2024

//npm install openai dotenv
// Load .env variables
//config();

// Error: It looks like you're running in a browser-like environment.
// This is disabled by default, as it risks exposing your secret API credentials to attackers.
// If you understand the risks and have appropriate mitigations in place,
// you can set the `dangerouslyAllowBrowser` option to `true`, e.g.,
// new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
// https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety


const client = new OpenAI({
  apiKey: API_KEY,//process.env.DASHSCOPE_API_KEY, // Replace with "sk-xxx" directly if needed
  baseURL: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1", // Qwen-compatible endpoint
  dangerouslyAllowBrowser: true, // Allow browser-like environments
});

export const sendMessageToQwen = async (message: string): Promise<string> => {
  try {
    const completion = await client.chat.completions.create({
      model: MODEL_NAME, // You can use qwen-plus or others
      messages: [
        { role: "system", content: "You are a helpful assistant. Clarify that the answer if the data is beyond your model training cutoff date." },
        { role: "user", content: message },
      ],
    });

    console.log(completion.choices[0].message?.content);
    const result = await completion.choices[0].message?.content;
    // return new Promise((resolve, reject) => {
    //     try {
    //         resolve(result);
    //     } catch (error) {
    //         reject(error);
    //     }
    // });
     return completion.choices[0].message?.content || "";
  } catch (e: any) {
    console.error("Error message:", e.message);
    console.error(
      "For more information, see: https://www.alibabacloud.com/help/en/model-studio/developer-reference/error-code"
    );
    return "";
  }
};