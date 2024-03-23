import { NextApiRequest, NextApiResponse } from "next";
// import { Configuration } from "openai";
import OpenAI from "openai";

// const configuration = new Configuration({
//   apiKey: process.env.OPEN_API_KEY,
// });

const openai = new OpenAI({ apiKey: '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' });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to output JSON.",
        },
        { role: "user", content: req.body.prompt },
      ],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
    });
    console.log('promting')
    console.log(req.body.prompt)
    console.log('prompt answer')
    console.log(completion.choices[0]);

    // Send a response with a status code of 200 and the generated text as the response body
    res.status(200).json({ result:completion.choices[0] });
  } catch (error) {
    // Handle errors appropriately
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while generating text." });
  }
};

export default handler;


