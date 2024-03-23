// import { NextApiRequest, NextApiResponse } from "next";
import { Configuration } from "openai";

// const configuration = new Configuration({
//   apiKey: process.env.OPEN_API_KEY,
// });

// const openai = new OpenAI(configuration);

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const completion = await openai.createCompletion({
//       model: "gpt-3.5-turbo", // Use the GPT-3.5 Turbo model
//       prompt: req.body.prompt, // Text prompt to generate continuation from, passed in as a request body parameter
//       temperature: 1,
//       top_p: 1,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//       max_tokens: 256, // Maximum number of tokens to generate in the output text
//     });

//     // Send a response with a status code of 200 and the generated text as the response body
//     res.status(200).json({ result: completion.data });
//   } catch (error) {
//     // Handle errors appropriately
//     console.error("Error:", error);
//     res.status(500).json({ error: "An error occurred while generating text." });
//   }
// };

// export default handler;


import OpenAI from "openai";
cont

const openai = new OpenAI(configuration);

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();