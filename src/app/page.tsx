"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("What is the current time in Indore?");
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    setResponse(null);

    try {
      // Call your API endpoint
      const apiResponse = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!apiResponse.ok) {
        throw new Error(`API error: ${apiResponse.status}`);
      }

      // The response body contains the { text, audio } object
      const data = await apiResponse.json();
      setResponse(data);
    } catch (error) {
      console.error("Failed to fetch response:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // This function plays the audio from the Base64 string
  const playAudio = () => {
    if (response && response.audio) {
      // Create a "Data URL" from the Base64 string
      const audioSrc = `data:audio/mp3;base64,${response.audio}`;
      console.log(audioSrc, "audioSrc");
      const audio = new Audio(audioSrc);
      audio.play();
    }
  };

  console.log(response);

  return (
    <main
      style={{
        padding: "2rem",
        fontFamily: "sans-serif",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <h1>Gemini with Voice 🗣️</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask me anything..."
          style={{ width: "calc(100% - 80px)", padding: "0.5rem" }}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{ padding: "0.5rem", width: "70px" }}
        >
          {isLoading ? "..." : "Send"}
        </button>
      </form>

      {response && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Response:</h2>
          <p>{response.text}</p>
          <button onClick={playAudio}>▶️ Play Audio</button>
        </div>
      )}
    </main>
  );
}
