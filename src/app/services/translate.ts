export const getTranslatedStream = async (
  transcript: string,
  language: string
): Promise<ReadableStream<Uint8Array>> => {
  const response = await fetch("/api/translate", {
    method: "POST",
    body: JSON.stringify({ text: transcript, language }),
  });

  if (!response.body) {
    throw new Error("Stream body is undefined");
  }

  return response.body;
};