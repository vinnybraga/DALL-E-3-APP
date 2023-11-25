import { OpenAI } from "openai";

export default async function handler(req, res) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: req.query.p,
    n: 1,
    size: "1024x1024",
  });

  console.log(response.data);
  res.status(200).json({ result: response.data });
}
