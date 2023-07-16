import { Configuration, OpenAIApi } from "openai";

const generateImage = async (prompt) => {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_TOKEN,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });
  const imageURL = response.data.data.url;
  console.log(imageURL);
  return imageURL
};

export default generateImage;
