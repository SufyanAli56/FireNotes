import { useEffect, useState } from "react";
import { supabase } from "./infrastructure/supabase/supabaseClient";

import {
  fetchNotes,
  createNote,
  deleteNote,
} from "./infrastructure/supabase/notesApi";

import {
  getCachedNotes,
  saveNotesToCache,
} from "./infrastructure/indexeddb/notesCache";

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [email, setEmail] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  // 🔐 Check authentication + load notes
  useEffect(() => {
    const initialize = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          setLoading(false);
          return;
        }

        setUser(session.user);

        // 📴 Load cached notes first
        const cached = await getCachedNotes();
        if (cached.length > 0) {
          setNotes(cached);
        }

        // 🌍 Fetch from Supabase
        const remoteNotes = await fetchNotes();
        setNotes(remoteNotes);

        await saveNotesToCache(remoteNotes);
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  // 📧 Login via Magic Link
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email for login link");
    }
  };

  // 🚪 Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  // ➕ Create Note
  const handleCreateNote = async () => {
    if (!newTitle || !newContent || !user) return;

    const note = {
      title: newTitle,
      content: newContent,
      user_id: user.id,
    };

    try {
      const created = await createNote(note);
      const updated = [created, ...notes];

      setNotes(updated);
      await saveNotesToCache(updated);

      setNewTitle("");
      setNewContent("");
    } catch (error) {
      console.error("Create error:", error);
    }
  };

  // ❌ Delete Note
  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      const updated = notes.filter((note) => note.id !== id);

      setNotes(updated);
      await saveNotesToCache(updated);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // 🔄 Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading ThoughtBox...
      </div>
    );
  }

  // 🔐 If not logged in → show login
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Login to ThoughtBox</h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 mb-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Send Magic Link
        </button>
      </div>
    );
  }

  // 🧠 Main App UI
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🧠 ThoughtBox</h1>
        <button
          onClick={handleLogout}
          className="text-red-500 text-sm"
        >
          Logout
        </button>
      </div>

      {/* Create Note */}
      <div className="max-w-md mx-auto mb-6 bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 mb-2 rounded"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="w-full border p-2 mb-2 rounded"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <button
          onClick={handleCreateNote}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Add Note
        </button>
      </div>

      {/* Notes List */}
      <div className="max-w-md mx-auto">
        {notes.map((note) => (
          <div
            key={note.id}
            className="mb-4 p-4 bg-white shadow rounded"
          >
            <h2 className="font-semibold">{note.title}</h2>
            <p className="mb-2">{note.content}</p>
            <button
              onClick={() => handleDeleteNote(note.id)}
              className="text-red-500 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
