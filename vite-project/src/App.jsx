import { useNotes } from "./features/notes/useNotes";
import { useChat } from "./features/chat/useChat";

import Header from "./components/layout/Header";
import NoteCard from "./components/notes/NoteCard";
import NoteForm from "./components/notes/NoteForm";

function App() {
  const { notes, loading, user, login, logout, create, remove } = useNotes();
  const { messages, sendMessage } = useChat(notes);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading ThoughtBox...
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <button
          onClick={login}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
        >
          Login with Magic Link
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={logout} />

      <main className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Note Form */}
        <NoteForm onCreate={create} />

        {/* Notes Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} onDelete={() => remove(note.id)} />
          ))}
        </div>

        {/* Chatbot */}
        <div className="mt-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Ask You 🤖</h2>

          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto border p-3 rounded-lg">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded ${
                  m.role === "user" ? "bg-indigo-50 text-indigo-700" : "bg-gray-100 text-gray-800"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Ask about your notes..."
              className="flex-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage(e.target.value);
                  e.target.value = "";
                }
              }}
            />
            <button
              onClick={() => {
                const input = document.querySelector(
                  'input[placeholder="Ask about your notes..."]'
                );
                sendMessage(input.value);
                input.value = "";
              }}
              className="bg-indigo-600 text-white px-4 py-3 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;