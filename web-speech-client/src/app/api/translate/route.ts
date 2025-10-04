import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export async function POST(request: Request) {
  const { language, text } = await request.json();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{
      parts: [{
        text: `Translate this sentence: ${text}`
      }]
    }],
    config: {
      systemInstruction: `You will be provided with a sentence. 
      Your tasks are to:
        - Detect what language the sentence is in
        - Translate the sentence into ${language}
      Do not return anything other than the translated sentence.`,
      thinkingConfig: {
        thinkingBudget: 0,
      },
    }
  });

  return NextResponse.json({
    text: response.text
  })
};

