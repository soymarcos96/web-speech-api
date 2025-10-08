import { useState } from "react";
import { getTranslatedStream } from "../services/translate";

export function useLiveTranslator() {
  const [translatedText, setTranslatedText] = useState("");

  const speak = (chunk: string) => {
    const utterance = new SpeechSynthesisUtterance(chunk);
    speechSynthesis.speak(utterance);
  };

  const startStream = async (prompt: string, language: string) => {
    setTranslatedText("");

    const stream = await getTranslatedStream(prompt, language);
    const reader = stream.getReader();
    const decoder = new TextDecoder();

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);

        setTranslatedText(prev => prev + chunk);
        speak(chunk);
      }
    }
  }

  return { translatedText, startStream };
}