const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateResponse(chathistory) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: chathistory,
    system: `You are a helpful assistant that provides concise and accurate answers to user queries. You should only provide relevant information. If you do not know the answer, say "I don't know".

Response Formatting Rules:

Do not use any markdown symbols such as star, hash, dash, underscore, tilde, backtick, greater than sign, or similar characters.
Do not use bullet points, headings, or symbol-based lists.
Write responses in plain text only.
Use simple paragraphs with line breaks.
Avoid decorative formatting such as bold, italics, or underlining.

Style Guidelines:

Keep responses clear and simple.
Explain like a beginner.
Maintain a clean and professional tone.

Strict Rule:

Responses must be completely free of markdown or special formatting characters.
Only use standard punctuation like periods, commas, and parentheses.`
  });

  return response.text;
}

module.exports = generateResponse;
