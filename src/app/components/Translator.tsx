"use client";
import { useRef, useState } from "react";
import { Languages } from "./Languages";
import { RecordingButton } from "./RecordingButton";
import { TextArea } from "./TextArea";
import { useLiveTranslator } from "../hooks/useLiveTranslator";

export const Translator = () => {
  const recordingRef = useRef<SpeechRecognition>(null);
  const { translatedText, startStream } = useLiveTranslator();

  const [isRecording, setIsRecording] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("en");

  const handleOnRecording = () => {
    if (isRecording) {
      recordingRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser is not supported");
      return;
    }

    recordingRef.current = new SpeechRecognition();

    recordingRef.current.onaudiostart = () => {
      setIsRecording(true);
    };

    recordingRef.current.onaudioend = () => {
      setIsRecording(false);
    };

    recordingRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setPrompt(transcript);
      startStream(transcript, language);
    };

    recordingRef.current.onerror = () => {
      alert("An error ocurred during the recording");
      return;
    };

    recordingRef.current?.start();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-purple-900 to-black text-white">
      <div className="w-full max-w-xl rounded-lg bg-black/60 p-6 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-purple-400">
          Voice translator
        </h1>
        <Languages
          value={language}
          onChange={(language) => setLanguage(language)}
        />
        <RecordingButton
          isRecording={isRecording}
          onClick={handleOnRecording}
        />

        <TextArea value={prompt} placeholder="Recognized text..." />

        <TextArea value={translatedText} placeholder="Translated text..." />
      </div>
    </div>
  );
};
