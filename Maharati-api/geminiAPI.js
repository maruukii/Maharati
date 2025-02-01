/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(input) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(input);
  const responseText = result.response.text();

  // Limit the response to a maximum of 3 lines
  const limitedResponse = responseText.split("\n").slice(0, 5).join("\n");

  return limitedResponse;
}

async function AI(req, res) {
  try {
    const { input } = req.body;
    console.log(input);

    const result = await run(input);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}
module.exports = { AI };
