import { supabase } from "./supabaseClient";

export const fetchNotes = async () => {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const createNote = async (note) => {
  const { data, error } = await supabase
    .from("notes")
    .insert([note])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateNote = async (id, updates) => {
  const { data, error } = await supabase
    .from("notes")
    .update({
      ...updates,
      version: updates.version + 1,
      updated_at: new Date()
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteNote = async (id) => {
  const { error } = await supabase
    .from("notes")
    .delete()
    .eq("id", id);

  if (error) throw error;
};
