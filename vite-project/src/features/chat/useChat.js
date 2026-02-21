import { useState } from "react";
import { searchNotes } from "./ragEngine";

export function useChat(notes) {
  const [messages, setMessages] = useState([]);

  const sendMessage = (text) => {
    if (!text) return;

    // Add user message
    setMessages(prev => [...prev, { role: "user", text }]);

    // Retrieve top matching notes
    const topNotes = searchNotes(notes, text);

    // Format response
    const response = topNotes.length
      ? topNotes.map(n => `• ${n.title}: ${n.content}`).join("\n\n")
      : "I couldn’t find anything relevant in your notes.";

    // Add bot response
    setMessages(prev => [...prev, { role: "bot", text: response }]);
  };

  return { messages, sendMessage };
}