import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  // organization: "org-xMPJhjt9lLy4mU7JAzIgRRXW",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default openai;
