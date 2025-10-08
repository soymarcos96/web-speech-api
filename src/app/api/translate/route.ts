import { GoogleGenAI } from "@google/genai";
import { NextRequest } from "next/server";

export const runtime = "edge";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(request: NextRequest) {
  const { language, text } = await request.json();

  const stream = await ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: [
      {
        parts: [
          {
            text: `Translate this sentence: ${text}`,
          },
        ],
      },
    ],
    config: {
      systemInstruction: `You will be provided with a sentence.
      Your tasks are to:
        - Detect what language the sentence is in
        - Translate the sentence into ${language}
        Do not return anything other than the translated sentence.`,
      thinkingConfig: {
        thinkingBudget: 0,
      },
    },
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.text;
        controller.enqueue(encoder.encode(text));
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache",
    },
  });
}