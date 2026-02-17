import { useEffect, useState } from "react"
import { supabase } from "./infrastructure/supabase/supabaseClient"

function App() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase.from("notes").select("*")
      if (error) {
        console.error("Supabase error:", error)
        alert("Error fetching notes. Check console.")
      } else {
        console.log("Supabase notes:", data)
        setNotes(data)
      }
    }

    fetchNotes()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-4">ThoughtBox</h1>

      <ul>
        {notes.map((note) => (
          <li key={note.id} className="mb-2 p-2 bg-white shadow rounded">
            <h2 className="font-semibold">{note.title}</h2>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
