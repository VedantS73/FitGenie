import { NextApiRequest, NextApiResponse } from "next";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const prompt = req.body.prompt

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("text is ==>", text);
    res.status(200).json(response.text());
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while generating text." });
  }
}

export default handler;

// import { NextApiRequest, NextApiResponse } from "next";
// // import { Configuration } from "openai";
// import OpenAI from "openai";

// const openai = new OpenAI({ apiKey: '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' });

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const completion = await openai.chat.completions.create({
//       messages: [
//         {
//           role: "system",
//           content: "You are a helpful assistant designed to output JSON.",
//         },
//         { role: "user", content: req.body.prompt },
//       ],
//       model: "gpt-3.5-turbo",
//       response_format: { type: "json_object" },
//     });
//     console.log('promting')
//     console.log(req.body.prompt)
//     console.log('prompt answer')
//     console.log(completion.choices[0]);

//     // Send a response with a status code of 200 and the generated text as the response body
//     res.status(200).json({ result:completion.choices[0] });
//   } catch (error) {
//     // Handle errors appropriately
//     console.error("Error:", error);
//     res.status(500).json({ error: "An error occurred while generating text." });
//   }
// };

// export default handler;


